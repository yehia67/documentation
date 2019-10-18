# Get started with Masked Authenticated Messaging

**Masked Authenticated Messaging (MAM) is a data communication protocol that allows you to publish and fetch messages in encrypted data streams, called channels, on the Tangle. You can use the MAM package to publish encrypted and authenticated messages to channels.**

The Tangle allows you to attach zero-value transactions to it, but these transactions are not signed or checked by nodes to verify their authenticity.

With MAM, all messages are signed by the owner of a seed. This way, those with access to a [channel](../concepts/channels.md) can verify the signature and decrypt the messages.

Many use cases such as the [Data Marketplace](root://blueprints/0.1/data-marketplace/overview.md) use MAM to allow users to pay for access to channels and decrypt the messages.

You can [learn more about the details of MAM](https://medium.com/coinmonks/iota-mam-eloquently-explained-d7505863b413) in this blog post.

:::warning:Beta software
The client libraries are currently in beta and you should not use them in production environments.
:::

## Audience

This documentation is designed for developers who are familiar with the JavaScript programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as [bundles, transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md), and [signatures](root://dev-essentials/0.1/concepts/addresses-and-signatures.md).

## Prerequisites

You must have one of the following:

- Node.js 10 or higher. Recommended version is [latest LTS](https://nodejs.org/en/download/).
- Node.js 8

To install [library packages](https://www.npmjs.com/org/iota), you must have one of the following package managers:

- [npm](https://www.npmjs.com/) (Included in Node.js [downloads](https://nodejs.org/en/download/))
- [Yarn](https://yarnpkg.com/)

You must also have a `package.json` file. Generate one by doing [`npm init`](https://docs.npmjs.com/cli/init) or [`yarn init`](https://yarnpkg.com/lang/en/docs/cli/init/) in the command prompt.

## Install the package

To install the `mam` package and its dependencies, you can use one of the following options:

- Install the package with npm
    ```bash
    npm install @iota/mam
    ```
- Install the package with Yarn
    ```bash
    yarn add @iota/mam
    ```

## Get started

Click the green button to run the sample code that publishes messages to a public MAM channel.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/MAM-public?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

[Follow our guide](../how-to-guides/create-public-channel.md) to find out how to publish your own MAM messages.

## API reference

For details on all available API methods, see the [references page](../references/api-reference.md).

- [init](../references/api-reference.md#init)

- [changeMode](../references/api-reference.md#changeMode)

- [getRoot](../references/api-reference.md#getRoot)

- [decode](../references/api-reference.md#decode)

- [subscribe](../references/api-reference.md#subscribe)

- [listen](../references/api-reference.md#listen)

- [attach](../references/api-reference.md#attach)

- [fetch](../references/api-reference.md#fetch)

- [fetchSingle](../references/api-reference.md#fetchSingle)


## Support the project

If the IOTA JavaScript client library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/mam.client.js/issues/new), [feature request](https://github.com/iotaledger/mam.client.js/issues/new), or a [pull request](https://github.com/iotaledger/mam.client.js/pulls/).  

### Build the package from source

You may want to build the package from source if you plan on making changes to your local copy of it. 

1. Go to the [iotaledger GitHub repository](https://github.com/iotaledger/mam.client.js)

2. Click the **Fork** button in the top-right corner

3. Clone your forked repository and change into its directory

    ```bash
    cd mam.client.js
    ```

4. Install the dependencies

    ```bash
    # For the npm package manager
    npm install

    # For the Yarn package manager
    yarn
    ```

5. Make any changes you want to your local copy

6. Build the package, according to your environment

--------------------
### Node.js

Development version:

```bash
# For the npm package manager
npm run build-node-dev

# For the Yarn package manager
yarn build-node-dev
```

Production version:

```bash
# For the npm package manager
npm run build-node-prod

# For the Yarn package manager
yarn build-node-prod
```
---
### Web browser
Development version:

```bash
# For the npm package manager
npm run build-web-dev

# For the Yarn package manager
yarn build-web-dev
```

Production version:

```bash
# For the npm package manager
npm run build-web-prod

# For the Yarn package manager
yarn build-web-prod
```
--------------------

### Update documentation

If your changes affect the documentation, please update it.

## Join the discussion

Join our [Discord](https://discord.iota.org) to get involved in the community, ask for help, or to discuss the technology.
