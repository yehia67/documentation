# Create an address

**To receive IOTA tokens, you must give the sender one of your addresses. These addresses are derived from your seed. You can derive a new address from a seed by either incrementing the index and/or using a different security level.**

:::info:First time using a client library?
[Try our quickstart guide](root://getting-started/0.1/tutorials/get-started.md) for getting started with the official client libraries.
:::

## Prerequisites

To complete this guide, you need the following:

* Node.js 8, or Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)


## Create a new address

In this example, we connect to a [Devnet node](root://getting-started/0.1/references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

1. Require the `core` package

    ```js
    const Iota = require('@iota/core');
    ```

2. Create an instance of the IOTA object and use the `provider` field to connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Create a variable to store a seed

    ```js
    const seed =
    'PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

    :::info:
    Any code that uses a seed is executed on the client side. Your seed never leaves your device.
    :::

4. Pass the `seed` variable to the `getNewAddress()` method to create an address

    ```js
    iota.getNewAddress(seed, {index: 0, security: 2})
    .then(address => console.log(address));
    ```

    When you execute the file, you should see an address. If you execute the script again, you'll see the same address because its derived from the same seed, index and security level.

Try changing the index and security level arguments in the `getNewAddress()` method to create a different address.

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Create-an-address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

:::warning:
If you call the `getNewAddress()` method without the index or security level, the API will return an address from which you haven't yet withdrawn (unspent).

To do this, the API asks the node to find input transactions that use the address.

We don't recommend omitting the index or security level because some nodes prune transactions from their ledgers. As a result, the API won't always know if an address is spent.
:::