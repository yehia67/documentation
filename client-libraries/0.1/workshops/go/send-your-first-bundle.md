# Send a "hello world" transaction in Go

**In this guide, you send a "hello world" message in a zero-value transaction. These transactions are useful for storing messages on the [Tangle](root://getting-started/0.1/network/the-tangle.md) without having to send any [IOTA tokens](root://getting-started/0.1/clients/token.md).**

## Packages

To complete this guide, you need to install the `api`, `bundle`, `converter`, and `trinary` packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/bundle
go get github.com/iotaledger/iota.go/converter
go get github.com/iotaledger/iota.go/trinary
```

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet) with the following network settings:

- **[Minimum weight magnitude](root://getting-started/0.1/network/minimum-weight-magnitude.md)**: 9

- **[Depth](root://getting-started/0.1/transactions/depth.md)**: 3

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="400px" width="100%" src="https://repl.it/@jake91/Send-a-hello-world-transaction-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code converts a "hello world" JSON message to trytes and sends it in a transaction to the address in the `address` variable. Because you aren't sending IOTA tokens, this address does not have to belong to anyone. To be valid, the address just needs to consist of 81 [trytes](root://getting-started/0.1/introduction/ternary.md). In fact, you can replace this address with another one to try it out.

:::info:
The [`AsciiToTrytes()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/converter_a_s_c_i_i_to_trytes.md) method supports only [basic ASCII characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters). As a result, diacritical marks such as accents and umlauts aren't supported and result in an `INVALID_ASCII_CHARS` error.
:::

Because this is a zero-value transaction, the seed is not used. However, the library expects a valid seed, so we use a random string of 81 characters. If you enter a seed that consists of less than 81 characters, the library will append 9s to the end of it to make 81 characters.

The [`PrepareTransfers()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_prepare_transfers.md) method creates a bundle from the transfers object. Then, the [`SendTrytes()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_send_trytes.md) method handles [tip selection](root://node-software/0.1/iri/concepts/tip-selection.md), [remote proof of work](root://getting-started/0.1/transactions/proof-of-work.md), and sending the bundle to the node.

:::success:Congratulations :tada:
That's it! You've just sent your first zero-value transaction. Your transaction is attached to the Tangle, and will be forwarded to the rest of the network.
:::

## Next steps

Make a note of the bundle hash so you can [read the transaction data on the Tangle](../go/read-transactions.md).
