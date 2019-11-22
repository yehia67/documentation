# Generate an address in Node.js

**In this guide, you learn how to generate a new address for a [seed](root://getting-started/0.1/clients/seeds.md) by either incrementing the index and/or using a different [security level](root://getting-started/0.1/clients/security-levels.md).**

## Packages

To complete this guide, you need to install the following package:

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

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the security level that you want to use for your address

    ```js
    const securityLevel = 2;
    ```

4. Define a seed for which to generate an address

    ```js
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

5. Use the [`getNewAddress()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNewAddress) method to generate an unspent address. If the connected node has an input transaction that withdraws from the address with the given index, the node knows that the address is spent, so the library returns the next unspent address.

    ```js
    iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
        .then(address => {
            console.log('Your address is: ' + address);
        })
        .catch(err => {
            console.log(err)
        });
    ```

    :::warning:
    Nodes don't always know if an address is spent because they often remove old transactions from their ledgers during a [local snapshot](root://node-software/0.1/iri/concepts/local-snapshot.md). Therefore, we recommend using the [account module](../../account-module/introduction/overview.md) to keep track of spent addresses in your own local database.
    :::

    In the console, you should see an address.

    ```
    Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
    ```

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Generate-an-address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Send test IOTA tokens to your new address](../js/transfer-iota-tokens.md).

