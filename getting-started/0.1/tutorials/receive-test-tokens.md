# Receive free test tokens

**When testing IOTA, you may want to try sending IOTA tokens from one address to another. On the Mainnet, these tokens have a monetary value that can be traded on exchanges. To send test transactions without risking anything, you can use the Devnet. The [Devnet](../references/iota-networks.md) is similar to the Mainnet, except the tokens are free. You can use the Devnet faucet website to receive 1Ki (1000) of free tokens.**

## Prerequisites

Before you complete this tutorial, you need to [a new address](root://iota-basics/0.1/how-to-guides/create-an-address.md).

:::danger:Important
If you own IOTA tokens on the Mainnet, we recommend creating a new test seed to use on the Devnet.
:::

## Send free test tokens to your address

1. Go to [the Devnet faucet](https://faucet.devnet.iota.org/)

2. Copy and paste your address into the input field

3. Prove that you're not a robot by clicking the 'I'm not a robot' box.

4. Click **Request**

    :::info:
    The Request button appears only if your address is valid. A valid address consists of 81 or 90 [trytes](root://iota-basics/0.1/concepts/trinary.md)(including a valid checksum).
    :::

5. Click **Check balance**

This link takes you to a Devnet Tangle explorer. This website connects to nodes on the Devnet and requests information from them about the bundle that just transferred free tokens to your address.

When the bundle is confirmed, 1Ki (1000) tokens will be added to the balance of your address.

:::info:These tokens are valid only on the Devnet
Other IOTA networks have neither received nor validated the bundle that transferred the tokens to your address. As a result, they haven't updated the balance of your address.
::: 

## Next steps

[Transfer your free tokens to another address](../tutorials/send-iota-tokens.md) to test the process.
