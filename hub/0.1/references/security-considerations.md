# Security considerations

**Given that the role of Hub is to manage IOTA tokens, its security is crucial. You must take steps to secure Hub and use it correctly.**

## Deposit Addresses

For security purposes, deposit addresses may only be withdrawn from once. Therefore, Hub conducts periodic _sweeps_ to transfer funds from deposit addresses to a hot wallet.      

## Salt

To add an extra layer of security, improve the strength of your seed encryption algortithm by setting the [`salt`](../references/hub-configuration-options.md) configuration option. A salt removes the ability for an attacker to check the Hub's UUIDs against a pre-computed dictionary attack. 

## Signing server

To help prevent theft, Hub offers two servers:

* **Hub:** Does [key functions for managing deposits and withdrawals](../concepts/about-hub.md)
* **Signing server:** Stores security data, such as UUIDs and the salt

For maximum security, run the signing server in a remote location so that, if Hub is compromised, attackers can't steal IOTA tokens without access to the signing server.

## History logs

Hub generates a log of all actions that it performs. This log also contains transaction records, server restarts, and other detailed information. 
