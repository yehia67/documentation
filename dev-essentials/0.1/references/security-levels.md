# Security levels

**This table displays the possible security levels of a private key and address pair.**

When you create an address, you can specify a seed, an index, and a security level from which to derive it.

The security level dictates how secure the signature of a spent address is against brute force attacks. The greater the security level, the larger and more secure the signature. But, a greater security level also means that more computations are needed to sign a transaction, and the resulting signature is too large to fit in one transaction. As a result, low-powered devices may want to use security level 2, whereas a large-scale company may want to use security level 3.

:::info:
[Learn more about addresses and signatures](../concepts/addresses-and-signatures.md).
:::


| **Security Level** | **Private key/signature length in trytes** |
| :-------------- | :-------------------------- |
| 1              | 2,187 (not recommended)|
| 2              | 4,374 (used by Trinity)         |
| 3              | 6,561 (most secure)           |
