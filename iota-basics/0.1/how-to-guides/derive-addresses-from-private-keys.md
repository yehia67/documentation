# Derive addresses from private keys

**By using a client library to derive addresses from private keys, you can gain a better understanding of the relationship among addresses, private keys, and security levels.**

:::info:First time using a client library?
[Try our quickstart guide](root://getting-started/0.1/tutorials/get-started.md) for getting started with the official client libraries.
:::

:::info:
If you're unfamiliar with the terms private key, subseed, and key digest, we recommend [reading about addresses and signatures](../concepts/addresses-and-signatures.md).
:::

## Prerequisites

To complete this guide, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* An Internet connection

## Derive addresses from private keys

In this example, we use the [`signing` package](https://github.com/iotaledger/iota.js/tree/next/packages/signing) of the iota.js library to derive private keys from a seed and then to derive addresses from those private keys.

1. Require the IOTA libraries

    ```js
    const Iota = require('@iota/core');
    const Sign = require('@iota/signing');
    const Converter = require('@iota/converter');
    ```

2. Derive a subseed by passing a seed in trits and an index to the `subseed()` method

    ```js
    const seed = "PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";

    var subseed = Sign.subseed(Converter.trytesToTrits(seed), 0 /*index*/);
    ```

    :::info:
    Any code that uses a seed is executed on the client side. Your seed never leaves your device.
    :::

3. Derive one private key for each of the three security levels by passing the same subseed and a different security level to the `key()` method

    ```js
    var privateKey1 = Sign.key(subseed, 1 /*security level*/);

    console.log('Private key length for security level 1: ' + Converter.tritsToTrytes(privateKey1).length);

    var privateKey2 = Sign.key(subseed, 2 /*security level*/);

    console.log('Private key length for security level 2: ' + Converter.tritsToTrytes(privateKey2).length);

    var privateKey3 = Sign.key(subseed, 3 /*security level*/);

    console.log('Private key length for security level 3: ' + Converter.tritsToTrytes(privateKey3).length);
    ```

    When you execute the file, you should see the length of each private key in trytes:

    ```console
    Private key length for security level 1: 2187

    Private key length for security level 2: 4374

    Private key length for security level 3: 6561
    ```

    :::info:
    [Find out more about security levels](../references/security-levels.md).
    :::

4. Derive the key digests for each private key by passing each one to the `digests()` method

    ```js
    var privateKey1Digests = Sign.digests(privateKey1);

    console.log(`Total key digests for security level 1: ` + Converter.tritsToTrytes(privateKey1Digests).length/81);

    var privateKey2Digests = Sign.digests(privateKey2);

    console.log(`Total key digests for security level 2: ` + Converter.tritsToTrytes(privateKey2Digests).length/81);

    var privateKey3Digests = Sign.digests(privateKey3);

    console.log(`Total key digests for security level 3: ` + Converter.tritsToTrytes(privateKey3Digests).length/81);
    ```

    When you execute the file, you should see the amount of key digests for each private key:

    ```console
    Total key digests for security level 1: 1

    Total key digests for security level 2: 2

    Total key digests for security level 3: 3
    ```

    :::info:
    [Find out more about key digests](../concepts/addresses-and-signatures.md).
    :::

5. Derive an address for each private key by passing the digests to the `address()` method

    ```js
    var privateKey1Address = Sign.address(privateKey1Digests);

    console.log('Address with security level 1: ' + Converter.tritsToTrytes(privateKey1Address));

    var privateKey2Address = Sign.address(privateKey2Digests);

    console.log('Address with security level 2: ' + Converter.tritsToTrytes(privateKey2Address));

    var privateKey3Address = Sign.address(privateKey3Digests);

    console.log('Address with security level 3: ' + Converter.tritsToTrytes(privateKey3Address));
    ```

    When you execute the file, you should see the addresses for each security level:

    ```console
    Address with security level 1: ZWENNY9JOIQRJIRHV9PCQMCHKBXVZTTKMVRSZSKQNQCQCTZMTMUPEWE9DPCVBVZOVGFFI9JYLTIFXGJAX
    Address with security level 2: ECMHBSFPVUWHSUXZBXTWSKNMBGNTW9GAFVJUUSSJYFBOKHNFJBPEKJNMQMCSAIBXVUJNQKUBFUXPEIY9B
    Address with security level 3: LJGSYD9N9JEAQ9AVN9BJCAOW9LFVZGFHOXFVFVLQEBKVZFGBIDJJIRK9FBJUKRS9VMUXTCXBRIOOEMQJ9
    ```

6. To check that the same addresses would be returned from the IOTA core library, do the following:

    ```js
    console.log(Iota.generateAddress(seed, 0 /*index*/, 1 /*security level*/));
    console.log(Iota.generateAddress(seed, 0 /*index*/, 2 /*security level*/));
    console.log(Iota.generateAddress(seed, 0 /*index*/, 3 /*security level*/));
    ```

    You should see the same addresses in the output as those from step 8.
    
:::success:Congratulations :tada:
You've proven that, under the hood of the IOTA core library, addresses are derived from private keys with a certain index and security level.
:::

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Derive-addresses-from-private-keys?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

