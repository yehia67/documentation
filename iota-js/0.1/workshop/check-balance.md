# Check the balance of an address

**The balance of [addresses](root://getting-started/0.1/clients/addresses.md) is kept up to date by all [nodes](root://getting-started/0.1/network/nodes.md) in an IOTA network. To request the balance from a node, you must send it the address whose balance you want to check.**

## Prerequisites

To complete this guide, you need the following:

- [A developer environment](../workshop/set-up-a-developer-environment.md)
- [The `core` package](../workshop/install-packages.md)
- An address that contains test IOTA tokens

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

---

1. Require the packages

    ```js
    const Iota = require('@iota/core');
    ```

2. Connect to a node

    ```js
    const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
    });
    ```

3. Define the address whose balance you want to check

    ```js
    const address =
    'NBZLOBCWG9BAQTODDKNF9LYYTBOUWSQSGCWFQVZZR9QXCOAIBRYDTZOEGBGMZKJYZOPPGRGFFWTXUKUKW';
    ```

4. Use the `getBalances()` method to ask the node for the current balance of the address

    ```js
    iota.getBalances([address], 100)
      .then(({ balances }) => {
      console.log(balances)
      })
      .catch(err => {
      console.error(err)
      });
    ```


    In the console, you should see a balance.

    ```
    [500]
    ```

:::success:Congratulations :tada:
You've just checked the balance of an address.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-the-balance-of-an-address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Transfer IOTA tokens from one address to another](../workshop/transfer-iota-tokens.md).
