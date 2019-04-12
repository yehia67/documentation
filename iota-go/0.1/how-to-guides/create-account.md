# Create an account

**An account is an object that makes it easier to send and receive transactions. Accounts store information such as addresses and pending bundle hashes in a local database. This stored information allows you to interact with an IOTA network without worrying about reusing addresses or promoting and reattaching pending transactions.**

Accounts remove the need to call nodes for information like address state or balances. They are also resilient to snapshots. The libraries now:

Store the account information and settings locally. You can also export and import existing accounts.
Store pending transactions locally.
Handle the promotion and reattachment of pending transactions via a predefined strategy. You can also define your own strategy. The reattachment and promotion functionality is supported via a plug-in and you can develop your own plug-ins that extend the library functionality.
Have a notion of which addresses from your account have been deposited to and spent from, and which should be used for input selection. So whenever you request a deposit, you are doing so in a safe manner.
Provide event handling functionality. You can now listen out for different events, for example every new deposit, or every confirmed, outgoing transaction.
Introduce a concept of Conditional Deposit Addresses (CDAs), which are now the primary means of communicating with depositors. This is a very important feature which we will expand on in the next post. 

You can use accounts to do the following:

* Create and manage conditional deposit addresses (CDAs), which specify whether they're active and may used in withdrawals or deposits.
* Store the state of a seed in a database

## Withdrawals and deposits

Accounts are made up of many addresses that are in either an active or expired state. The state of an address determines whether it can be used in a withdrawal or a deposit.

The term _withdrawal_ refers to the use of CDAs in [input transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md) where IOTA tokens are withdrawn from an address. A withdrawal can involve multiple expired CDAs, depending on the total deposit amount.

The term _deposit_ refers to the use of CDAs in outputs transactions where IOTA tokens are deposited into an address.

You can't withdraw tokens from an active address, but depositors can deposit tokens into them.

You can withdraw tokens from an expired addresses, but depositors can't deposit tokens into them.

## Seed state

|**Data**| **Purpose**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| Create a new CDA that has never been used before|
|All active CDAs|Prevent withdrawals from CDAs that may still receive deposits|
|Pending transfers| Monitor pending transactions and promote or reattach them if necessary|

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

4. Use the `timesrc` package to create a `timesource` object that will calculate CDA timeouts and timeouts during API requests to the node. In this example, the time source is a Google NTP (network time protocol) server. For better performance, we recommend setting up your own NTP server.

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
    
    If you want to have more control over the behavior of the plugins, you can customize them in the `WithPlugin()` method.
    :::

:::info:
You can create multiple accounts, and each one can manage the state of only one unique seed.
:::

:::danger:Important
You must not create multiple accounts with the same seed. Doing so could lead to a race condition where the seed state would be overwritten.

If you have never created an account before, you must create a new seed. Existing seeds can't be used in an account because their states are unknown.
:::

:::success:Congratulations! :tada:
You've created an account that will automatically promote and reattach transactions as well as manage the state of your CDAs.
:::

## Import existing seed state

To import an existing seed state into an account, pass the storage object to the `WithStore()` method. The seed state must be in the correct format.