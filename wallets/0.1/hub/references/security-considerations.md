# Security considerations

**Given that the role of Hub is to manage IOTA tokens, its security is crucial. You must take steps to secure Hub and use it correctly.**

## Deposit addresses

For [security purposes](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse), deposit addresses may only be withdrawn from once.

Hub reduces this risk by transferring IOTA tokens from users' deposit addresses to a Hub owner's address at regular intervals. This process happens in a [sweep](../concepts/sweeps.md).

:::danger:Important
You shouldn't rely on sweeps to protect spent addresses. An attacker could steal the funds before Hub can do a sweep.

So, it's important that you inform users never to deposit tokens into a spent address.
:::

## Salt

To add an extra layer of security, improve the strength of your seed encryption algortithm by setting the [`salt`](../references/command-line-flags.md) flag. A salt removes the ability for an attacker to check the seed UUIDs in the database against a pre-computed dictionary attack. 

## Signing server

To help prevent theft, Hub offers two servers:

* **Hub:** Manages accounts and addresses
* **Signing server:** Stores the salt and signs bundles for sweeps.

For maximum security, run the signing server in a remote location so that, if Hub is compromised, attackers can't steal IOTA tokens without access to the signing server.

## History logs

Hub generates a log of all its actions. This log also contains transaction records, server restarts, and other detailed information. 
