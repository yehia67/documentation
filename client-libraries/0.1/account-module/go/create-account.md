# Create an account in Go

**In this guide, you create an account to keep track of your seed state in a local database.**

## Packages

To complete this guide, you need to install the `api`, `badger`, `builder`, `timesrc`, and `trinary` packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/badger
go get github.com/iotaledger/iota.go/builder
go get github.com/iotaledger/iota.go/timesrc
go get github.com/iotaledger/iota.go/trinary
```

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. [Create a new seed](root://getting-started/0.1/tutorials/create-a-seed.md) to start with a new seed state

2. Import the required packages

    ```go
    package main

    import (
        "github.com/iotaledger/iota.go/api"
        "github.com/iotaledger/iota.go/account/builder"
        "github.com/iotaledger/iota.go/account/store/badger"
        "github.com/iotaledger/iota.go/account/timesrc"
        "github.com/iotaledger/iota.go/trinary"
        "fmt"
    )
    ```

3. Create two variables: One for your seed and another for the node that the account connects to

    ```go
    var seed = trinary.Trytes("PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX")
    node := "https://nodes.devnet.iota.org:443"
    ```

    :::danger:Protect your seed
    You should never hard code a seed as we do here. Instead, we recommend that you read the seed from a protected file.

    If you want to use a seed from a particular location, for example a hardware wallet, create a custom `SeedProvider` object, and pass it to the `WithSeedProvider()` method.
    :::

3. Create an API object that connects to a node
   
    ```go
    apiSettings := api.HTTPClientSettings{URI: node}
    iotaAPI, err := api.ComposeAPI(apiSettings)
    must(err)
    ```

4. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a BadgerDB database. Change `db` to the path where you want to save the database directory.

    ```go
    store, err := badger.NewBadgerStore("db")
    must(err)

    defer store.Close()
    ```

    :::danger:
    If the given `Store` object is closeable, you must close it, otherwise the database may become locked.
    :::

    :::info:
    In the database, each account has a unique ID, which is the hash of the account's address with index 0 and security level 2.

    As a result, you can use the same storage object for more than one account at the same time.
    :::

5. Create an object that returns an accurate time to use for the `timeoutAt` condition of your CDAs. In this example, the time source is a Google NTP (network time protocol) server.

     ```go
    timesource := timesrc.NewNTPTimeSource("time.google.com")
    ```

6. Build the account with both your custom settings and the `WithDefaultPlugins()` method to add the default `transfer poller` and `promoter-reattacher` plugins to the account.

    ```go
    account, err := builder.NewBuilder().
        // the IOTA API to use
        WithAPI(iotaAPI).
        // the database object to use
        WithStore(store).
        // the seed of the account
        WithSeed(seed).
        // the minimum weight magnitude for the Devnet
        WithMWM(9).
        // the time source to use during input selection
        WithTimeSource(timesource).
        // load the default plugins that enhance the functionality of the account
        WithDefaultPlugins().
        Build()
    must(err)
    ```

    :::danger:Create one account instance per seed
    If you create more than one instance of an account with the same seed, your seed state could be overwritten during a race condition.
    :::

    :::info:Default settings
    If you don't specify any custom settings, the account uses the [defaults](https://github.com/iotaledger/iota.go/blob/master/account/settings.go).
    :::

7. Start the account and the plugins

    ```go
    must(account.Start())

    defer account.Shutdown()
    ```

    Every 30 seconds, the `transfer-poller` plugin checks whether withdrawals have been confirmed or whether any deposits are pending. Then, the `promoter-reattacher` plugin promotes or reattaches any pending withdrawal transactions.

    :::info:
    If you want to have more control over the behavior of the plugins, you can customize them in the `WithPlugin()` method.
    :::

8. Check your account's balance

    ```go
    balance, err := account.AvailableBalance()
    must(err)
    fmt.Println("Total available balance: ")
    fmt.Println(balance)
    ```

    You should see your

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your seed.
:::

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Create-account-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

After certain events happen in your account, it emits them, and allows you to listen for them. For example, you may want to monitor your account for new payments. To do so, you need to [create an event listener](../how-to-guides/listen-to-events.md).

Or, you can [create a plugin](../how-to-guides/create-plugin.md) that also emits events.
