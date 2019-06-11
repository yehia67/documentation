# What is a transaction?

**A transaction is a single operation that can stand alone or be packaged with other transactions. Stand-alone transactions are those that contain no value, for example to send only data.**

Transactions can be one of the following types:

* **Input transaction:** Withdraws IOTA tokens from an address. This transaction must contain the signature that signs the bundle and proves ownership of the address. If the signature is too large, it's fragmented over zero-value output transactions in the bundle.
* **Output transaction:** Deposits IOTA tokens into a recipient's address or contains no value (a zero-value transaction).

[Learn more about bundles and transactions](root://iota-basics/0.1/concepts/bundles-and-transactions.md).
