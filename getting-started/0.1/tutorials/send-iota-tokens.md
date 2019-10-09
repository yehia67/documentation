# Transfer test IOTA tokens

**You may want to transfer IOTA tokens to someone in exchange for goods or services. In this tutorial we send test tokens from one of your addresses to another.**

## Prerequisites

To complete this tutorial, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt


:::info:
[Get some free test tokens](../tutorials/receive-test-tokens.md)
:::

## Transfer test tokens to one of your other addresses

In this example, we send a bundle to a [Devnet node](../references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any bundles that you send to the Devnet do not exist on other networks such as the Mainnet.

1. In the command prompt, create a working directory called `iota-example`

    ```bash
    mkdir iota-example
    ```

2. Change into the `iota-example` directory and install the `core` and `converter` packages

    ```bash
    cd iota-example
    npm install @iota/core @iota/converter --save
    ```

    If everything went well, you should see something like the following in the output. You can ignore any 'npm WARN' messages.

    ```shell
    + @iota/converter@1.0.0-beta.8
    + @iota/core@1.0.0-beta.8
    added 19 packages from 10 contributors and audited 68 packages in 5.307s
    found 0 vulnerabilities
    ```

    You now have a `package.json` file and a `node_modules` directory, which contains the IOTA client libraries and their dependencies.

3. In the `iota-example` directory, create a new file called `value-transaction.js`

4. Require the `core` package

    ```js
    const Iota = require('@iota/core');
    ```

5. Connect to a node

    ```js
    // Create a new instance of the IOTA API object
    // Use the `provider` field to specify which IRI node to connect to
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

6. Create a variable to store your seed. Replace this seed with one that owns an address you used to [receive free Devnet tokens](../tutorials/receive-test-tokens.md) 

    ```js
    // Replace this seed with one that owns an address with free Devnet tokens 
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

    :::info:
    This seed will be used to prove that you own the address from which you want to withdraw IOTA tokens.

    [Learn how a seed is used to prove ownership of an address](root://dev-essentials/0.1/concepts/addresses-and-signatures.md).
    :::

7. Derive a new address from your seed. You will send your tokens to this address.

    ```js
    const receivingAddress = iota.getNewAddress(seed, {
        index: 1,
        total: 1
    });
    ```

    :::warning:
    Be sure that this is not a spent address (one that you have withdrawn from before).

    [Learn why you should never use spent addresses](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse).
    :::

8. Create a `transfers` object that specifies the amount of IOTA tokens you want to transfer, the tag you want to add to the transaction, and the address to send the tokens to

    ```js
    const transfers = [
    {
      value: 500,
      address: receivingAddress[0],
      tag: 'MYFIRSTVALUETRANSACTION'
    }
    ]
    ```

9. To construct a [bundle](../introduction/what-is-a-bundle.md) from your `transfers` object, pass it to the [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method. Then, pass the returned bundle trytes to the `sendTrytes()` method to do [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [proof of work](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md), and send the bundle to the [node](../introduction/what-is-a-node.md)

    ```js
    // Construct bundle and convert to trytes
    const trytes = await iota.prepareTransfers(seed, transfers);
    // Send bundle to node.
    const response = await iota.sendTrytes(trytes, 3/*depth*/, 9/*MWM*/);
    ```

    :::info:Depth
    The `depth` argument affect tip selection. The greater the depth, the farther back in the Tangle the weighted random walk starts.
    :::
    
    :::info:Minimum weight magnitude (MWM)
    The [`minimum weight magnitude`](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md) (MWM) argument affects the difficulty of proof of work (PoW). The greater the MWM, the more difficult the PoW.
    
    Every IOTA network enforces its own MWM. On the Devnet, the MWM is 9. But, on the Mainnet the MWM is 14. If you use a MWM that's too small, your transactions won't be valid and will never be confirmed.
    :::

:::success:Congratulations :tada:
You've just sent your value transaction. Your transaction is attached to [the Tangle](../introduction/what-is-the-tangle.md). Now, you just need to wait until the transaction is confirmed before your balance can be updated.
:::

In the console, you'll see information about the transaction in the [bundle](../introduction/what-is-a-bundle.md) that you sent.

The transactions in your bundle will be forwarded through the network until all the nodes have it in their copy of the Tangle.

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

Before you run this sample code, replace the seed with your own test seed.

:::danger:Important
If you own IOTA tokens on the Mainnet, we recommend creating a new test seed to use on the Devnet.

If you don't have any test tokens, [request some from the Devnet faucet](../tutorials/receive-test-tokens.md).
:::

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-IOTA-tokens-on-the-Devnet?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Check if your transaction is confirmed](root://dev-essentials/0.1/how-to-guides/check-transaction-confirmation.md).

