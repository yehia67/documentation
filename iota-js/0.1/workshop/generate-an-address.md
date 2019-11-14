# Generate an address

**To receive [IOTA tokens](root://getting-started/0.1/clients/token.md), you must give the sender one of your [addresses](root://getting-started/0.1/clients/addresses.md). You can generate a new address for a [seed](root://getting-started/0.1/clients/seeds.md) by either incrementing the index and/or using a different [security level](root://getting-started/0.1/clients/security-levels.md).**

## Prerequisites

To complete this guide, you need the following:

- [A developer environment](../workshop/set-up-a-developer-environment.md)
- [The `core` package](../workshop/install-packages.md)

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

3. Define the security level that you want to use for your address

    ```js
    const securityLevel = 2;
    ```

4. Define a seed for which to generate an address

    ```js
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    ```

5. Use the [`getNewAddress()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getNewAddress) method to generate a new address

    ```js
    // Generate one address with index 0 and security level 2
    // If the address with the given index is spent, this method returns the next unspent address
    iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
        .then(address => {
            console.log('Your address is: ' + address);
        })
        .catch(err => {
            console.log(err)
        });
    ```

    In the console, you should see an address.

    ```
    Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
    ```

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the JavaScript client library in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Generate-an-address?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Get test IOTA tokens](root://getting-started/0.1/tutorials/get-test-tokens.md).
