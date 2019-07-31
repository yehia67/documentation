# What is a bundle?

**A bundle is a group of one or more transactions that can contain data and/or instruct a node to transfer IOTA tokens from certain addresses to others. All transactions, even single ones, are always sent to a node as a bundle.**

The structure of a bundle consists of a head, a body, and a tail, where the tail is index 0 and the head is the last transaction in the bundle.

All transactions, starting from the tail, reference the one with the next index. For example, the tail transaction references transaction 1, which references transaction 2, and so on. These connections allow nodes to reconstruct bundles and validate their contents.

The fate of each transaction in a bundle depends on the rest. Either all transactions are valid or none of them are.

## Example of a bundle that transfers IOTA tokens

To transfer IOTA tokens, a bundle must contain at least one input and one output transaction. These bundles are called transfer bundles.

In this example, you want to send 100Mi to recipient A, and your balance is distributed among three addresses:

* **Address 0:** 20Mi
* **Address 1:** 30Mi
* **Address 2:** 55Mi

When you send 100Mi to recipient A, the following transactions are created and sent to a node as a transfer bundle:

* **Input transaction:** Withdraw 100Mi from my address and check the signature to verify that I own it
* **Output transaction:** Deposit 100Mi to the recipient's address
* **Output transaction:** Deposit the remaining 5Mi from address 2 into address 3

:::danger:
[You must not withdraw from an address more than once](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse). So, a transfer bundle may require an extra output transaction to deposit the remaining balance of a withdrawn address into a new address.
:::

[Learn more about bundles and transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md).

