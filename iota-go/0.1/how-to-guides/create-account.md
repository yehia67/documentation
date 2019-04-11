# Create an account

**An account is an object that makes it easier to send and receive transactions. Accounts store information such as addresses and pending bundle hashes in a database. This stored information allows you to interact with an IOTA network without worrying about reusing addresses or promoting and reattaching pending transactions.**

You can use accounts to do the following:

* Create and manage conditional deposit addresses (CDAs), which specify whether they're active and may used in withdrawals or deposits.
* Store the state of a seed in a database

## Withdrawls and deposits

Accounts are made up of many addresses that are in either an active or expired state. The state of an address determines whether it can be used in a withdrawal or a deposit.

The term _withdrawal_ is used to refer to the use of CDAs in [input transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md) where IOTA tokens are withdrawn from an address. A withdrawal can involve multiple expired CDAs, depending on total deposit amount and the balance of the CDAs.

The term _deposit_ is used to refer to the use of CDAs in outputs transactions where IOTA tokens are deposited into an address.

You can't withdraw tokens from an active address, but depositors can deposit tokens into them.

You can withdraw tokens from an expired addresses, but depositors can't deposit tokens into them.

## Seed state

|**Data**| **Function**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| To be able to create a new CDA that has never been used before|
|All active CDAs|To stop withdrawals from CDAs that may receive deposits|
|Pending transfers| To be able to monitor pending transactions and rebroadcast or reattach them if necessary|

You can create multiple accounts, and each one can manage the state of only one unique seed.

:::danger:Important
You must not create multiple accounts with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.

If you have never created an account before, you must create a new seed. Existing seeds can't be used in an account because their states are unknown.
:::

## Create a new account

1. Create an API object that connects to a node
   
    ```go
    // API object that connects to a node
    apiSettings := api.HTTPClientSettings{URI: "https://<node-url>:14265"}
    iotaAPI, err := api.ComposeAPI(apiSettings)
    handleErr(err)
    ```

2. Create a variable to hold a seed

    ```go
    seed := "ASFITGPSD9ASDFKRWE..."
    ```

    :::info:
    If you want to use a seed from a particular location, for example a hardware wallet, you can make a custom `SeedProvider` object, and pass it to the `WithSeed()` method in step 5.
    :::

3. Create a storage object to which the account can save the seed state. In this example, the seed state is stored in a BadgerDB database.

    ```go
    store, err = badger.NewBadgerStore("<data-dir>")
    handleErr(err)
    ```

    :::info:
    You can use the same storage object for multiple accounts at the same time.
    
    In storage, each account has a unique ID, which is created from a hash of an address with index 0 and security level 2.
    :::

4. Use the `timesrc` package to create a `timesource` object that will be used to calculate CDA timeouts and timeouts during API requests to the node. In this example, the time source is a Google NTP (network time protocol) server. For better performance, we recommend setting up your own NTP server.

     ```go
    // create an accurate time source (in this case Google's NTP server).
    timesource := timesrc.NewNTPTimeSource("time.google.com")
    ```

5. Create the account using both your custom settings and the `WithDefaultPlugins()` method. This method adds the default `transfer poller` and `promoter-reattacher` plugins to the account.

    ```go
    acc, err = builder.NewBuilder()
        // the underyling iota API to use.
        WithAPI(iotaAPI).
        // the underlying store to use.
        WithStore(badgerStore).
        // the seed of the account.
        WithSeed(seed).
        // the time source to use during input selection.
        WithTimeSource(timesource).
        // plugins which enhance the functionality of the account.
        WithDefaultPlugins().
        Build()
    handleErr(err)
    // make sure to call Start() so the account can initialize itself.
    handleErr(acc.Start())
    ```

    :::info:
    Every 30 seconds, the `transfer-poller` plugin will check whether withdrawals have been confirmed or whether any deposits to one of the account's CDAs are pending.
    
    Every 30 seconds, the `promoter-reattacher` plugin will promote or reattach pending withdrawal transactions.
    
    If you want to have more control over the behavior of the plugins, you can use `WithPlugin()` method.
    :::

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state your CDAs.
:::

## Import existing seed state

To import an existing seed state into an account, pass the storage object to the `WithStore()` method. The seed state must be in the correct format.