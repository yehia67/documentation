# Get started with JavaScript core

**The JavaScript core client library includes low-level methods for interacting with the Tangle. You can use this library to use the core IOTA protocol. For example, you can connect to nodes, create bundles, and promote and reattach pending transactions.**

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

## Install the package

To install the `core` package and its dependencies, you can use one of the following options:

- Install the package with npm
    ```bash
    npm install @iota/core
    ```
- Install the package with Yarn
    ```bash
    yarn add @iota/core
    ```

## Get started

Click the green button to run the sample code that requests information about a node on the Devnet.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Connect-to-a-node?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## API reference

For details on all available API methods, see the [reference page](https://github.com/iotaledger/iota.js/blob/next/api_reference.md).


- [.composeApi([settings])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.composeApi)
- [.addNeighbors(uris, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.addNeighbors)
- [.attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.attachToTangle)
- [.broadcastBundle(tailTransactionHash, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.broadcastBundle)
- [.broadcastTransactions(trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.broadcastTransactions)
- [.checkConsistency(transactions, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.checkConsistency)
- [.findTransactionObjects(query, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactionObjects)
- [.findTransactions(query, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactions)
- [.getAccountData(seed, options, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getAccountData)
- [.getBalances(addresses, threshold, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBalances)
- [.getBundle(tailTransactionHash, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBundle)
- [.getInclusionStates(transactions, tips, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getInclusionStates)
- [.getInputs(seed, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getInputs)
- [.getLatestInclusion(transactions, tips, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getLatestInclusion)
- [.getNeighbors([callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNeighbors)
- [.getNewAddress(seed, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNewAddress)
- [.getNodeInfo([callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNodeInfo)
- [getTips([callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTips)
- [getTransactionObjects(hashes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTransactionObjects)
- [.getTransactionsToApprove(depth, [reference], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTransactionsToApprove)
- [.getTrytes(hashes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getTrytes)
- [.isPromotable(tail, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.isPromotable)
- [.prepareTransfers(seed, transfers, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers)
- [.promoteTransaction(tail, depth, minWeightMagnitude, transfer, [options], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.promoteTransaction)
- [.removeNeighbors(uris, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.removeNeighbors)
- [.replayBundle(tail, depth, minWeightMagnitude, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.replayBundle)
- [.sendTrytes(trytes, depth, minWeightMagnitude, [reference], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes)
- [.storeAndBroadcast(trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.storeAndBroadcast)
- [.storeTransactions(trytes, [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.storeTransactions)
- [.traverseBundle(trunkTransaction, [bundle], [callback])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.traverseBundle)
- [.generateAddress(seed, index, [security], [checksum])](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.generateAddress)

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
