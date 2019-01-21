# What is a bundle?

**Each transaction is either an input or an output. To transfer IOTA tokens, you need both input and outputs transactions, which are grouped together in a bundle.**

When you want to send IOTA tokens to another address, you may need to create more than one [transaction](introduction/what-is-a-transaction.md), for example:

* Input transactions that debit IOTA tokens from your addresses
* Output transactions that contain the rest of the signature from the input transaction, or a positive value that credits IOTA tokens to a recipient's address

**Important:** A change transaction is needed for security reasons. In IOTA you must not spend from an address more than once. Therefore, any remaining balance in a spent address must be moved to a new address.

The fate of each transaction depends on the rest in the bundle. Either all transactions in the bundle are valid or none of them are.

## Example of a bundle

You want to send 100Mi to recipient A.

Your balance is distributed among three addresses:

* **Address 0:** 20Mi
* **Address 1:** 30Mi
* **Address 2:** 55Mi

To send 100Mi to recipient A, you must create a series of transactions and send them to an IRI node as a bundle so that the network can do the following:

* **Output transaction:** Debit 100Mi from my balance and check my signature
* **Input transaction:**  Credit the recipient's address with 100Mi
* **Change transaction:** Transfer the remaining 5Mi from address 2 to my new address 3

[Learn more about bundles and transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md).

