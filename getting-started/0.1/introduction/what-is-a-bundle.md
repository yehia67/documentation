# What is a bundle?

**A bundle is a group of one or more transactions that can contain data and/or instruct a node to transfer IOTA tokens from certain addresses to others. All transactions, even single ones, are always sent to a node as a bundle.**

The structure of a bundle consists of a head, a body, and a tail, where the tail is index 0 and the head is the last transaction in the bundle.

All transactions, starting from the tail, reference the one with the next index. For example, the tail transaction references transaction 1, which references transaction 2, and so on. These connections allow nodes to reconstruct bundles and validate their contents.

The fate of each transaction in a bundle depends on the rest. Either all transactions are valid or none of them are.

## Example of a bundle that transfers IOTA tokens

To transfer IOTA tokens, a bundle must contain at least one input and one output transaction. These bundles are called transfer bundles.

In this example, you want to send 100 Mi to recipient A, and your balance is distributed among three addresses:

* **Address 0:** 20 Mi
* **Address 1:** 30 Mi
* **Address 2:** 55 Mi

When you send 100 Mi to recipient A, the following transactions are created and sent to a node as a transfer bundle:

* **Input transaction:** Withdraw 100 Mi from my address and check the signature to verify that I own it
* **Output transaction:** Deposit 100 Mi to the recipient's address
* **Output transaction:** Deposit the remaining 5 Mi from address 2 into address 3

:::danger:Always withdraw the total balance of an address
IOTA uses the [Winternitz one-time signature scheme](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse) to sign bundles. This signature scheme means that addresses can be safely withdrawn from only once, so you must always withdraw the total balance from an address. If you want to transfer only some of that balance to another person, you can transfer the remaining balance to one of your own unspent addresses.
:::

[Learn more about bundles and transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md).

