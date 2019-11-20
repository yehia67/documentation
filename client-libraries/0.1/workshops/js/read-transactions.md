# Read transactions on the Tangle in Node.js

**In this guide, you read [transactions](root://getting-started/0.1/transactions/transactions.md) on the Tangle by connecting to a node and asking it to filter them by their bundle hash.**

## Packages

To complete this guide, you need to install the `core` and `extract-json` packages:

--------------------
### npm
```bash
npm install @iota/core @iota/extract-json
```
---
### Yarn
```bash
yarn add @iota/core @iota/extract-json
```
--------------------

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-on-the-Tangle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code uses the [`findTransactionObjects()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactionObjects) method to get transactions by the value of their `bundle` field.

Then, we use the [`extractJSON()`](https://github.com/iotaledger/iota.js/tree/next/packages/extract-json) method to try to decode the JSON message in the `signatureMessageFragment` field and print it to the console.

:::success:Congratulations :tada:
You've just filtered transactions by their bundle hash.
:::

## Next steps

[Generate a new address](../js/generate-an-address.md).

