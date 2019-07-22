# What is a seed?

**A seed is a unique password that gives you access to IOTA addresses. These addresses hold IOTA tokens and as such have a balance. When you have a seed, you can use IOTA to send or receive data and/or IOTA tokens on the network.**

[Addresses](root://iota-basics/0.1/concepts/addresses-and-signatures.md) are like  accounts that you can use to send and receive [transactions](../introduction/what-is-a-transaction.md) in a [bundle](../introduction/what-is-a-bundle.md).

The IOTA protocol uses cryptography to allow you to derive an almost unlimited amount of addresses from your seed. Addresses are public, and you can share them with anyone who wants to send you data and/or IOTA tokens.

Each address also has a corresponding private key. Private keys are secret, and you should never share your them with anyone. If you want to transfer IOTA tokens to someone else's address, you need to prove that you own the private key to the address that holds the tokens by signing the bundle with your private key and including it in the input transaction.

In our documentation, we use the following **example seed**:

PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX

You are responsible for creating and backing up your own seed. If you lose your seed, you can't recover it, and anyone who has your seed also has access to your IOTA tokens.

[Get started with your own seed](../tutorials/get-started.md)!
