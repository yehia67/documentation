# Send a "hello world" transaction

**To send a message to the [Tangle](root://getting-started/0.1/basics/the-tangle.md), you must send it to a [node](root://getting-started/0.1/basics/nodes.md) in a zero-value [transaction](root://getting-started/0.1/basics/transactions.md). These transactions are useful for storing immutable messages without having to send any [IOTA tokens](root://getting-started/0.1/basics/token.md).**

## Prerequisites

To complete this guide, you need the following:

- [A developer environment](../workshop/set-up-a-developer-environment.md)
- [The `core` and `converter` packages](../workshop/install-packages.md)

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/references/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/basics/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/basics/depth.md)**: 3

---

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
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

4. Define an [address](root://getting-started/0.1/basics/addresses.md) to which you want to send a message

    ```js
    const address =
    'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/basics/ternary.md).
    :::

5. Define a seed

    ```js
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

    :::info:
    If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

6. Create a message that you want to send to the address and convert it to trytes

    ```js
    const message = "HELLOWORLD";
    const messageInTrytes = Converter.asciiToTrytes(message);
    ```

    :::info:
    The `asciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

6. Define a zero-value transaction that sends the message to the address

    ```js
    const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
    ];
    ```

7. To create a bundle from your `transfers` object, pass it to the [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method. Then, pass the returned bundle trytes to the [`sendTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [proof of work](root://getting-started/0.1/basics/proof-of-work.md), and sending the bundle to the node

    ```js
    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
        })
        .then(bundle => {
            console.log(bundle)
        })
        .catch(err => {
            console.error(err)
        });
    ```

    In the console, you should see information about the bundle that you sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network. This transaction is now immutable, and as long as you have its transaction hash, you can read it on the Tangle, using the [`getBundle()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#coregetbundletailtransactionhash-callback) method.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Read transactions on the Tangle](../workshop/transfer-iota-tokens.md).

