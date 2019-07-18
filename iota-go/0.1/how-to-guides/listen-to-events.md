# Listen to events in an account

**An account object emits events when they happen. An example of an event is when you make or receive a payment. You can listen for these events and act on them.**

Accounts have two types of listeners: One that uses channels and one that uses callbacks. In this guide, we use callback listeners. If you're interested in using a channel listener, see our guide for [creating an event-listener plugin](../how-to-guides/create-plugin.md).

:::info:
See the list of all possible [callback events](https://github.com/iotaledger/iota.go/blob/master/account/event/listener/callback_listener.go).
:::

## Prerequisites

[Create an account](../how-to-guides/create-account.md).

## Monitor your account for incoming and outgoing payments

When your account's connected nodes receive a bundle that affects your balance, your account can trigger two types of event: One when the bundle is in a **pending** state, and one when it's in an **included** (confirmed) state.

Any incoming payments to your account are called deposits, and outgoing payments are called withdrawals.


1. Build and start an account that has an `EventMachine` object

    ```go
    node := "https://nodes.devnet.iota.org:443"
    seed := "PUETTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX"

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

    handleErr(account.Start())
    ```

2. Create a new `CallbackEventListener` object that listens for incoming and outgoing payments

    ```go
    lis := listener.NewCallbackEventListener(em)
    lis.RegSentTransfers(func(bun bundle.Bundle) {
		fmt.Println("Outgoing payment is pending")
		fmt.Println("Bundle :", bun)
	})
    lis.RegPromotions(func(promoted *promoter.PromotionReattachmentEvent) {
		fmt.Println("Promoting a pending bundle")
		fmt.Printf("%+v\n", *promoted)
	})
	lis.RegReattachments(func(promoted *promoter.PromotionReattachmentEvent) {
		fmt.Println("Reattaching a pending bundle")
		fmt.Printf("%+v\n", *promoted)
	})
    lis.RegConfirmedTransfers(func(bun bundle.Bundle) {
        fmt.Println("Outgoing payment confirmed")
        fmt.Println("Bundle :", bun)
    })
    lis.RegReceivedMessages(func(bun bundle.Bundle) {
        fmt.Println("Received a new message")
        fmt.Println("Bundle :", bun)
    })
    lis.RegReceivingDeposits(func(bun bundle.Bundle) {
        fmt.Println("Receiving a new payment")
        fmt.Println("Bundle :", bun)
    })
    lis.RegReceivedDeposits(func(bun bundle.Bundle) {
        fmt.Println("Received a new payment")
        fmt.Println("Bundle :", bun)
    })
    ```

:::success:Congratulations! :tada:
You're account can now emit events that you can listen to and act on.
:::

## Next steps

Now that you have an event listener, start [making payments to/from your account](../how-to-guides/create-and-manage-cda.md) to test it.
