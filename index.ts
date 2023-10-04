export type GenezioHttpRequest  = {
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
