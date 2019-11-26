# Send a "hello world" transaction in Python

**In this guide, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## Packages

To complete this guide, you need to install the following package (if you're using Go modules, you just need to reference this package):

```bash
pip install pyota
```

## IOTA network

In this guide, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

1. Import the packages

    ```python
    from iota import Iota
    from iota import ProposedTransaction
    from iota import Address
    from iota import Tag
    from iota import TryteString
    ```

2. Connect to a node

    ```python
    api = Iota('https://nodes.devnet.iota.org:443', testnet = True) 
    ```

    :::info:
    The `testnet` argument sets the [minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md) to 9.
    :::

3. Define an [address](root://getting-started/0.1/clients/addresses.md) to which you want to send a message

    ```python
    address = 'ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW'
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md).
    :::

4. Define a message that you want to send to the address and convert it to trytes

    ```python
    message = TryteString.from_unicode('Hello world')
    ```

    :::info:
    The `from_unicode()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

5. Define a zero-value transaction that sends the message to the address

    ```python
    tx = ProposedTransaction(
    address = Address(address),
    message = message,
    value = 0
    )
    ```

    :::info:
    The Python library makes a disctinction between proposed and regular transaction objects. Proposed transaction objects are those that you can edit because they are not yet attached to the Tangle. In contrast, regular transaction objects are immutable because they are already attached to the Tangle.
    :::

6. Pass your `ProposedTransaction` object to the [`send_transfer()`](https://github.com/iotaledger/iota.py/blob/master/docs/api.rst#send_transfer) method to do [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and to send the bundle to the node

    ```python
    result = api.send_transfer(transfers = [tx])

    print('Bundle: ')
    print(result['bundle'].hash)
    ```

    In the console, you should see the bundle hash of the transaction you just sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network. This transaction is now immutable, and as long as you have its bundle hash, you can read it on the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Make a note of the bundle hash so you can [read the transaction data on the Tangle](../python/read-transactions.md).
