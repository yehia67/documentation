# Read transactions on the Tangle in Go

**In this guide, you get [transactions](root://getting-started/0.1/transactions/transactions.md) from the Tangle by connecting to a [node](root://getting-started/0.1/network/nodes.md) and asking it to filter them by their bundle hash. Then, you decode the message in the transaction and print it to the console.**

## Packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/trinary
go get github.com/iotaledger/iota.go/transaction
```

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Import the packages

    ```go
    package main

    import (
        . "github.com/iotaledger/iota.go/api"
        "github.com/iotaledger/iota.go/trinary"
        "github.com/iotaledger/iota.go/transaction"
        "fmt"
    )
    ```
2. Connect to a node

    ```go
    var node = "https://nodes.devnet.thetangle.org"
    api, err := ComposeAPI(HTTPClientSettings{URI: node})
    must(err)
    ```

3. Define the bundle hash that you want to use to filter transactions 

    ```go
    const bundle = trinary.Trytes("MKCJ9DXTBOVZJVYZXHFPRXUULIRTRM9SEBLIHUHY9ZABRGYIBZSREEUENDKRVIYFKHBTTKWGHXZZJPZYA")
    ```

4. Use the [`FindTransactionObjects()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_find_transaction_objects.md) method to get transactions by the value of their `bundle` field. Then, use the [`ExtractJSON()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/transaction_extract_j_s_o_n.md) method to try to decode the JSON message in the `signatureMessageFragment` fields of the transactions and print it to the console

    ```go
    var query = FindTransactionsQuery{Bundles: trinary.Hashes{bundle}}
    transactions, err := api.FindTransactionObjects(query)
    must(err)

    jsonMsg, err := transaction.ExtractJSON(transactions)
    must(err)
    fmt.Println(jsonMsg)
    ```

    In the console, you should see your JSON message:

    ```json
    {"message": "Hello world"}
    ```

:::success:Congratulations :tada:
You've just found and read a transaction on the Tangle.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Read-a-transaction-on-the-Tangle?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

[Generate a new address](../go/generate-an-address.md).

