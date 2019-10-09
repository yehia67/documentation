# Send a bundle of zero-value transactions

**Transactions must be packaged in a bundle before being sent to a node. The IOTA client libraries have built-in functions that create bundles from transfer objects.**

:::info:First time using a client library?
[Try our quickstart guide](root://getting-started/0.1/tutorials/get-started.md) for getting started with the official client libraries.
:::

:::info:
If you're unfamiliar with the terms bundle or transaction, we recommend that you [read about bundles and transactions](../concepts/bundles-and-transactions.md).
:::

## Prerequisites

To complete this guide, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)


## Send a bundle of zero-value transactions

In this example, we create and send a bundle to a [Devnet node](root://getting-started/0.1/references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

:::info:
A bundle can consist of any number of transactions. But, because of the time and resources that are involved during [proof of work](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md), we recommend a maximum of 30 transactions in a bundle.
:::

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    ```

2. Create an instance of the IOTA object and use the `provider` field to connect to an IRI node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.thetangle.org:443'
    });
    ```

3. Create the variables to store a seed and two addresses to which you want to send transactions

    ```js
    const seed =
    'PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

    var recipientAddress1 = "CXDUYK9XGHC9DTSPDMKGGGXAIARSRVAFGHJOCDDHWADLVBBOEHLICHTMGKVDOGRU9TBESJNHAXYPVJ9R9";

    var recipientAddress2 = "CYJV9DRIE9NCQJYLOYOJOGKQGOOELTWXVWUYGQSWCNODHJAHACADUAAHQ9ODUICCESOIVZABA9LTMM9RW";
    ```

    :::info:
    Any code that uses a seed is executed on the client side. Your seed never leaves your device.
    :::

4. Create one `transfer` object for each transaction that you want to send. The `address` field contains the address to which the transaction will be sent.

    ```js
    var transfer1 = {
    'address': recipientAddress1,
    'value': 0,
    'message': Converter.asciiToTrytes('Hello, this is my first message'),
    'tag': 'SENDABUNDLEOFTRANSACTIONS'
    };

    var transfer2 = {
    'address': recipientAddress2, 
    'value': 0,
    'message': Converter.asciiToTrytes('Hello, this is my second message'),
    'tag': 'SENDABUNDLEOFTRANSACTIONS'
    };
    ```

    :::info:
    The `asciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

5. Create a bundle and pass the returned bundle trytes to the `sendTrytes()` method to do [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [proof of work](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md), and send the bundle to the node.

    ```js
    iota.prepareTransfers(seed, [transfer1, transfer2])
    .then(function(trytes){
        return iota.sendTrytes(trytes, 3, 9);
    })

    .then(results => console.log(JSON.stringify(results, ['hash', 'currentIndex', 'lastIndex', 'bundle', 'trunkTransaction', 'branchTransaction'], 1)));
    ```

    In the console, you'll see information about the bundle that you sent. The `currentIndex` field is the position of the transaction in the bundle. The `lastIndex` field is the last transaction in the bundle, which indicates the total number of transactions in it.

    ```json
    [
    {
    "hash": "9FVWBYVGTMDYPIYGMEHWQSZF9CDWHRADQNYIEJARTMXFSBTSAIFJPM9PNILLLBYIKSMIIDUOVSBWZ9999",
    "currentIndex": 0,
    "lastIndex": 1,
    "bundle": "TKLFNBRZCDUUOYBPHDIKKGSSVKLQINECAZHEKHJBPXZYXVXCDCLXZDQGUXTSZVWJVYABICHESIXXXLZU9",
    "trunkTransaction": "JIKDFORYEREMFYHLJHZGARNECTUUYYKSIVILDMEAPDYYXCVZHPVRJQDHKKWXMYGTUHBRBVYJXKTNA9999",
    "branchTransaction": "IRWPFAQQHSPRL9QBEQRSUSVEAAHQCNILEHJNUYZEQCQBFFLEV9FSGJQH9DZNKCHCOKGMAIXAUDBZZ9999"
    },
    {
    "hash": "JIKDFORYEREMFYHLJHZGARNECTUUYYKSIVILDMEAPDYYXCVZHPVRJQDHKKWXMYGTUHBRBVYJXKTNA9999",
    "currentIndex": 1,
    "lastIndex": 1,
    "bundle": "TKLFNBRZCDUUOYBPHDIKKGSSVKLQINECAZHEKHJBPXZYXVXCDCLXZDQGUXTSZVWJVYABICHESIXXXLZU9",
    "trunkTransaction": "IRWPFAQQHSPRL9QBEQRSUSVEAAHQCNILEHJNUYZEQCQBFFLEV9FSGJQH9DZNKCHCOKGMAIXAUDBZZ9999",
    "branchTransaction": "JPFAFQLMVHJYDWLPZUBKRWQIPYXUJUORQPYKBOLKRLAQKRDKVYWYZRQQEFSARZRPNZTGQANOIATT99999"
    }
    ]
    ```

    :::info:Trunk and branch transactions are called parent transactions.
    
    [All transactions in a bundle are connected through the value of their `trunkTransaction` fields](../references/structure-of-a-bundle.md). You should see that the `trunkTransaction` hash of transaction 0 is the same as the transaction hash (`hash`) of transaction 1.
    :::

6. To see details about your first transaction, copy the hash of the first transaction and paste it into [devnet.thetangle.org](https://devnet.thetangle.org/). These details have been sourced from the nodes that the website is connected to.

    ![Transaction in a Tangle explorer](../images/tangle-explorer.PNG)

7. To see details about your second transaction, scroll down to 'Parent transactions' and click the Trunk hash

    ![Trunk transaction in a Tangle explorer](../images/tangle-explorer-trunk.PNG)

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-bundle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>



