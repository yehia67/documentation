# Generate a conditional deposit address in JavaScript

**In this guide, you generate a conditional deposit address, serialize it into a magnet link, and send test IOTA tokens to it.**

## IOTA packages

To complete this guide, you need to install the following packages:

--------------------
### npm
```bash
npm install @iota/account @iota/cda ntp-client
```
---
### Yarn
```bash
yarn add @iota/account @iota/cda ntp-client
```
--------------------

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. [Plan the conditions](../introduction/overview.md#advice-for-creating-cdas) that you would like your conditional deposit address to have

2. Create a new CDA. This one expires tomorrow.

    ```js
    account.generateCDA({
        timeoutAt: Date.now() + 24 * 60 * 60 * 1000
    }).then(cda => {

    })
    ```

3. Use the `AsMagnetLink()` method to serialize the CDA into a magnet link and print it to the console

    ```js
    const magnetLink = CDA.serializeCDAMagnet(cda);
    console.log(magnetLink);
    ```

    :::info:
    The last 9 trytes of a CDA are the checksum, which is a hash of the address and all of its conditions.
    :::

4. Copy and paste your address into the [Devnet faucet](https://faucet.devnet.iota.org), then wait for the tokens to be transferred to your address

    :::info:
    Make sure to remove the checksum before requesting IOTA tokens from the Devnet faucet.
    :::

    For example:

    ```bash
    DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKD
    ```

## Run the code

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

If you don't have a JavaScript development environment, or if this is your first time using the JavaScript client library, complete our [getting started guide](../../getting-started/js-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/JakeSCahill/iota-samples.git
cd iota-samples/js/account-module
npm i
node generate-cda/generate-cda.js
```

You should see the magnet link in the console.

```bash
iota://DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKDJUYJJCFHC/?timeout_at=1574514007&multi_use=0
```

You can copy this magnet link and send it to someone else so they can deposit IOTA tokens into it.

## Next steps

[Start making payments with your account](../js/make-payment.md).