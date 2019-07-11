# Create an account

**An account is an object that makes it easier to send and receive transactions. Accounts store data such as addresses and pending bundle hashes in a local database. This data allows you to interact with an IOTA network without worrying about withdrawing from spent addresses or promoting and reattaching pending transactions.**

In accounts, all addresses are more than simple IOTA addresses. These addresses are called [conditional deposit addresses (CDAs)](../how-to-guides/create-and-manage-cda.md). A CDA defines not only the 81-tryte address, but also the conditions in which that address may be used in a [transfer bundle](root://getting-started/0.1/introduction/what-is-a-bundle.md).

## Seed state

The data that accounts store is called the seed state. Accounts use this data to keep a history of activity and to avoid making unnecessary API calls to nodes.

|**Data**| **Purpose**|
|:-----------------|:----------|
|The index of the most recent CDA| Create a new CDA|
|All active CDAs|Stop withdrawals from CDAs that may still receive deposits|
|Pending transfers| Monitor pending transactions to rebroadcast or reattach them if necessary|

## Prerequisites

This guide assumes that you've followed our [Getting started guide](../README.md) and are using the [Go modules](https://github.com/golang/go/wiki/Modules) to manage dependencies in your project.

## Create a new account

In this example, we connect to a [Devnet node](root://getting-started/0.1/references/iota-networks.md#devnet). The Devnet is similar to the Mainnet, except the tokens are free. Any transactions that you send to the Devnet do not exist on other networks such as the Mainnet.

1. Import the required packages

    ```go
    package main

    import (
	"github.com/iotaledger/iota.go/account/builder"
    "github.com/iotaledger/iota.go/account/store/badger"
    "github.com/iotaledger/iota.go/account/timesrc"
	"github.com/iotaledger/iota.go/api"
    )
    ```

2. Create two variables: One for your seed and another for the node that the account connects to

    ```go
    seed := "PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX"
    node := "https://nodes.devnet.iota.org:443"
    ```

    :::danger:Protect your seed
    You should never hard code a seed as we do here. Instead, we recommend that you read the seed from a protected file.

    If you want to use a seed from a particular location, for example a hardware wallet, create a custom `SeedProvider` object, and pass it to the `WithSeedProvider()` method.
    :::

    :::danger:Is this your first account?
    If you have never created an account before, but you have already used your seed to send transactions, the account module does not know the seed state. So, instead of using your existing seed, you must create a new seed to use with an account.
    :::

3. Create an API object that connects to a node
   
    ```go
    // API object that connects to a node
    apiSettings := api.HTTPClientSettings{URI: node}
    iotaAPI, err := api.ComposeAPI(apiSettings)
    handleErr(err)
    ```

4. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a BadgerDB database. Change `db` to the path where you want to save the database directory.

    ```go
    store, err := badger.NewBadgerStore("db")
    handleErr(err)
    ```

    :::danger:Important
    If the given `Store` object is closeable, you must close it, otherwise the database may become locked.

    For example, if you use BadgerDB, you may want to add the following line `defer store.Close()`.
    :::

    :::info:
    In storage, each account has a unique ID, which is the hash of the first address of the account at index 0 and security level 2.

    As a result, you can use the same storage object for multiple accounts at the same time.
    :::

5. Use the [`timesrc` package](https://github.com/iotaledger/iota.go/tree/master/account/timesrc) to create an object that returns an accurate time. In this example, the time source is a Google NTP (network time protocol) server.

     ```go
    // create an accurate time source (in this case Google's NTP server).
    timesource := timesrc.NewNTPTimeSource("time.google.com")
    ```

6. Build the account using both your custom settings and the `WithDefaultPlugins()` method adds the default `transfer poller` and `promoter-reattacher` plugins to the account.

    ```go
    account, err := builder.NewBuilder().
        // the IOTA API to use
        WithAPI(iotaAPI).
        // the database onject to use
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
    handleErr(err)
    ```

    :::danger:Create one account per seed
    You must not create multiple accounts with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.
    :::

    :::info:Default settings
    If you don't specify any custom settings, the account uses the [defaults](https://github.com/iotaledger/iota.go/blob/master/account/settings.go).
    :::

7. Start the account and the plugins

    ```go
    handleErr(account.Start())
    ```

    Every 30 seconds, the `transfer-poller` plugin will check whether withdrawals have been confirmed or whether any deposits are pending. Then, the `promoter-reattacher` plugin will promote or reattach any pending withdrawal transactions.

    :::danger:Important
    Make sure that the account can always shut down, otherwise you may see unexpected results.

    For example, you may want to add the following line `defer account.Shutdown()`.
    :::

    :::info:
    If you want to have more control over the behavior of the plugins, you can customize them in the `WithPlugin()` method.
    :::

8. Check that you're connected to a [synchronized node](root://node-software/0.1/iri/how-to-guides/run-an-iri-node-on-linux.md#check-that-the-iri-is-synchronized)

    ```go
    nodeInfo, err := iotaAPI.GetNodeInfo()
    handleErr(err)

    fmt.Println("latest milestone index:", nodeInfo.LatestMilestoneIndex)
    fmt.Println("latest milestone index:", nodeInfo.LatestSolidSubtangleMilestone)
    ```

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your seed.
:::

## Next steps

[Create a CDA so that you can send and receive transactions](../how-to-guides/create-and-manage-cda.md).
