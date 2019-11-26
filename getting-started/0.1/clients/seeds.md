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

## Utilities

To simplify the process of securing your seed, sending transactions, and managing your balance, you can use one of the [official open-source wallets](root://wallets/0.1/introduction/overview.md), which are maintained by the IOTA Foundation.

:::warning:
Be careful where you enter your seed. Some unofficial wallets may not be trustworthy
:::

## Related guides

[Create a seed](../tutorials/create-a-seed.md).




