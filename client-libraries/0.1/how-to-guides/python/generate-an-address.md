# Generate an address in Python

**In this guide, you learn how to generate a new address for a [seed](root://getting-started/0.1/clients/seeds.md) with a given [security level](root://getting-started/0.1/clients/security-levels.md).**

## IOTA packages

To complete this guide, you need to install the following package:

```bash
pip install pyota
```

## IOTA network

In this guide, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Import the packages

    ```python
    from iota import Iota
    ```

2. Define a seed for which to generate an address

    ```python
    seed = 'PUETPSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX'
    ```

    Alternatively, you could make use of the library to generate a random seed

    ```python
    from iota.crypto.types import Seed
    seed = Seed.random()
    ```

3. Connect to a node

    ```python
    api = Iota('https://nodes.devnet.iota.org:443', seed, testnet = True)
    ```

    :::info:
    The `testnet` argument sets the [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) to 9.
    :::

4. Define the security level that you want to use for your address

    ```python
    security_level = 2
    ```

5. Use the [`get_new_addresses()`](https://pyota.readthedocs.io/en/latest/api.html#get-new-addresses) method to generate an unspent address. If the connected node has an input transaction that withdraws from the address with the given index, the node knows that the address is spent, so the library returns the next unspent address.

    ```python
    receiver_address = api.get_new_addresses(index=0, security_level = security_level)['addresses'][0]

    print('Your address is: %s' % receiver_address )
    ```

    Starting from the given index, the connected node checks if any input transactions (pending or confirmed) in its view of the Tangle withdraw from the address.

    If an address with the given index is spent or has any transactions associated with it on the Tangle, the index is incremented until the node finds one that isn't used.

    Because of local snapshots, a node may have pruned these input transactions from its ledger. Therefore, we should also check the node's record of spent addresses.

    :::warning:
    This way of generating addresses replies on the node to return valid data about your addresses. To have more control over your addresses, we recommend keeping a record of spent ones in your own local database.
    :::

    In the console, you should see an address.

    ```
    Your address is: WKJDF9LVQCVKEIVHFAOMHISHXJSGXWBJFYEQPOQKSVGZZFLTUUPBACNQZTAKXR9TFVKBGYSNSPHRNKKHA
    ```

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Generate-an-address-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Send test IOTA tokens to your new address](../python/transfer-iota-tokens.md).
