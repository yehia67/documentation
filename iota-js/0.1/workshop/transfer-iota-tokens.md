# Transfer test IOTA tokens

**To transfer IOTA tokens from one [address](root://getting-started/0.1/clients/addresses.md) to another, you need to send a [transfer bundle](root://getting-started/0.1/transactions/bundles.md) to a [node](root://getting-started/0.1/network/nodes.md).**

## Prerequisites

To complete this guide, you need the following:

- [A developer environment](../workshop/set-up-a-developer-environment.md)
- [The `core` package](../workshop/install-packages.md)
- [Test tokens](root://getting-started/0.1/tutorials/get-test-tokens.md)

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

---

1. Require the `core` package

    ```js
    const Iota = require('@iota/core');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the depth and the minimum weight magnitude

    ```js
    const depth = 3;
    const minimumWeightMagnitude = 9;
    ```

4. Define your seed. Replace this seed with one that owns an address with test IOTA tokens

    ```js
    // Replace this seed with one that owns an address with free Devnet tokens 
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

5. Generate a new address for your seed. You will send your tokens to this address.

    ```js
    const receivingAddress = iota.getNewAddress(seed, {
        index: 1,
        total: 1
    });
    ```

    :::warning:
    Make sure that this is not a spent address.
    ::: 

6. Create a `transfers` object that specifies the amount of IOTA tokens you want to transfer, the tag you want to add to the transaction, and the address to send the tokens to

    ```js
    const transfers = [
    {
      value: 500,
      address: receivingAddress[0],
      tag: 'MYFIRSTVALUETRANSACTION'
    }
    ]
    ```

7. To create a [bundle](root://getting-started/0.1/transactions/bundles.md) from your `transfers` object, pass it to the [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method. Then, pass the returned bundle trytes to the [`sendTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the [node](root://getting-started/0.1/network/nodes.md)

    ```js
    // Construct bundle and convert to trytes
    const trytes = await iota.prepareTransfers(seed, transfers);
    // Send bundle to node.
    const response = await iota.sendTrytes(trytes, 3/*depth*/, 9/*MWM*/);
    ```

    In the console, you'll see information about the transactions.

:::success:Congratulations :tada:
You've just sent your first transfer bundle. Your transactions are attached to the Tangle and will be forwarded to the rest of the network. Now, you just need to wait until the transaction is confirmed for your balance to be updated.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

Before you run this sample code, replace the seed with your own test seed.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-IOTA-tokens-on-the-Devnet?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Listen for live transactions on the Tangle](../workshop/listen-for-transactions.md).

