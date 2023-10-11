<div align="center">
  <a href="https://genez.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Logo_Genezio_White.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Logo_Genezio_Black.svg">
      <img alt="genezio logo" src="https://github.com/genez-io/graphics/raw/HEAD/svg/Logo_Genezio_Black.svg">
    </picture>
  </a>
</div>

<div align="center">
  <h1>types</h1>
  <h3></h3>
</div>
<div align="center">

[![npm-version](https://img.shields.io/npm/v/@genezio/types.svg?style=flat&label=npm-package-version&color=62C353)](https://www.npmjs.com/package/@genezio/types)

</div>

<div align="center">
</div>

# What is `@genezio/types`

`@genezio/types` provides types and data definitions used in projects developed with the `genezio` platform. This package is essential for developers working with `genezio` to ensure data consistency and proper typing in their applications.

# Table of Contents
- [Features](#features)
- [Usage](#usage)
- [Install `@genezio/types`](#Install-@genezio/types)
- [Documentation](#documentation)
- [Getting Support](#getting-support)
- [Troubleshooting](#troubleshooting)
- [License](#license)

# Features

- 📦&nbsp; Provides types for developers working with `genezio`.
- 🧰&nbsp; Ensures data consistency and proper typing in `genezio` applications.

# Usage

To make the best use of `@genezio/types`, it's important to understand the provided TypeScript types: `GenezioHttpRequest` and `GenezioHttpResponse`.

## `GenezioHttpRequest`

The `GenezioHttpRequest` type represents an HTTP request. It consists of the following properties:

- `headers`: An object containing HTTP headers as key-value pairs.
- `http`: An object providing details about the HTTP request, including:
    - `method`: The HTTP method used (e.g., GET, POST).
    - `path`: The request path.
    - `protocol`: The protocol used (e.g., HTTP, HTTPS).
    - `userAgent`: The user-agent string.
    - `sourceIp`: The source IP address of the request.
- `queryStringParameters` (optional): An object containing query string parameters as key-value pairs.
- `timeEpoch`: A timestamp in milliseconds indicating when the request was made.
- `rawBody`: A string representing the raw request body.
- `body`: A property of any type, which can be used to include the parsed request body.

Here's an example of how you can use the `GenezioHttpRequest` type in TypeScript:

```typescript
import { GenezioHttpRequest } from '@genezio/types';

const sampleRequest: GenezioHttpRequest = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer someAccessToken',
  },
  http: {
    method: 'GET',
    path: '/api/resource',
    protocol: 'HTTP/1.1',
    userAgent: 'User-Agent-String',
    sourceIp: '192.168.0.1',
  },
  queryStringParameters: {
    param1: 'value1',
    param2: 'value2',
  },
  timeEpoch: 1633900000000, // Replace with actual timestamp
  rawBody: '{"key": "value"}',
  body: {
    key: 'value',
  },
};
```

## `GenezioHttpResponse`

The `GenezioHttpResponse`  type represents an HTTP response. It consists of the following properties:

- `body`: A property of any type, which can be used to include the response body.
- `headers` (optional): An object containing HTTP headers as key-value pairs.
- `statusCode`:  A string representing the HTTP status code.
- `isBase64Encoded` (optional): A boolean indicating whether the response body is base64-encoded.


Here's an example of how you can use the `GenezioHttpResponse` type in TypeScript:

```typescript
import { GenezioHttpResponse } from '@genezio/types';

const sampleResponse: GenezioHttpResponse = {
  body: {
    message: 'Hello, World!',
  },
  headers: {
    'Content-Type': 'application/json',
  },
  statusCode: '200',
  isBase64Encoded: false,
};
```

These TypeScript types provided by @genezio/types will help ensure data consistency and proper typing in your genezio applications when handling HTTP requests and responses.


# Install `@genezio/types`

To install the `@genezio/types` package, you can use npm or yarn:

```bash
npm install @genezio/types
```

```bash
yarn add @genezio/types
```
# Documentation
To find more details on how to use `@genezio/types`, check out the official [documentation](https://docs.genez.io/types)

Here you can find some examples:
- [Webhook example](https://github.com/Genez-io/genezio-examples/tree/master/typescript/webhook)

To find more details on how to use `genezio`, check out the official [documentation](https://genez.io/docs):

- [Getting started](https://docs.genez.io/genezio-documentation/getting-started)
- [Project Structure](https://docs.genez.io/genezio-documentation/project-structure)
- [CLI commands](https://docs.genez.io/genezio-documentation/cli-tool)
- [Test Interface](https://docs.genez.io/genezio-documentation/test-interface)
- [Integrations](https://docs.genez.io/genezio-documentation/integrations)

If you cannot find what you are looking for in the docs, don't hesitate to drop us a [GitHub issue](https://github.com/Genez-io/genezio/issues) or [start a discussion on Discord](https://discord.gg/uc9H5YKjXv).

# Getting support

We are here to assist you with any problems or questions you may have while using `@genezio/types`. Don't hesitate to reach out to us on [GitHub](https://github.com/Genez-io/genezio/issues) or join our [Discord community](https://discord.gg/uc9H5YKjXv) for real-time assistance.

# System requirements

`@genezio/types` can be used in Genezio projects developed on macOS, Linux-based distributions, and Windows.

It is designed to work with Node.js versions >= `14.0.0`.

# Troubleshooting

For the most common issues that our users have dealt with, we created a [Troubleshooting](https://docs.genez.io/genezio-documentation/troubleshooting) section in the documentation.

If you don't find the guidance there, drop us a [GitHub issue](https://github.com/Genez-io/types/issues). We are more than happy to help you!


# License

`@genezio/types` is licensed under `GNU General Public License v3.0`. For more information, please refer to [LICENSE](LICENSE).