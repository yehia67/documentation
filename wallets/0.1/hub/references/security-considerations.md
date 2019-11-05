# Security considerations

**Given that the role of Hub is to manage IOTA tokens, its security is crucial. You must take steps to secure Hub and use it correctly.**

## Salt

To add an extra layer of security, improve the strength of your seed encryption algortithm by setting the [`salt`](../references/command-line-options.md) flag. A salt removes the ability for an attacker to check the seed UUIDs in the database against a pre-computed dictionary attack. 

## Signing server

To help prevent theft, Hub offers two servers:

- **Hub:** Manages accounts and addresses
- **Signing server:** Stores the salt and signs bundles for sweeps.

For maximum security, run the signing server in a remote location so that, if Hub is compromised, attackers can't steal IOTA tokens without access to the signing server.

## History logs

Hub generates a log of all its actions. This log also contains transaction records, server restarts, and other detailed information. 
