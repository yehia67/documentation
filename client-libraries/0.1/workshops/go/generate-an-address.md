# Generate an address in Go

**In this guide, you learn how to generate a new address for a [seed](root://getting-started/0.1/clients/seeds.md) by either incrementing the index and/or using a different [security level](root://getting-started/0.1/clients/security-levels.md).**

## Packages

To complete this guide, you need to install the `api` and `trinary` packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/api
go get github.com/iotaledger/iota.go/trinary
```

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Generate-an-address-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code uses the [`GetNewAddress()`](https://github.com/iotaledger/iota.go/blob/master/.docs/iota.go/reference/api_get_new_address.md) method to generate an unspent address with security level 2.

If the connected node has an input transaction that withdraws from the address with the given index, the next unspent address is returned.

:::warning:
Because of [local snapshots](root://node-software/0.1/iri/concepts/local-snapshot.md), nodes don't always know if an address is spent. Therefore, we recommend using the [account module](../../account-module/introduction/overview.md) to keep track of spent addresses in your own local database.
:::

:::success:Congratulations :tada:
You've just generated a new unspent address. You can share this address with anyone who wants to send you a transaction.
:::

## Next steps

[Send test IOTA tokens to your new address](root://getting-started/0.1/tutorials/get-test-tokens.md).
