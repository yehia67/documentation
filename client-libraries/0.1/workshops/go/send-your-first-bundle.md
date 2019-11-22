# Send a "hello world" transaction in Go

**In this guide, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## Packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/bundle
go get github.com/iotaledger/iota.go/converter
go get github.com/iotaledger/iota.go/trinary
```

## IOTA network

In this guide, we connect to a [node](root://getting-started/0.1/network/nodes.md) on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

1. Import the packages

    ```go
    package main

    import (
        . "github.com/iotaledger/iota.go/api"
        "github.com/iotaledger/iota.go/bundle"
        "github.com/iotaledger/iota.go/converter"
        "github.com/iotaledger/iota.go/trinary"
        "fmt"
    )
    ```
2. Connect to a node

    ```go
    var node = "https://nodes.devnet.thetangle.org"
    api, err := ComposeAPI(HTTPClientSettings{URI: node})
    must(err)
    ```

3. Define the depth and the minimum weight magnitude

    ```go
    const depth = 3;
    const minimumWeightMagnitude = 9;
    ```

4. Define an [address](root://getting-started/0.1/clients/addresses.md) to which you want to send a message

    ```go
    address := trinary.Trytes("ZLGVEQ9JUZZWCZXLWVNTHBDX9G9KZTJP9VEERIIFHY9SIQKYBVAHIMLHXPQVE9IXFDDXNHQINXJDRPFDXNYVAPLZAW")
    ```

    :::info:
    This address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md).
    :::

5. Define a seed

    ```go
    const seed = trinary.Trytes("JBN9ZRCOH9YRUGSWIQNZWAIFEZUBDUGTFPVRKXWPAUCEQQFS9NHPQLXCKZKRHVCCUZNF9CZZWKXRZVCWQ")
    ```

    :::info:
    Because this is a zero-value transaction, the seed is not used. However, the library expects a valid seed, so we use a random string of 81 characters. If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.
    :::

6. Create a JSON message that you want to send to the address and convert it to trytes

    ```go
    var data = "{'message' : 'Hello world'}"
    message, err := converter.ASCIIToTrytes(data)
    must(err)
    ```

    We encode the message in JSON to make it easier to read the message when we get the transaction from the Tangle in the next guide.

    :::info:
    The `AsciiToTrytes()` method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
    :::

7. Define a zero-value transaction that sends the message to the address

    ```go
    transfers := bundle.Transfers{
        {
            Address: address,
            Value: 0,
            Message: message,
        },
    }
    ```

8. To create a transfer bundle from your `transfers` object, pass it to the [`prepareTransfers()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_prepare_transfers.md) method. Then, pass the returned bundle trytes to the [`sendTrytes()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_send_trytes.md) method, which handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node

    ```go
    trytes, err := api.PrepareTransfers(seed, transfers, PrepareTransfersOptions{})
    must(err)
    
    myBundle, err := api.SendTrytes(trytes, depth, minimumWeightMagnitude)
    must(err)

    fmt.Println("Bundle hash: " + myBundle[0].Bundle)
    ```

    In the console, you should see the bundle hash of the transaction you just sent.

:::success:Congratulations :tada:
You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network. This transaction is now immutable, and as long as you have its bundle hash, you can read it on the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="400px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Make a note of the bundle hash so you can [read the transaction data on the Tangle](../go/read-transactions.md).
