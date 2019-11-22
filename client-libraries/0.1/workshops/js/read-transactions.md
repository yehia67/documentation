# Read transactions on the Tangle in Node.js

**In this guide, you read your "hello world" [transaction](root://getting-started/0.1/transactions/transactions.md) on the Tangle by connecting to a [node](root://getting-started/0.1/network/nodes.md) and asking it to return only transactions with a given bundle hash.**

## Packages

To complete this guide, you need to install the following packages:

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

## Code walkthrough

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Extract = require('@iota/extract-json');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the bundle hash that you want to use to filter transactions 

    ```js
    const bundle =
    'SIHQISXRUHFGZBCHOQLRYFXYTQBIERIJZHCHUUJZPAZC9YEQQVXAJFZNZKEBKPILI9GHYX9QCPAYGFWDD';
    ```

4. Use the [`findTransactionObjects()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactionObjects) method to get transactions by the value of their `bundle` field. Then, use the [`extractJSON()`](https://github.com/iotaledger/iota.js/tree/next/packages/extract-json) method to try to decode the JSON message in the `signatureMessageFragment` fields of the transactions and print it to the console

    ```js
    iota.findTransactionObjects({ bundles: [bundle] })
    .then(bundle => {
        console.log(JSON.parse(Extract.extractJson(bundle)));
    })
    .catch(err => {
        console.error(err);
    });
    ```

    In the console, you should see your JSON message:

    ```json
    {"message": "Hello world"}
    ```

:::success:Congratulations :tada:
You've just found and read a transaction on the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-on-the-Tangle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Generate a new address](../js/generate-an-address.md).

