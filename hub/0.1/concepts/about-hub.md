# About Hub

**Hub has many functions, such as seed generation, that facilitate the integration of IOTA into existing applications.**

Each of these functions is exposed through the [gRPC](../references/api-reference.md) framework.

## Seed generation

Hub can securely create and store a seed for each user. Seeds must be securely created and stored because they're used to create the private keys that are used to sign transactions.
 
## Deposit address generation

Deposit addresses are created from a user's seed. Hub keeps track of the address indices to keep track of which ones have been withdrawn from.
 
## Deposit address management

IOTA uses the Winternitz one-time signature scheme to create signatures. As a result, addresses can be withdrawn from only once because each signature exposes around half of the private key.

To prevent address reuse, Hub ensures that each user is assigned a unique address for every deposit. To do so, Hub tracks whether address indices were already withdrawn from and increments the index to create a new deposit address.

## Transaction monitoring
 
Hub monitors transactions until they're confirmed.

IOTA works differently than a traditional ledger. Traditional ledgers are generally managed by a trusted third party, such as a bank or credit card company. IOTA is trustless, so no third parties are necessary. Nodes reach a consensus on valid transactions and consider those transactions confirmed.

:::info:Want to learn more about consensus?
Read about [the Tangle](root://the-tangle/0.1/introduction/overview.md).
:::

## Withdrawal management

To prevent address reuse, Hub makes sure that no deposit transactions are pending, and that all previous desposit transactions are confirmed before sending a withdrawal transaction. Hub also monitors withdrawal transactions and notifies users when they've been confirmed.
 
## Address sweeps
 
Sweeps are crucial to securely credit users after moving funds from their deposit addresses. Suppose that a user deposits to an already swept address, an adversary might try to forge a signature and move the funds out of this address; therefore, funds should be swept to your hot wallet periodically.
 
Crediting should only be performed after confirming sweep transactions to make sure funds are in your possession. You should absolutely inform the user of the risk of total loss should he send to a deposit address provided by the exchange more than once.

### How sweeps work

To perform a sweep, first, Hub finds deposit address with a non-zero balance. Next, Hub checks whether those deposit addresses are in any pending sweeps. To speed up the process, Hub keeps track of the indicies of deposit addresses.
 
One seed many contain many deposit addresses that have already been processed. A sweep will move balances from selected deposit addresses to an unspent exchange-owned address.
 
Hub checks the inclusion states of the sweep transactions to determine which transactions have been confirmed and accepted by the Tangle network. Finally, Hub credits the user.

:::info:Want to learn more about inclusion states?
Find out how to [check if a transaction is confirmed](root://iota-basics/0.1/how-to-guides/check-transaction-confirmation.md).
:::
 
Hub checks whether deposit addresses were used in unresolved sweeps. If any addresses have been previously swept, Hub does not sweep them again, unless the previous sweep transfers have been confirmed.
 
After each successful deposit, Hub sends the tokens to hot wallets. After storing the tokens, Hub generates a new address available for the user to make a new deposit.  
 
Hub confirms sweep transactions were accepted by Tangle. To ensure secure deposit of funds to exchange addresses, check the inclusion states of the sweep transactions. Finally, Hub credits the user.