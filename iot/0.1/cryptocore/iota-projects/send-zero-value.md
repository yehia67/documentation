# Send a zero-value transaction with the CryptoCore

**In this guide, you create a bash script that takes a user's input to create a zero-value transaction, using the CryptoCore UART API.**

## Prerequisites

To complete this guide, you need to have completed the [CryptoCore getting started guide](../introduction/get-started.md).

You also need Node.js installed on the Raspberry Pi. See [this article](https://github.com/nodesource/distributions/blob/master/README.md#debinstall) and follow the Ubuntu installation instructions.

## Step 1. Attach transaction trytes to the Tangle

In this step, you write a script that uses the Javascript client library to send the given transaction trytes to a node in the user's chosen IOTA network.

1. Create a directory called `cryptocore-scripts/node-scripts`

    ```bash
    cd ~
    sudo mkdir cryptocore-scripts/node-scripts
    cd cryptocore-scripts/node-scripts
    ```

2. Install the packages

    ```bash
    cd ~/cryptocore-scripts/node-scripts
    sudo npm i @iota/core @iota/transaction-converter
    ```

3. Create a file called `send-tx.js`

    ```bash
    sudo nano send-tx.js
    ```

4. Copy and paste the following:

    ```js
    #!/usr/bin/env node

    const Iota = require('@iota/core');
    const Transaction = require('@iota/transaction-converter');
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
    // selection in the CryptoCore script
    if (network === '14') {
            iota = Iota.composeAPI({
            provider: nodes.mainnet
            });
    } else {
            iota = Iota.composeAPI({
            provider: nodes.devnet
            });
    }

    // Path to the file where the CryptoCore script saved the transaction trytes
    const savedTransactionTrytes = "/home/pi/cryptocore-scripts/attached-transaction-trytes";

    // Check the file for transaction trytes
    const data = fs.readFileSync(`${savedTransactionTrytes}/zero_value_transaction.txt`);
    const match = data.toString().match(/(?<=({"trytes":))\["[^\]]+\]/g);
    const trytes = JSON.parse(match[0]);

    if (!trytes) {
            console.log("No trytes found. Make sure that proof of work was done and check the following file :");
            console.log(`${savedTransactionTrytes}/zero_value_transaction.txt`);
    }

    iota.storeAndBroadcast(trytes)
    .then(result => {
            console.log(Transaction.asTransactionObject(result));
    })
    .catch(error => {
            console.log(error)
    });
    ```

5. Save and close the file

## Step 2. Open the serial terminal on the CryptoCore

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

Now, you're ready to use the CryptoCore to create a transaction.

## Step 3. Create a zero-value transaction on the CryptoCore

In this step, you write a bash script that prompts the user for the parameters to use to call the `jsonDataTX` endpoint on the CryptoCore. Then you save the returned transaction trytes, which include a [proof of work](root://getting-started/0.1/transactions/proof-of-work.md), to a file that the `send-tx.js` script can read.

1. Create a directory called `cryptocore-scripts/bash-scripts`

    ```bash
    cd ~/cryptocore-scripts
    sudo mkdir bash-scripts
    cd bash-scripts
    ```

2. Create a new file called `create_tx.sh`

    ```bash
    sudo nano create_tx.sh
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

5. Ask whether the user wants to send the transaction to a particular address

    ```bash
    read -p "Would you like to send this zero-value transaction to a particular address? " answer

    if [[ $answer =~ ^[yY] ]]
    then
        read -s "Please enter the 81-tryte address: " address
        else
            address="999999999999999999999999999999999999999999999999999999999999999999999999999999999"
    fi
    ```

    :::info:
    If the user does not enter a word beginning with 'y', this block sets the address to all 9s.
    :::

6. Ask the user for a branch and trunk transaction hash

    ```bash
    read -p "Please enter a trunk transaction hash to use to attach this transaction to the Tangle: " trunk

    while [[ ! $trunk =~ ^[A-Z9]*{81}$ ]]; do
            echo "Hash invalid. Transaction hashes much contain 81 trytes."
            read -p "Please enter a trunk transaction hash: " trunk
    done


    read -p "Please enter a branch transaction hash to use to attach this transaction to the Tangle: " branch

    while [[ ! $branch =~ ^[A-Z9]*{81}$ ]]; do
            echo "Hash invalid. Transaction hashes much contain 81 trytes."
            read -p "Please enter a branch transaction hash: " branch
    done
    ```

    :::info:
    The `while` loops check that the transaction hashes are 81 trytes long. If the trytes are too long or too short, the user is promoted to enter valid ones.
    :::

7. Create a variable in which to store the current Unix epoch

    ```bash
    timestamp=$(date +%s)
    ```

8. Create a `jsonDataTX` API request, using the user's input, pipe it into a serial terminal, and save the result to a file

    ```bash
    # Make sure the directory exists
    saved_transaction_directory="../attached-transaction-trytes"

    if [ ! -d $saved_transaction_directory ]; then
        mkdir $saved_transaction_directory
    fi

    template='{"command":"jsonDataTX","trunkTransaction":"%s","branchTransaction":"%s","minWeightMagnitude":%s,"tag":"CRYPTOCORE99999999999999999", "address":"%s", "timestamp":%s,"data": { "message": "HELLO WORLD FROM CRYPTOCORE" }}'

    json_string=$(printf "$template" "$trunk" "$branch" $MWM "$address" $timestamp)

    node ../node-scripts/serial.js "$json_string" > $saved_transaction_directory/zero_value_transaction.txt
    ```

9. Execute the `send-tx.js` file and print the result to the console

    ```bash
    attached_trytes=$(node ../node-scripts/send-tx.js $MWM)

    echo "$attached_trytes"
    ```
    
9. Save and close the file and give yourself permission to execute it

    ```bash
    sudo chmod 777 create_tx.sh
    ```

10. Run the code and follow the prompts

    ```bash
    sudo ./create_tx.sh
    ```

:::success:
You have just written a command-line interface (CLI) program that uses the CryptoCore API to create a zero-value transaction, then attaches the transaction to the Tangle.
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

3. Run the `create_tx.sh` script and respond to the prompts

    ```bash
    cd ~/cryptocore-scripts/bash-scripts
    sudo ./create_tx.sh
    ```

4. Follow the prompts

You should see the transaction object that was sent to the node. For example:

```js
{
  hash: 'YQNCKGIGOZJJJGMNMAVWKJGDJLQOXDTADIJTYU9HBIGKTDKUXHBMOBXVZYWAUWOSKKYUSUIDVPNZZ9999',
  signatureMessageFragment: 'ODGAADTCGDGDPCVCTCGADBGARBOBVBVBYBEAFCYBACVBNBEAPBACYBWBEAMBACHCZBCCYBMBYBACOBGAQD99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
  address: '999999999999999999999999999999999999999999999999999999999999999999999999999999999',
  value: 0,
  obsoleteTag: 'CWYPTOCORE99999999999999999',
  timestamp: 1059930011,
  currentIndex: 0,
  lastIndex: 0,
  bundle: 'DAIHSSITPKSZRVHDTVLXIBPYGKLGKZBRDZSGRFYGIBXTPCZFIL9JAJDEGABAUVCJNHWAUULGXRBDGNDIZ',
  trunkTransaction: 'HEWJUPLE9GHUDOFGCARASDIUDMXDQSV99WBSJYIXWHVCMHFGIXRTTTHBIEJGUPHCQQQGEZMZPRSRA9999',
  branchTransaction: 'HEWJUPLE9GHUDOFGCARASDIUDMXDQSV99WBSJYIXWHVCMHFGIXRTTTHBIEJGUPHCQQQGEZMZPRSRA9999',
  tag: 'CRYPTOCORE99999999999999999',
  attachmentTimestamp: 1581607894939,
  attachmentTimestampLowerBound: 0,
  attachmentTimestampUpperBound: 11,
  nonce: 'ICCFPGA9B9999999UVNPNVVMMMM'
}
```

You can copy the `hash` field of your transaction object and paste it into a [Tangle explorer](https://utils.iota.org/).

If the Tangle explorer doesn't display your transaction after 5 minutes, the node may not have sent your transaction to its neighbors.

To resend your transaction, you can pass the transaction trytes in the `attached-transaction-trytes/zero_value_transaction.txt` file to the [`storeAndBroadcast()`](https://github.com/iotaledger/iota.js/tree/next/packages/core#corestoreandbroadcasttrytes-callback) method in the JavaScript client library.

## Next steps

Try [creating a large bundle of zero-value transactions](../iota-projects/do-proof-of-work.md) and doing proof of work for all of them on the CryptoCore.


