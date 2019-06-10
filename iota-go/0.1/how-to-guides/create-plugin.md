# Create a plugin

**Plugins extend the functionality of an account. All plugins run in their own goroutine and start and shut down together with an account.**

## Prerequisites

[Create a new account](../how-to-guides/create-account.md).

This guide assumes that you've followed our [Getting started guide](../README.md) and are using the [Go modules](https://github.com/golang/go/wiki/Modules) to manage dependencies in your project.

## Create a plugin that prints events to the screen

To explain how to create a plugin, this guide helps you to create one that prints events to the screen as they happen.

:::info:
See the list of all possible [channel events](https://github.com/iotaledger/iota.go/blob/master/account/event/listener/channel_listener.go).
:::

1. Create a new file called `event_logger.go`

2. Import the required packages

    ```go
    package main

    import (
        "fmt"

        "github.com/iotaledger/iota.go/account"
        "github.com/iotaledger/iota.go/account/event"
        "github.com/iotaledger/iota.go/account/event/listener"
    )
    ```

3. Create a function that takes an `EventMachine` object as an argument and returns an `account.Plugin` object

    ```go
    // NewEventLoggerPlugin ...
    func NewEventLoggerPlugin(em event.EventMachine) account.Plugin {
        return &logplugin{em: em, exit: make(chan struct{})}
    }

    type logplugin struct {
        em   event.EventMachine
        acc  account.Account
        exit chan struct{}
    }
    ```

4. Create a `Name()` function that returns the name of the plugin

    ```go
    func (l *logplugin) Name() string {
	return "eventLogger"
    }  
    ```

    :::info:
    The `account` object uses this name in error messages to help you debug.
    :::

5. Create a `Start()` function that will be called when the account starts. When an account is started, all plugins take the `account` object as an argument.

    ```go
    func (l *logplugin) Start(acc account.Account) error {
	l.acc = acc
	l.log()
	return nil
    }
    ```

6. Create a `Shutdown()` function that shuts down the plugin at the same time as the account

    ```go
    func (l *logplugin) Shutdown() error {
        l.exit <- struct{}{}
        return nil
    }
    ```

7. Create the `log()` function that will print all events to the screen when they happen

    ```go
    func (l *logplugin) log() {
	lis := listener.NewChannelEventListener(l.em).All()

	go func() {
		defer lis.Close()
	    exit:
            for {
                select {
                case ev := <-lis.Promoted:
                    fmt.Printf("Promoted %s with %s\n", ev.BundleHash[:10], ev.PromotionTailTxHash)
                case ev := <-lis.Reattached:
                    fmt.Printf("Reattached %s with %s\n", ev.BundleHash[:10], ev.ReattachmentTailTxHash)
                case ev := <-lis.SentTransfer:
                    tail := ev[0]
                    fmt.Printf("Sent %s with tail %s\n", tail.Bundle[:10], tail.Hash)
                case ev := <-lis.TransferConfirmed:
                    tail := ev[0]
                    fmt.Printf("Transfer confirmed %s with tail %s\n", tail.Bundle[:10], tail.Hash)
                case ev := <-lis.ReceivingDeposit:
                    tail := ev[0]
                    fmt.Printf("Receiving deposit %s with tail %s\n", tail.Bundle[:10], tail.Hash)
                case ev := <-lis.ReceivedDeposit:
                    tail := ev[0]
                    fmt.Printf("Received deposit %s with tail %s\n", tail.Bundle[:10], tail.Hash)
                case ev := <-lis.ReceivedMessage:
                    tail := ev[0]
                    fmt.Printf("Received msg %s with tail %s\n", tail.Bundle[:10], tail.Hash)
                case balanceCheck := <-lis.ExecutingInputSelection:
                    fmt.Printf("Doing input selection (balance check: %v) \n", balanceCheck)
                case <-lis.PreparingTransfers:
                    fmt.Printf("Preparing transfers\n")
                case <-lis.GettingTransactionsToApprove:
                    fmt.Printf("Getting transactions to approve\n")
                case <-lis.AttachingToTangle:
                    fmt.Printf("Doing proof of work\n")
                case err := <-lis.InternalError:
                    fmt.Printf("Received internal error: %s\n", err.Error())
                case <-l.exit:
                    break exit
                }
            }
        }()
    }
    ```

8. Save the file

9. Create a new file called `myAccount.go`

10. Build your account with the `NewEventLoggerPlugin()` function

    ```go
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
        // Load your custom plugin
		Build( NewEventLoggerPlugin(em) )
    handleErr(err)
    ```

:::success:Congratulations! :tada:
You've just created your first plugin.

Now, when your account starts, you don't have to do anything to listen to events. Your plugin will print all events to the console as they happen.
:::
