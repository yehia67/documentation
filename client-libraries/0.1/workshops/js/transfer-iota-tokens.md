# Send a micropayment in Node.js

**To transfer IOTA tokens from one [address](root://getting-started/0.1/clients/addresses.md) to another, you need to send a [transfer bundle](root://getting-started/0.1/transactions/bundles.md) to a [node](root://getting-started/0.1/network/nodes.md). In this guide, you send a micropayment of 1 IOTA to one of your own unspent addresses.**

## Prerequisites

To complete this guide, you need [test tokens](root://getting-started/0.1/tutorials/get-test-tokens.md).

## Packages

To complete this guide, you need to install the `core`package:

--------------------
### npm
```bash
npm install @iota/core
```
---
### Yarn
```bash
yarn add @iota/core
```
--------------------

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

Before you run this sample code, replace the seed with your own test seed.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-IOTA-tokens-on-the-Devnet?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code sends 1 i to the address in the `transfers` object.

This is a value transaction, so the seed is used to sign the bundle. Therefore, this seed's addresses must contain at least 1 IOTA token.

The [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method creates a bundle from the transfers object. Then, the [`sendTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes) method handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node.

:::warning:
If you were to send 1 i to someone else's address, you wouldn't be able to know in advance whether it is a spent address. Therefore, we recommend using the [account module](../../account-module/introduction/overview.md) to create conditional deposit addresses, which expire after certain conditions are met.
:::

:::success:Congratulations :tada:
You've just sent your first transfer bundle. Your transactions are attached to the Tangle and will be forwarded to the rest of the network. Now, you just need to wait until the transaction is confirmed for your balance to be updated.
:::

## Next steps

[Listen for live transactions on the Tangle](../js/listen-for-transactions.md).

