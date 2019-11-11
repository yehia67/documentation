# Seeds

**A seed is a unique password that gives you the ability to prove your ownership of either messages and/or any [IOTA tokens](../clients/token.md) that are held on your [addresses](../clients/addresses.md).**

## Seed format

A seed is a string of 81 [trytes](../introduction/ternary.md) (or 90 trytes with a [checksum](../clients/checksums.md)).

```
PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX
```

## Maximum number of seeds

The total number of possible seeds is almost unlimited (8.7 x 10<sup>115</sup>). As a result, the chances of two seeds being the same is very unlikely.

## How seeds are generated

You are responsible for creating your own seed. If you lose your seed, you can't recover it.

Anyone who has access to a seed is able to sign transactions and therefore has access to any IOTA tokens that belong to the seed's addresses.

## Advice for storing seeds

You can store your seed in many ways, such as on paper or in a file. But, no storage option is 100% safe, so you should consider the risks and mitigate them as much as possible.

### What should you do?

This list offers you some advice for storing your seed:

- Make sure that the physical location in which you store your seed is protected from fires, floods, theft, and other physical risks.

- Keep a copy of your seed in a bank vault or safe deposit box

- Use a password manager or virtual vault that is protected by a passphrase and/or a key file

- Use an encrypted disk or NAS to store your seed or password database

### What should you not do?

This list offers you some ways to avoid losing your seed:

- Do not print your seed with a public printer

- Do not leave your seed on unprotected devices such as USB drives or external hard disks

- Do not store your seed on a public cloud service

- Do not share your seed with anyone

## Utilities

To simplify the process of securing your seed, sending transactions, and managing your balance, you can use one of the [official open-source wallets](root://wallets/0.1/introduction/overview.md), which are maintained by the IOTA Foundation.

:::warning:
Be careful where you enter your seed. Some unofficial wallets may not be trustworthy
:::




