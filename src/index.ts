import { AuthService, ErrorCode } from "@genezio/auth";
import Redis from "ioredis";

export type GenezioDeployClassParameters = {
    // Specify the type of protocol that is used to invoke the methods of
    // this class.
    //
    // For more information: https://docs.genez.io/genezio-documentation/method-types
    type?: "jsonrpc" | "http" | "cron";
};

export enum GenezioErrorCodes {
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    RequestTimeout = 408,
    PreconditionFailed = 412,
}

export class GenezioError extends Error {
    code: GenezioErrorCodes | number | undefined;
    info: { [id: string]: any } | undefined;

    constructor(
        message: string,
        code: GenezioErrorCodes | number | undefined = undefined,
        info: { [id: string]: any } | undefined = undefined
    ) {
        super(message);
        this.name = "GenezioError";
        this.code = code;
        this.info = info;
    }
}

export type GenezioDeployMethodParameters =
    | {}
    | {
          // Specify the type of protocol that is used to invoke this specific method
          //
          // For more information: https://docs.genez.io/genezio-documentation/method-types
          type: "jsonrpc" | "http";
      }
    | {
          // Specify the type of protocol that is used to invoke this specific method
          //
          // For more information: https://docs.genez.io/genezio-documentation/method-types
          type: "cron";
          // If type is set to "cron", this cronString value will specify how often the method
          // will be called.
          //
          // A good tool for building cron strings is https://crontab.guru/.
          cronString: string;
      };

export type GenezioRateLimiterOptionsParameters = { dbUrl?: string; limit?: number };

// Decorator that marks that a class should be deployed using genezio.
export function GenezioDeploy(_dict: GenezioDeployClassParameters = {}) {
    return (value: any, _context: any) => {
        return value;
    };
}

// Decorator that marks that a method should be deployed using genezio.
export function GenezioMethod(_dict: GenezioDeployMethodParameters = {}) {
    return function (value: Function, _context: any) {
        return function (...args: any[]) {
            // @ts-expect-error
            const func = value.bind(this);
            const result = func(...args);
            return result;
        };
    };
}

export function GenezioAuth() {
    return function (value: Function, _context: any) {
        return async function (...args: any[]) {
            let response;
            try {
                AuthService.getInstance().setServerSide(true);
                response = await AuthService.getInstance().userInfoForToken(args[0].token);
            } catch (error: any) {
                if (error.code === ErrorCode.INVALID_TOKEN) {
                    throw new GenezioError("Unauthorized", GenezioErrorCodes.Unauthorized);
                } else {
                    throw error;
                }
            }

            args[0].user = response;

            // @ts-expect-error
            const func = value.bind(this);
            const result = func(...args);
            return result;
        };
    };
}

// Decorator that marks that limits the number of requests being made from the same sourceIp.
export function GenezioRateLimiter(_dict: GenezioRateLimiterOptionsParameters = {}) {
    let redisClient: Redis;
    try {
        redisClient = new Redis(_dict.dbUrl ? _dict.dbUrl : "", {
            retryStrategy: function () {
                return undefined;
            },
        });
    } catch (error) {
        console.log(
            "Error when opperating on the redis client. Remember to set the Redis dbUrl parameter in the RateLimiter decorator."
        );
        console.log(error);
    }
    return function (value: Function, _context: any) {
        return async function (...args: any[]) {
            if (args.length === 0 || !args[0].isGnzContext) {
                console.log(
                    "Warning: the GenezioRateLimiter decorator must be used with the first parameter being a GnzContext object"
                );
            } else {
                try {
                    const date = new Date();
                    const oldCount = await redisClient.get(
                        `${args[0].requestContext.http.sourceIp}:${date.getMinutes()}`
                    );
                    if (oldCount && parseInt(oldCount) >= (_dict.limit ? _dict.limit : 50)) {
                        throw new GenezioError(
                            "Rate limit exceeded",
                            GenezioErrorCodes.RequestTimeout
                        );
                    }
                    await redisClient
                        .multi()
                        .incr(`${args[0].requestContext.http.sourceIp}:${date.getMinutes()}`)
                        .expire(`${args[0].requestContext.http.sourceIp}:${date.getMinutes()}`, 59)
                        .exec();
                } catch (error) {
                    if ((error as GenezioError).code === GenezioErrorCodes.RequestTimeout) {
                        throw error;
                    }
                    console.log(
                        "Error when opperating on the redis client. Remember to set the Redis dbUrl parameter in the GenezioRateLimiter decorator."
                    );
                    console.log(error);
                }
            }

            // @ts-expect-error
            const func = value.bind(this);
            const result = func(...args);
            return result;
        };
    };
}

export type GenezioHttpRequest = {
    headers: { [key: string]: string };
    http: {
        method: string;
        path: string;
        protocol: string;
        userAgent: string;
        sourceIp: string;
    };
    queryStringParameters?: { [key: string]: string };
    timeEpoch: number;
    rawBody: string;
    body: any;
};

export type GenezioHttpResponse = {
    body: any;
    headers?: { [key: string]: string };
    statusCode: string;
    isBase64Encoded?: boolean;
};

export type GnzContext = {
    token: string | undefined;
    user:
        | {
              email: string;
              userId: string;
              authProvider: string;
              createdAt: Date;
              verified: boolean;
              name?: string;
              address?: string;
              profilePictureUrl?: string;
              customInfo?: { [key: string]: string };
          }
        | undefined;
    requestContext: any | undefined;
    headers: any | undefined;
    isGnzContext: boolean | undefined;
};
