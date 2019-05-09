# Create an address

**Addresses must not be withdrawn from more than once. If you withdraw IOTA tokens from an address, you must create a new one by incrementing the index or using a different security level.**

## Prerequisites

To complete this guide, you need the following:

* [Node.js (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

---

1. Create a new directory called `iota-basics`

2. In the command line, change into the `iota-basics` directory, and install the [IOTA core library](https://github.com/iotaledger/iota.js/tree/next/packages/core)

    ```bash
    cd iota-basics
    npm install --save @iota/core
    ```

3. In the `iota-basics` directory, create a new file called `create-address.js`

4. In the `create-address.js` file, require the IOTA libraries

    ```js
    const Iota = require('@iota/core');
    ```

5. Create an instance of the IOTA object and use the `provider` field to connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

6. Create a variable to store a seed

    ```js
    const seed =
    'PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

    :::info:
    Any code that uses a seed is executed on the client side. Your seed never leaves your device.
    :::

7. Pass the `seed` variable to the `getNewAddress()` method to create an address

    ```js
    iota.getNewAddress(seed, {index: 0, security: 2})
    .then(address => console.log(address));
    ```

    When you execute the file, you should see an address. If you execute the script again, you'll see the same address because its derived from the same seed, index and security level.

Try changing the index and security level arguments in the `getNewAddress()` method to create a different address.

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="400px" width="100%" src="https://repl.it/@jake91/Create-an-address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

:::warning:
If you call the `getNewAddress()` method without the index or security level, the library will return an address from which you haven't yet withdrawn.

To do this, the library asks the node to find input transactions that use the address.

We don't recommend omitting the index or security level because some nodes prune transactions from their ledgers. As a result, the library won't always know if an address is spent.
:::