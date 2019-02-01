# Send your first zero-value transaction (Node.js)

**A zero-value transaction can be sent using a random seed that doesn't contain IOTA tokens. These transactions are useful for applications that want to send and store immutible messages on the Tangle.**

## Prerequisites

To complete this tutorial, you need the following:

* [Node JS (8+)](https://nodejs.org/en/)
* A code editor
* Access to a terminal
* An Internet connection

---

In IOTA, transactions must be sent to [IRI nodes](root://iri/0.1/introduction/overview.md).

If you know the URL of an IRI node, you can send it a transaction. In this example we use the URL of an IRI node on the IOTA Devnet network and use the [`getNodeInfo()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNodeInfo) method to check that the IRI node is online.

1. In the terminal, create a working directory called iota-example

    ```bash
    mkdir iota-example
    ```

2. Change into the iota-example directory and install the required Node.js libraries
    ```bash
    cd iota-example
    npm install @iota/core @iota/converter --save
    ```

    If everthing went well, you should see something like the following in the output. You can ignore any 'npm WARN' messages.

    ```shell
    + @iota/converter@1.0.0-beta.8
    + @iota/core@1.0.0-beta.8
    added 19 packages from 10 contributors and audited 68 packages in 5.307s
    found 0 vulnerabilities
    ```

    You now have a package.json file and a node_modules folder, which contains the IOTA library and its dependencies.

3. In the iota-example directory, create a new file called index.js and add the following to it:

    ```js
    // Require the IOTA libraries
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    // Create a new instance of the IOTA object
    // Use the `provider` field to specify which IRI node to connect to
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    // Call the `getNodeInfo()` method for information about the IRI node
    iota.getNodeInfo()
    // Convert the returned object to JSON to make the output more readable
    .then(info => console.log(JSON.stringify(info)))
    .catch(err => {
        // Catch any errors
        console.log(err);
    });
    ```

4. Save the file and run the code

    ```bash
    node index.js
    ```

    Some information about the IRI node that you're connected to is displayed in the console:

    ```json
    {
    "appName":"IRI Testnet",
    "appVersion":"1.5.5",
    "jreAvailableProcessors":8,
    "jreFreeMemory":25013138032,
    "jreVersion":"1.8.0_181",
    "jreMaxMemory":51469877248,
    "jreTotalMemory":31622422528,"latestMilestone":"WB9YXQQTVHNPWXHBCVEWVPWZNJAFSGPVYWPEJXVPGJIFJFFHLFAIFPAWEHJGKEIHMYAUHXOPIUGZOA999",
    "latestMilestoneIndex":1014730,"latestSolidSubtangleMilestone":"WB9YXQQTVHNPWXHBCVEWVPWZNJAFSGPVYWPEJXVPGJIFJFFHLFAIFPAWEHJGKEIHMYAUHXOPIUGZOA999",
    "latestSolidSubtangleMilestoneIndex":1014730,
    "milestoneStartIndex":434525,
    "neighbors":7,
    "packetsQueueSize":0,
    "time":1545903340781,
    "tips":4995,
    "transactionsToRequest":0,
    "features":["addNeighbors", "getNeighbors", "removeNeighbors", "attachToTangle", "interruptAttachToTangle"],
    "duration":0
    }
    ```

    Now that you've confirmed your connection to an IRI node, send a transaction to it.

5. At the end of the index.js file, add the following:
    ```js
    const address =
    'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'
    const message = Converter.asciiToTrytes('Hello World!')

    const transfers = [
    {
        value: 0,
        address: address,
        message: message
    }
    ]

    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, 3, 9)
        })
        .then(bundle => {
        console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
        console.log(`Bundle: ${bundle}`)
    })
    .catch(err => {
            // Catch any errors
        console.log(err);
    });
    ```
5. Save the file and run the code

    ```bash
    node index.js
    ```

Congratulations 🎊. You've just sent your first zero-value transaction.

You'll see information about the IRI node and the bundle that you've just sent.

![Content of a bundle](../success.png)

Your transaction will propgate through the IOTA network until all the IRI nodes have it in their ledgers.

To confirm that your bundle in on the network, copy the value of the `bundle` field from the console output, open a [Devnet Tangle explorer](https://devnet.thetangle.org/), and paste the value into the search bar.

**Note:** Zero-value transactions don't need to be confirmed, only value transactions do.

## Final Code

The contents of the index.js file should look like this:

```js
// Require the IOTA libraries
const Iota = require('@iota/core');
const Converter = require('@iota/converter');
// Create a new instance of the IOTA object
// Use the `provider` field to specify which IRI node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.devnet.iota.org:443'
});
// Call the `getNodeInfo()` method for information about the IRI node
iota.getNodeInfo()
    // Convert the returned object to JSON to make the output more readable
    .then(info => console.log(JSON.stringify(info)))
    .catch(err => {
        // Catch any errors
        console.log(err);
    });
const address = 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'
const message = Converter.asciiToTrytes('Hello World!');
const transfers = [
    {
    value: 0,
    address: address,
    message: message
    }
];

 iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, 3, 9)
    })
    .then(bundle => {
    console.log(`Published transaction with tail hash: ${bundle[0].hash}`);
    var JSONBundle = JSON.stringify(bundle);
    console.log(`Bundle: ${JSONBundle}`)
})
.catch(err => {
        // Catch any errors
    console.log(err);
});
```

### Code breakdown

```javascript
const address =
'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'
const seed =
'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'
const message = Converter.asciiToTrytes('Hello World!')
```

The `address` and `message` constants are used in the `transfers` object that's passed to the [`prepareTransfer()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method.

The value of the `message` constant is converted to trytes because IOTA networks accept only [tryte-encoded](root://iota-basics/0.1/concepts/trinary.md) messages.
The value of the `address` constant is the address that the message is sent to.
The value of the `seed` constant is the seed that is used to generate an address to send the message from.

**Note:** Seeds and address must both contain 81 tryte-encoded characters. If a seed consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters. 

---

```javascript
const transfers = [
{
    value: 0,
    address: address,
    message: message
}]
```

The `transfers` array lets you specify transfers you want to make from
an address. In this case, you send a transfer with no value to an address and you include the tryte-encoded message 'Hello World!'.

---

```javascript
    iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, 3/*depth*/, 9 /*mwm*/)
    })
    .then(bundle => {
    console.log(`Published transaction with tail hash: ${bundle[0].hash}`);
    var JSONBundle = JSON.stringify(bundle);
    console.log(`Bundle: ${JSONBundle}`);
})
.catch(err => {
        // Catch any errors
    console.log(err);
});
```

The [`prepareTransfers()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.prepareTransfers) method constructs a bundle on the client side. The [`sendTrytes()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.sendTrytes)  method sends the bundle to the IRI node.

Here's a table of the variables that are used in these methods:

|Field|Type|Description|
|:---:|:--:|:---------:|
|`seed` | string|This is the secret password that generates an address for you to send a transaction from. With **zero** value transactions, you don't need to have any IOTA tokens on an address, so this field can be 81 random trytes. |
|`depth` | number|The number of milestone transactions that the IRI node will walk back to start the [tip selection](root://the-tangle/0.1/concepts/tip-selection.md) process |
|`mwm` |number | This field specifies the [proof of work](root://the-tangle/0.1/concepts/proof-of-work.md) that is required for your transaction to be validated. On the Devnet, this field must have a value of at least 9|
| `transfers`| array|This array contains the value, address, and message of your transaction. You can specify multiple transfers with different addresses, and they'll be converted to transactions and put in a bundle |

## Next steps

Why not [run your own IRI node](root://iri/0.1/introduction/overview.md)?.
