# Send a "hello world" transaction in Node.js

**In this guide, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## Packages

To complete this guide, you need to install the `core` and `converter` packages:

--------------------
### npm
```bash
npm install @iota/core @iota/converter
```
---
### Yarn
```bash
yarn add @iota/core @iota/converter
```
--------------------

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code converts a "hello world" JSON message to trytes and sends it in a transaction to the address in the `address` variable. Because you aren't sending IOTA tokens, this address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md). In fact, you can replace this address with another one to try it out.

:::info:
The [`asciiToTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_converter.asciiToTrytes) method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
:::

Because this is a zero-value transaction, the seed is not used. However, the library expects a valid seed, so we use a random string of 81 characters. If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.

The [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method creates a bundle from the transfers object. Then, the [`sendTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes) method handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node.

:::success:Congratulations :tada:
That's it! You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network.
:::

## Next steps

Make a note of your transaction's hash so you can [read the transaction data on the Tangle](../js/read-transactions.md).
