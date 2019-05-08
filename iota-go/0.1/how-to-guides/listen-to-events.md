# Listen to events in an account

**When an account is started with an `EventMachine` object, that object emits events when they happen. An example of an event is when you send a bundle to a node. You can listen for these events and act on them by creating an instance of a listener.**

We have two types of listeners: One that uses channels and one that uses callbacks. In this guide, we use a callback listener. 

:::info:
If you're interesting in using a channel listener, see our guide for [creating an event-listener plugin](../how-to-guides/create-plugin.md).
:::

## Prerequisites

This guide assumes that you've followed our [Getting started guide](../README.md) and are using the [Go modules](https://github.com/golang/go/wiki/Modules) to manage dependencies in your project.

---

1. Build and start an account that has an `EventMachine` object

    ```go
    var node = "https://nodes.devnet.iota.org:443"
    var seed = "PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX"

    // API object that connects to a node
    apiSettings := api.HTTPClientSettings{URI: node}
    iotaAPI, err := api.ComposeAPI(apiSettings)
    handleErr(err)

    store, err := badger.NewBadgerStore("db")
    handleErr(err)

    em := event.NewEventMachine()

    // Create an accurate time source (in this case Google's NTP server).
    timesource := timesrc.NewNTPTimeSource("time.google.com")

    account, err = builder.NewBuilder().
        // Load the IOTA API to use
        WithAPI(iotaAPI).
        // Load the database onject to use
        WithStore(store).
        // Load the seed of the account
        WithSeed(seed).
        // Use the minimum weight magnitude for the Devnet
        WithMWM(9).
        // Load the time source to use during input selection
        WithTimeSource(timesource).
        // Load the EventMachine
        .WithEvents(em)
        // Load the default plugins that enhance the functionality of the account
        WithDefaultPlugins().
        Build()
    handleErr(err)
    ```

2. Create a new `CallbackEventListener` object that listens for the `RegAttachingToTangle` event

    ```go
    lis := listener.NewCallbackEventListener(em)
	lis.RegAttachingToTangle(func() {
        fmt.Println("Doing proof of work")
        // Do something here
    })
    ```

3. Create a new CDA

    ```go
    // Get the current time
    now, err := timesource.Time()
    handleErr(err)

    // Define the time after which the CDA expires
    // (in this case after 72 hours)
    now = now.Add(time.Duration(72) * time.Hour)

    // Allocate a new deposit address with conditions
    conditions := &deposit.Conditions{TimeoutAt: &now, MultiUse: true}

    cda, err := account.AllocateDepositAddress(conditions)
    handleErr(err)
    ```

4. Use the `Send()` method to send a data transaction to the CDA
    
    ```go
    bundle, err := account.Send(cda.AsTransfer())
    handleErr(err)

    fmt.Printf("Made deposit into %s in the bundle with the following tail transaction hash %s\n", cda.Address, bundle[0].Hash)
    ```

    You should see something like the following in the output:

    ```
    Doing proof of work
    Made deposit into DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKDTMAUX9ILA in the bundle with the following tail transaction hash WZEATTRJYENRALJTWPVGDQZHETIDJXPUROUM9BBPS9RJEELDMU9YNZFBSDGPQHZHMXBVCKITSMDEEQ999
    ```

:::success:Congratulations! :tada:
You're account is now emitting events that you can listen to and act on.
:::

## Next steps

[Create an event-listener plugin](../how-to-guides/create-plugin.md).
