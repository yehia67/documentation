# Check the balance of an address in Go

**The balance of [addresses](root://getting-started/0.1/clients/addresses.md) is kept up to date by all [nodes](root://getting-started/0.1/network/nodes.md) in an IOTA network. To request the balance from a node, you must send it the address whose balance you want to check.**

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

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Check-the-balance-of-an-address-Go?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code uses the [`getBalances()`](https://github.com/iotaledger/iota.js/blob/next/api_reference.md#module_core.getBalances) method to request the balance of the given address from a node on the Devnet.

:::success:Congratulations :tada:
You've just checked the balance of an address.
:::

## Next steps

[Transfer IOTA tokens from one address to another](../go/transfer-iota-tokens.md).
