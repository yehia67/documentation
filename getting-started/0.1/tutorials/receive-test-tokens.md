# Receive free test tokens

**The [Devnet](../references/iota-networks.md) is a copy of the IOTA Mainnet, which is where the IOTA tokens have value that can be traded on exchanges. The Devnet uses free tokens that don't have any monetary value. You can receive 1Ki (1000) of these free tokens to use for testing the network before transferring real value on the Mainnet.**

## Prerequisites

Before you complete this tutorial, you need [a new address](root://iota-basics/0.1/how-to-guides/create-an-address.md).

---

1. Go to [the Devnet faucet](https://faucet.devnet.iota.org/)

    <iframe src="https://faucet.devnet.iota.org/"></iframe>

2. Copy and paste your address into the input field

3. Prove that you're not a robot by clicking the 'I'm not a robot' box.

4. Click **Request**

    :::info:
    The Request button appears only if your address is valid. A valid address consists of 81 or 90 [trytes](root://iota-basics/0.1/concepts/trinary.md)(including a valid checksum).
    :::

5. Click **Check balance**

This link takes you to a Devnet Tangle explorer. This website connects to nodes on the Devnet and requests information from them about the bundle that just transferred free tokens to your address.

When the bundle is confirmed, 1Ki (1000) tokens will be added to the balance of your address.

:::info:
At the moment, you can't connect to Devnet nodes through Trinity. Instead, you can use the [client libraries](root://client-libraries/0.1/introduction/overview.md).
:::

## Next steps

[Transfer your free tokens to another address](https://github.com/iota-community/javascript-iota-workshop/blob/master/code/4-send-tokens.js) to test the process.
