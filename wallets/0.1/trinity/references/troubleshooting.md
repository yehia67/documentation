# Troubleshooting

**Use this reference guide to resolve issues related to Trinity.**

If you can't find the solution to your issue, reach out to the Trinity team on the `help` channel of the official IOTA [Discord](https://discord.iota.org/).

## Incorrect balance

If Trinity can't connect to a node, it may display an incorrect balance.

To fix this problem, Trinity keeps a list of your generated addresses so that you can re-synchronize it the next time Trinity connects to a node.

If you think your balance is wrong (and a [global snapshot](../how-to-guides/perform-a-snapshot-transition.md) hasn't occurred), you can synchronize Trinity by going to **Settings** > **Account** > **Account management** > **Tools** > **Sync account**.

![Manual update](../images/sync.jpg) 

## Pending transaction

If a transaction on the [Tangle](root://getting-started/0.1/network/the-tangle.md) is pending for a long time, make sure that the [Auto-promotion setting](../how-to-guides/auto-promote.md) is set to **Enabled**.

:::info:
Auto-promotion is available on mobile devices only when Trinity is in the foreground.
:::

## Unable to send a transaction

Trinity may stop you from sending a transaction for any of the following reasons:

- If you have funds on a [spent address]root://getting-started/0.1/clients/addresses.md#spent-addresses, Trinity stops you withdrawing from that address to protect your IOTA tokens.
- If the address you are sending to is spent, Trinity will stop you from sending to that address to protect your IOTA tokens. In this case, ask the recipient for a new address.
- If you are sending more than one transaction, you may need to wait for your first transaction to be confirmed before sending another one

## Lost access to a device

If you lose access to your device, no one can access your account without your password. To recover your account, install Trinity on another device and enter your account's seed that you backed up.

:::info:
For extra protection, create a new account and transfer your IOTA tokens to an address that belongs to that new account's seed.
:::
