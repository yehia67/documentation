# Do proof of work for a large bundle

**In this guide, you use the CryptoCore to do proof of work for a bundle that contains 8 zero-value transactions.**

## Prerequisites

To complete this guide, you need to have completed the [CryptoCore getting started guide](../introduction/get-started.md).

You also need the following installed on the Raspberry Pi (follow the Ubuntu installation instructions):

- [Node.js](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- [JQ](https://stedolan.github.io/jq/download/)

## Step 1. Get tip transactions from the Tangle

In this step, you write a script that finds two tip transaction hashes, which you can use later as branch and trunk transactions.

1. Create a directory called `cryptocore-scripts/node-scripts`

    ```bash
    sudo mkdir ~/cryptocore-scripts/node-scripts
    ```

2. Install the `core` package

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo npm i @iota/core
    ```

3. Create a file called `get-branch-and-trunk.js`

    ```bash
    sudo nano get-branch-and-trunk.js
    ```

4. Copy and paste the following:

    ```js
    #!/usr/bin/env node

    const Iota = require('@iota/core');

    // Get the first argument that the main script passed to this one
    // This should be a minimum weight magnitude (14 or 9)
    const network = process.argv[2];

    // Define a node for each IOTA network
    const nodes = {
            devnet: 'https://nodes.devnet.iota.org:443',
            mainnet: `https://nodes.iota.org:443`
    }

    // Connect to the correct IOTA network, depending on the user's
    // selection in the main script
    if (network === 14) {
            iota = Iota.composeAPI({
            provider: nodes.mainnet
            });
    } else {
            iota = Iota.composeAPI({
            provider: nodes.devnet
            });
    }

    // Ask the connected IOTA node for two tip transaction hashes
    iota.getTransactionsToApprove(3)
    .then(transactionHashes => {
        console.log(JSON.stringify(transactionHashes));
    })
    .catch(error => {
        console.log(error)
    });
    ```

5. Save and close the file

Now, you're ready to write the code that creates a bundle.

## Step 2. Create a bundle

In this step, you write a script that creates eight zero-value transactions, chains them into a bundle, and returns the transaction trytes without a proof of work.

1. Create a file called `create-bundle.js`

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo nano create-bundle.js
    ```

2. Install the `converter` package

    ```bash
    sudo npm i @iota/converter
    ```

3. Copy and paste the following:

    ```js
    #!/usr/bin/env node

    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    const fs = require('fs');

    // Get the first argument that was passed to this script
    // This should be a minimum weight magnitude (14 or 9)
    const network = process.argv[2];

    // Define a node for each IOTA network
    const nodes = {
            devnet: 'https://nodes.devnet.iota.org:443',
            mainnet: `https://nodes.iota.org:443`
    }

    // Connect to the correct IOTA network, depending on the user's
    // selection in the main script
    if (network === 14) {
        iota = Iota.composeAPI({
            provider: nodes.mainnet
            });
    } else {
        iota = Iota.composeAPI({
            provider: nodes.devnet
            });
    }

    // Define an address to send all transaction to
    const address = "CRYPTOCORE99999999999999999999999999999999999999999999999999999999999999999999999"

    // Create one transfer object for each transaction that you want to send
    var transfers = [{
        'address': address,
        // These transactions do not send IOTA tokens
        'value': 0,
        // The `asciiToTrytes()` method supports only basic ASCII characters. As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
        'message': Converter.asciiToTrytes('Hello, this is my first message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },
        
    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my second message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my third message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my fourth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my fifth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my sixth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my seventh message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    },

    {
        'address': address, 
        'value': 0,
        'message': Converter.asciiToTrytes('Hello, this is my eighth message on a CryptoCore'),
        'tag': 'CRYPTOCORE'
    }];

    // The library expects a seed, but it is not used because these are zero-value transactions,
    // therefore this bundle is not signed
    const seed = "999999999999999999999999999999999999999999999999999999999999999999999999999999999"

    // Path to which to save the bundle's transaction trytes
    const savedTransactionTrytes = "/home/pi/cryptocore-scripts/attached-transaction-trytes/bundleTrytes.txt";

    // Chain the transactions into a bundle
    iota.prepareTransfers(seed, transfers)
        .then(function(trytes){
        console.log(JSON.stringify(trytes));
        })
        .catch(error => {
            console.log(error)
    });
    ```

4. Save and close the file

## Step 3. Send a bundle

In this step, you write a script that sends a bundle of transaction trytes with a proof of work to a node.

:::info:
The proof of work is done by the CryptoCore in the main script in the next step.
:::

1. Create a file called `create-bundle.js`

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo nano create-bundle.js
    ```

2. Install the `transaction-converter` package

    ```bash
    sudo npm i @iota/transaction-converter
    ```

3. Copy and paste the following:

    ```js
    #!/usr/bin/env node

    const Iota = require('@iota/core');
    const Transaction = require('@iota/transaction-converter');
    const fs  = require('fs');

    // Get the first argument that was passed to this script
    // This should be a minimum weight magnitude (14 or 9)
    const network = process.argv[2];

    console.log(network);
    // Define a node for each IOTA network
    const nodes = {
            devnet: 'https://nodes.devnet.iota.org:443',
            mainnet: `https://nodes.iota.org:443`
    }

    // Connect to the correct IOTA network, depending on the user's
    // selection in the main script
    if (network === '14') {
            iota = Iota.composeAPI({
            provider: nodes.mainnet
            });
    } else {
            iota = Iota.composeAPI({
            provider: nodes.devnet
            });
    }

    // Path to the file where the main script saved the transaction trytes
    const savedTransactionTrytes = "/home/pi/cryptocore-scripts/attached-transaction-trytes";


    // Check the file for transaction trytes
    const data = fs.readFileSync(`${savedTransactionTrytes}/attached_trytes.txt`);
    const match = data.toString().match(/(?<=({"trytes":))\["[^\]]+\]/g);
    const trytes = JSON.parse(match[0]);

    if (!trytes) {
            console.log("No trytes found. Make sure that proof of work was done and check the following file :");
            console.log(`${savedTransactionTrytes}/attached_trytes.txt`);
    }

    // Send the transaction trytes to the connected IOTA node
    iota.storeAndBroadcast(trytes)
    .then(trytes => {
            console.log("Successfully attached transactions to the Tangle");
            // print the transaction details
        console.log("Tail transaction hash: ");
        console.log(JSON.stringify(trytes.map(t => Transaction.asTransactionObject(t))[trytes.length-1].hash))
    })
    .catch(error => {
        console.log(error);
    });
    ```

4. Save and close the file

## Step 4. Open the serial terminal on the CryptoCore

In this step, you write a script that opens a serial terminal on the CryptoCore, using Node.js.

1. Install the packages

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo npm i serialport
    ```

3. Create a file called `serial.js`

    ```bash
    sudo nano serial.js
    ```

4. Copy and paste the following:

    ```js
    #!/usr/bin/env node

    const SerialPort = require('serialport');
    const Readline = require('@serialport/parser-readline');
    const port = new SerialPort("/dev/ttyS0", { baudRate: 115200 });
    const parser = new Readline();

    port.pipe(parser);

    parser.on('data', function(data) {
        console.log(data);
        port.close(function() {});
    });

    var myArgs = process.argv.slice(2);

    port.write(myArgs[0])
    port.write("\r")
    ```

5. Save and close the file

## Step 5. Do proof of work on the CryptoCore

In this step, you use the CryptoCore API to do proof of work for eight transactions, using the data that's returned from the `get-branch-and-trunk.js` and `create-bundle.js` scripts.

1. Create a directory called `cryptocore-scripts`

    ```bash
    cd ~/scripts
    sudo mkdir cryptocore-scripts
    cd cryptocore-scripts
    ```

2. Create a new file called `do_pow.sh`

    ```bash
    sudo nano do_pow.sh
    ```

3. Ask whether the user wants to create a transaction for the Devnet or the Mainnet, and store the answer in the `MWM` variable

    ```bash
    #!/bin/bash

    read -p "Are you sending this transaction to the Devnet or the Mainnet? " MWM
    ```

4. Use a regular expression to check if the user's answer begins with an 'm' and set the [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) (MWM) according to the outcome

    ```bash
    if [[ $MWM =~ ^[mM] ]]
    then
            echo "Setting minimum weight magnitude to 14 for the Mainnet."
            MWM=14
    else
            echo "Setting minimum weight magnitude to 9 for the Devnet."
            MWM=9
    fi
    ```

    :::info:
    The MWM is essential for the CryptoCore to output a valid proof of work.
    :::

5. Create a bundle of zero-value transactions by executing the `create-bundle.js` script and save the output to a `trytes` variable

    ```bash
    echo "Creating bundle"

    trytes=$(node ../node-scripts/create-bundle.js $MWM)
    ```

6. Get two tip transaction hashes from the Tangle by executing the `get-branch-and-trunk.js` script

    ```bash
    echo "Getting tip transactions"

    trunk_and_branch=$(node ../node-scripts/get-branch-and-trunk.js $MWM)

    trunk=$(echo "$trunk_and_branch" | jq '.trunkTransaction')
    branch=$(echo "$trunk_and_branch" | jq '.branchTransaction')
    ```

7. Create an `attachToTangle` API request, pipe it into a serial terminal, and save the result to a file

    ```bash
    # Get the current Unix epoch in milliseconds for the `attachmentTimestamp` field
    timestamp=$(date +%s%3N)

    # Make sure a directory exists in which to save the transaction trytes
    saved_transaction_directory="../attached-transaction-trytes"

    if [ ! -d $saved_transaction_directory ]; then
        mkdir $saved_transaction_directory
    fi

    echo "Doing proof of work on CryptoCore"

    template='{"command":"attachToTangle","trunkTransaction": %s,"branchTransaction":%s,"minWeightMagnitude":%s,"timestamp":%s,"trytes":%s}'

    json_string=$(printf "$template" $trunk $branch $MWM  $timestamp $trytes)

    node ../node-scripts/serial.js "$json_string" > $saved_transaction_directory/attached_trytes.txt
    ```

8. Send the transaction trytes, which now include a proof of work, to the connected IOTA node by executing the `send-bundle.js` script

    ```bash
    attached_trytes=$(node ../node-scripts/send-bundle.js $MWM)

    echo "$attached_trytes"
    ```

9. Save and close the file and give yourself permission to execute it

    ```bash
    sudo chmod 777 do_pow.sh
    ```

10. Run the code and follow the prompts

    ```bash
    sudo ./do_pow.sh
    ```

:::success:
You have just written a command-line interface (CLI) program that uses the CryptoCore API to do proof of work for eight transactions, then attaches the transaction to the Tangle.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/JakeSCahill/cryptocore-scripts).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

If you don't have a JavaScript development environment, or if this is your first time using the JavaScript client library, complete our [getting started guide](root://client-libraries/0.1/getting-started/js-quickstart.md).

In the command-line, do the following:

1. Clone the repository and change into the `cryptocore-scripts/node-scripts` directory

    ```bash
    git clone https://github.com/JakeSCahill/cryptocore-scripts
    cd cryptocore-scripts/node-scripts
    ```

2. Install the packages

    ```bash
    sudo npm i
    ```

    You should see something like the following:

    ```
    npm notice created a lockfile as package-lock.json. You should commit this file.
    added 128 packages from 68 contributors and audited 338 packages in 34.171s

    2 packages are looking for funding
    run `npm fund` for details

    found 0 vulnerabilities
    ```

3. Run the `do_pow.sh` script and respond to the prompts

    ```bash
    cd ~/cryptocore-scripts/bash-scripts
    sudo ./do_pow.sh
    ```

4. Follow the prompts

You should see something like the following:

```bash
Welcome to the spam bundle creator
Are you sending transactions to the Devnet or the Mainnet? m
Setting minimum weight magnitude to 14 for the Mainnet.
Creating bundle
Getting tip transactions
Doing proof of work on CryptoCore
14
Successfully attached transactions to the Tangle
Tail transaction hash:
"XDAHIDSSUXIPWPUSVBUWPMYIXWAWPTKLUAHUCVGQRHH9MYGUGVVNVDPRMKULLWTPYQRKSWNTXUQMA9999"
```

To see your bundle on the Tangle, copy the tail transaction hash and paste it into a [Tangle explorer](https://utils.iota.org/).

If the Tangle explorer doesn't display your transaction after 5 minutes, the node may not have sent your transaction to its neighbors.

To resend your transaction, you can pass the transaction trytes in the `attached-transaction-trytes/attached_trytes.txt` file to the [`storeAndBroadcast()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#corestoreandbroadcasttrytes-callback) method in the JavaScript client library.

## Next steps

[Generate a random seed](../iota-projects/generate-a-seed.md) on the CryptoCore and store it in the secure memory.