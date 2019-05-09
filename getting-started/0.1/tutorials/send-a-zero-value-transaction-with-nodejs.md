# Send your first zero-value transaction (Node.js)

**A zero-value [transaction](../introduction/what-is-a-transaction.md) can be sent using a random seed that doesn't contain IOTA tokens. These transactions are useful for applications that want to send and store immutable messages on the Tangle.**

To send a transaction, you must do the following:

1. Connect to a node
2. Create a bundle and send it to the node

## Prerequisites

To complete this tutorial, you need the following:

* [Node.js (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

## Connect to a node

In IOTA, transactions must be sent to [nodes](../introduction/what-is-a-node.md).

You can choose to connect and send bundles to a node on any [IOTA network](../references/iota-networks.md). In this example, we connect to a Devnet node.

1. In the command prompt, create a working directory called `iota-example`

    ```bash
    mkdir iota-example
    ```

2. Change into the `iota-example` directory and install the IOTA client libraries

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

    You now have a package.json file and a `node_modules` directory, which contains the IOTA client libraries and their dependencies.

3. In the `iota-example` directory, create a new file called `index.js`

4. Require the IOTA client libraries

    ```js
    // Require the IOTA libraries
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    ```
5. Connect to a node

    ```js
    // Create a new instance of the IOTA object
    // Use the `provider` field to specify which IRI node to connect to
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

6. Call the `getNodeInfo()` method and print the results to the console

    ```js
    // Call the `getNodeInfo()` method for information about the IRI node
    iota.getNodeInfo()
    // Convert the returned object to JSON to make the output more readable
    .then(info => console.log(JSON.stringify(info, null, 1)))
    .catch(err => {
        // Catch any errors
        console.log(err);
    });
    ```

7. Save the file and run the code

    ```bash
    node index.js
    ```

    Some information about the IRI node that you're connected to should be displayed in the output:

    ```json
    {
     "appName": "IRI Testnet",
     "appVersion": "1.5.6-RELEASE",
     "jreAvailableProcessors": 8,
     "jreFreeMemory": 12052395632,
     "jreVersion": "1.8.0_181",
     "jreMaxMemory": 22906667008,
     "jreTotalMemory": 16952328192,
     "latestMilestone": "FPRSBTMKOP9JTTQSHWRGMPT9PBKYWFCCFLZLNWQDFRCXDDHZEFIEDXRIJYIMVGCXYQRHSZQYCTWXJM999",
     "latestMilestoneIndex": 1102841,
     "latestSolidSubtangleMilestone": "FPRSBTMKOP9JTTQSHWRGMPT9PBKYWFCCFLZLNWQDFRCXDDHZEFIEDXRIJYIMVGCXYQRHSZQYCTWXJM999",
     "latestSolidSubtangleMilestoneIndex": 1102841,
     "milestoneStartIndex": 434525,
     "neighbors": 3,
     "packetsQueueSize": 0,
     "time": 1549482118137,
     "tips": 153,
     "transactionsToRequest": 0,
     "features": ["snapshotPruning", "dnsRefresher", "testnet", "zeroMessageQueue", "tipSolidification", "RemotePOW"],
     "coordinatorAddress": "EQQFCZBIHRHWPXKMTOLMYUYPCN9XLMJPYZVFJSAY9FQHCCLWTOLLUGKKMXYFDBOOYFBLBI9WUEILGECYM",
     "duration": 0
    }
    ```

:::success:
You've confirmed your connection to the node. Now, you can send a transaction to it.
:::

:::info:Want to run your own node?
You could [run your own node in a Docker container](../tutorials/run-your-own-iri-node.md) and connect to it instead of the Devnet one.
:::

## Create a bundle and send it to a node

When you're connected to a node, you can create a transaction, package it in a [bundle](../introduction/what-is-a-bundle.md), and send it to a node. When you do this, your transaction is attached to [the Tangle](../introduction/what-is-the-tangle.md).

1. . At the end of the `index.js` file, create a variable to store the address to which you want to send a message

    ```js
    const address =
    'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD';
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://iota-basics/0.1/concepts/trinary.md).
    :::

2. Create a variable to store your seed, which will be used to derive an address from which to send the message

    ```js
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

    :::info:
    Seeds must contain 81 tryte-encoded characters. If a seed consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

3. Create a message that you want to send to the address and convert it to trytes

    ```js
    const message = Converter.asciiToTrytes('Hello World!');
    ```

    :::info:
    IOTA networks accept only [tryte-encoded](root://iota-basics/0.1/concepts/trinary.md) messages.
    :::

4. Create a transfer object that specifies the value, message to send, and the address to send it to

    ```js
    const transfers = [
    {
        value: 0,
        address: address,
        message: message
    }
    ];
    ```

    :::info:Transaction fields
    A transaction consists of [other fields](root://iota-basics/0.1/references/structure-of-a-transaction.md), but these ones are all you need to send a zero-value transaction.

    The message is put in the `signatureMessageFragment` field of the transaction.
    :::

5. Pass the `transfers` array to the [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method to construct a [bundle](../introduction/what-is-a-bundle.md). Then, pass the bundle's trytes to the `sendTrytes()` method to do [tip selection](root://the-tangle/0.1/concepts/tip-selection.md), [proof of work](root://the-tangle/0.1/concepts/proof-of-work.md), and send the bundle to the [node](../introduction/what-is-a-node.md)

    ```js
    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, 3/*depth*/, 9/*minimum weight magnitude*/)
        })
        .then(bundle => {
        console.log(`Bundle: ${JSON.stringify(bundle, null, 1)}`)
    })
    .catch(err => {
            // Catch any errors
        console.log(err);
    });
    ```

    :::info:Depth
    The `depth` argument affect tip selection. The greater the depth, the farther back in the Tangle the weighted random walk starts.
    :::
    
    :::info:Minimum weight magnitude
    The [`minimum weight magnitude`](root://iota-basics/0.1/concepts/minimum-weight-magnitude.md) (MWM) argument affects the difficulty of proof of work (PoW). The greater the MWM, the more difficult the PoW.
    
    Every IOTA network enforces its own MWM. On the Devnet, the MWM is 9. But, on the Mainnet the MWM is 14. If you use a MWM that's too small, your transactions won't be valid.
    :::
    
6. Save the file and run the code

    ```bash
    node index.js
    ```

:::success:Congratulations :tada:
You've just sent your first zero-value transaction.
:::

In the console, you'll see information about the [bundle](../introduction/what-is-a-bundle.md) that you sent.

Your transaction will propagate through the IOTA network until all the nodes have it in their ledgers.

## Run the code

Click **run** to run the sample code in this tutorial and see the results in the web browser.

<iframe height="400px" width="100%" src="https://repl.it/@jake91/51-Send-ASCII-Data?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

To confirm that your bundle in on the network (attached to the Tangle), copy the value of the `bundle` field from the console, open a [Devnet Tangle explorer](https://devnet.thetangle.org/), and paste the value into the search bar.

See the Parent transactions field to check which transactions your transaction is attached to in the Tangle.

These transactions were chosen during tip selection and added to the [`branchTransaction` and `trunkTransaction` fields](root://iota-basics/0.1/references/structure-of-a-transaction.md) of your transaction.

:::info:Interested in running a node?
[Discover more about node software](root://iri/0.1/introduction/overview.md) and [follow an in-depth guide on running a node](root://iri/0.1/how-to-guides/run-an-iri-node-on-linux.md).
:::


