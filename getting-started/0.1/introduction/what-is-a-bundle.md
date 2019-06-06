# What is a bundle?

**A bundle is a group of one or more transactions, which send data or instruct a node to transfer IOTA tokens from certain addresses to others. The fate of each transaction in a bundle depends on the rest. Either all transactions are valid or none of them are.**

The structure of a bundle consists of a head, a body, and a tail, where the tail is index 0 and the head is the last transaction in the bundle.

All transactions, starting from the tail, are connected by reference to the one with the next index. For example, the tail transaction is connected to transaction 1, which is connected to transaction 2, and so on. These connections allow nodes to reconstruct bundles and validate their contents.

To attach transactions to the Tangle, the head transaction is connected to the tails of two other bundles in the Tangle. (The tail and body transactions are connected to one of those tails as well.) These tail transactions are selected by nodes during [tip selection](root://the-tangle/0.1/concepts/tip-selection.md).

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

[Learn more about bundles](root://iota-basics/0.1/concepts/bundles-and-transactions.md).

