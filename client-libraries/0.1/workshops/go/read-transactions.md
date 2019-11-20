# Read transactions on the Tangle in Go

**In this guide, you get [transactions](root://getting-started/0.1/transactions/transactions.md) from the Tangle by connecting to a node and asking it to filter them by their bundle hash. Then, you decode the message in the transaction and print it to the console.**

## Packages

To complete this guide, you need to install the `api`, `trinary`, and `transaction` packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/trinary
go get github.com/iotaledger/iota.go/transaction
```

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-on-the-Tangle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code uses the [`FindTransactionObjects()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.findTransactionObjects) method to get transactions by the value of their `bundle` field.

Then, we use the [`ExtractJSON()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/transaction_extract_j_s_o_n.md) method to try to decode the JSON message in the `signatureMessageFragment` field and print it to the console.

:::success:Congratulations :tada:
You've just filtered a transaction by its bundle hash and read its message.
:::

## Next steps

[Generate a new address](../go/generate-an-address.md).

