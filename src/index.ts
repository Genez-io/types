export type GenezioDeployClassParameters = {
    // Specify the type of protocol that is used to invoke the methods of
    // this class.
    //
    // For more information: https://docs.genez.io/genezio-documentation/method-types
    type?: "jsonrpc" | "http" | "cron";
};

export type GenezioDeployMethodParameters = {
    // Specify the type of protocol that is used to invoke this specific method
    //
    // For more information: https://docs.genez.io/genezio-documentation/method-types
    type?: "jsonrpc" | "http" | "cron";

    // If type is set to "cron", this cronString value will specify how often the method
    // will be called.
    //
    // A good tool for building cron strings is https://crontab.guru/.
    cronString?: string;
};

// Decorator that marks that a class should be deployed using genezio.
export function GenezioDeploy(_dict: GenezioDeployClassParameters = {}) {
    return (_ctor: Function) => {};
}

// Decorator that marks that a method should be deployed using genezio.
export function GenezioMethod(_dict: GenezioDeployMethodParameters = {}) {
    return function (_target: Object, _key: string, descriptor: TypedPropertyDescriptor<any>) {
        let originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            return originalMethod.apply(this, args);
        };

        return descriptor;
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
