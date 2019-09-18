# Get started with the account module

**An account is an object that makes it easier to send and receive transactions. Accounts store data such as addresses and pending bundle hashes in a local database. This data allows you to interact with an IOTA network without worrying about withdrawing from spent addresses or promoting and reattaching pending transactions.**

Accounts abstract the complexity of the IOTA protocol and allow you to focus on making payments. In accounts, a payment can be one of two types:

* **Incoming payment:** A bundle that deposits IOTA tokens into an account
* **Outgoing payment:** A bundle that withdraws IOTA tokens from an account

:::warning:Beta software
The client libraries are currently in beta and you should not use them in production environments.
:::

## Audience

This documentation is for developers who are familiar with the JavaScript programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as [bundles, transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md), and [why you should withdraw from addresses only once](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse).

## Prerequisites

To use this library, you must have one of the following [supported](https://github.com/iotaledger/iota.js/blob/next/.travis.yml#L5) versions of [Node.js](https://nodejs.org):

- Node.js 10 or higher. Recommended version is [latest LTS](https://nodejs.org/en/download/).
- Node.js 8

To install [library packages](https://www.npmjs.com/org/iota), you must have one of the following package managers:

- [npm](https://www.npmjs.com/) (Included in Node.js [downloads](https://nodejs.org/en/download/))
- [Yarn](https://yarnpkg.com/)

## Install the packages

To install the JavaScript account module packages and their dependencies, you can use one of the following options:

- Install the packages with npm
    ```bash
    npm install @iota/account @iota/cda @iota/persistence-adapter-level
    ```
- Install the packages with Yarn
    ```bash
    yarn add @iota/account @iota/cda @iota/persistence-adapter-level
    ```

## Get started

Click the green button to run the sample code that creates a new account and checks its available balance.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Create-account?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Follow our guide](../how-to-guides/create-account.md) to find out how to create your own account.

## API reference

For details on all available API methods, see the [source code](https://github.com/iotaledger/iota.js/tree/next/packages/account).

## Support the project

If the IOTA JavaScript client library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota.js/issues/new), [feature request](https://github.com/iotaledger/iota.js/issues/new), or a [pull request](https://github.com/iotaledger/iota.js/pulls/).  

### Clone and bootstrap the repository on GitHub

You may want to build the package from source if you plan on making changes to your local copy of it. 

1. Go to the [iotaledger GitHub repository](https://github.com/iotaledger/iota.js)

2. Click the **Fork** button in the top-right corner

3. Clone your forked repository and change into its directory

    ```bash
    cd iota.js
    ```

4. Initialize your environment

    ```bash
    npm run init
    ```

This step will download all dependencies, build them, then link the packages together.

The JavaScript client libraries use [Lerna](https://lerna.js.org/) to manage multiple packages. So, you can initialize your environment again at any point with the `lerna bootstrap` command.

### Run tests

Make your changes on a single package or across multiple packages and test the them by running the following command from the root directory:

```bash
npm run test
```
To run tests for a specific package, change into the package's directory and run the `npm run test` command.

### Update documentation

If your changes affect the documentation, please update it by editing the [`JSDoc`](http://usejsdoc.org) annotations and running `npm run docs` from the root directory.

## Join the discussion

Join our [Discord](https://discord.iota.org) to get involved in the community, ask for help, or to discuss the technology.