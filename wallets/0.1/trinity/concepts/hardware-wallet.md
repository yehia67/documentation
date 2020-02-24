# Hardware wallet

**A hardware wallet, sometimes referred to as cold storage, is a physical electronic device that stores your seed and signs bundles for you offline. If you [create a Trinity account with a hardware wallet](https://trinity.iota.org/hardware), you can't send transactions without it.**

:::danger:
On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. Please check our advice for [protecting your Trinity account](../how-to-guides/protect-trinity-account.md).
:::

## How seeds are created and stored

Seeds are created using a sequence of randomly generated words. These words are the key to your device. When you set up a hardware wallet, it will give you instructions to write down and never lose your randomly generated words.

After a seed has been created, it will never leave the device, even when you connect it to your computer. If you ever lose a hardware wallet, you can recreate your seed by entering your randomly generated words in another hardware wallet.

## How bundles are signed

Bundles are signed on the device, so it's impossible for an attacker to steal your IOTA tokens without it.

## Supported hardware wallets

At the moment, Trinity supports only the [Ledger Nano S](https://www.ledger.com/products/ledger-nano-s) and the [Ledger Blue](https://www.ledger.com/products/ledger-blue).

## Limitations

If you use a Ledger Nano S with Trinity, you can't withdraw from more than two addresses in the same transaction.

To check the balances of your addresses, go to **Account management** > **View addresses**.

### Example scenario

- **Address 0:** 200 Mi
- **Address 1:** 400 Mi
- **Address 3:** 50 Mi

You try to send 650 Mi from Trinity, using a Ledger Nano S. This transaction would require a bundle that withdraws from three addresses, so it won't be valid and won't send.

For more information about this limitation, see this [community blog post](https://medium.com/@hbmy289/how-to-access-iota-funds-spread-over-too-many-inputs-on-ledger-nano-s-74708548fa6e).


