# Masked Authenticated Messaging Library

This is the **official** JavaScript MAM library, which allows you to do the following:
- Create MAM messages with varying encryption schemes
- Publish MAM messages (using the IOTA.JS Client library)
- Fetch & decode MAM streams
- Fetch & Decode singular messages

To learn more about how the library works:

- See how you can [send "Public" MAM message](root://mam/0.1/how-to/publishAndFetchPublic.md).
- See how you can [send and receive](root://iota-js/0.1/how-to-guides/create-and-manage-cda.md) transactions.

Get the library at the [IOTA JS  GitHub repository](https://github.com/iotaledger/iota.js).

:::warning:Beta software
This library is currently in beta. Their use in production is not supported.
:::

Please report any issues in our [issue tracker](https://github.com/iotaledger/mam.client.js/issues/new).

## Audience

This documentation is designed for people who are familiar with the JavaScript programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as  [bundles, and transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md).

This guide is designed to let you quickly start exploring and developing applications with MAM capabilities.

## Prerequisites

To use the library, your computer must have one of the following:
- Node.js 10 or higher. Recommended version is [latest LTS](https://nodejs.org/en/download/).
- Node.js 8

To install [library packages](https://www.npmjs.com/org/iota), your computer must have one of the following package managers:

- [npm](https://www.npmjs.com/) (Included in Node.js [downloads](https://nodejs.org/en/download/))
- [Yarn](https://yarnpkg.com/)

You must also have a `package.json` file. Generate one by doing [`npm init`](https://docs.npmjs.com/cli/init) or [`yarn init`](https://yarnpkg.com/lang/en/docs/cli/init/).

## Install the library

To install the IOTA JavaScript client library and its dependencies, you can use one of the following options:

- Install the library with npm
    ```bash
    npm install @iota/mam
    ```
- Install the library with Yarn
    ```bash
    yarn add @iota/mam
    ```

## API references

For details on all available API methods, see the [references page](https://github.com/iotaledger/mam.client.js/blob/master/README.md).

## API

For details on all available API methods, see the [references page](root://mam/0.1/references/api.md).

- [init](root://mam/0.1/references/api.md#init)

- [changeMode](root://mam/0.1/references/api.md#changeMode)

- [getRoot](root://mam/0.1/references/api.md#getRoot)

- [decode](root://mam/0.1/references/api.md#decode)

- [subscribe](root://mam/0.1/references/api.md#subscribe)

- [listen](root://mam/0.1/references/api.md#listen)

- [attach](root://mam/0.1/references/api.md#attach)

- [fetch](root://mam/0.1/references/api.md#fetch)

- [fetchSingle](root://mam/0.1/references/api.md#fetchSingle)


### Update documentation

Please update the documention when needed by editing [`JSDoc`](http://usejsdoc.org) annotations and running `npm run docs` from the root directory.

## Join the discussion

If you want to get involved in the community, need help with getting setup, have any issues related with the library or just want to discuss IOTA, Distributed Registry Technology (DRT) and IoT with other people, feel free to join our [Discord](https://discord.iota.org).
