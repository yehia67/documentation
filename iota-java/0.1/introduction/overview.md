# Account module overview

**An account is an object that makes it easier to send and receive transactions. Accounts store data such as addresses and pending bundle hashes in a local database. This data allows you to interact with an IOTA network without worrying about withdrawing from spent addresses or promoting and reattaching pending transactions.**

Accounts abstract the complexity of the IOTA protocol and allow you to focus on making payments. In accounts, we have two types of payment:

* **Incoming payment:** A bundle that deposits IOTA tokens into an account
* **Outgoing payment:** A bundle that withdraws IOTA tokens from an account

## Conditional deposit addresses

In the IOTA protocol, IOTA tokens must be sent to [addresses](root://dev-essentials/0.1/concepts/addresses-and-signatures.md), which are derived from your [seed](root://getting-started/0.1/introduction/what-is-a-seed.md). These addresses may be withdrawn from only once. As a result, it's important that no one deposits IOTA tokens into a withdrawn address. But, it's difficult to know when or if someone is going to deposit IOTA tokens into your address before you withdraw from it.

In accounts, addresses come with extra features that allow you to specify the conditions in which they may be used in payments. These addresses are called conditional deposit addresses (CDA).

Accounts use CDAs to help reduce the [risk of withdrawing from spent addresses](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse). When you request IOTA tokens from someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

### Conditions of a CDA

When you create a CDA, you specify the following condition, which defines whether it's active or expired. You can deposit IOTA tokens into an active address. But, you can't withdraw tokens from an active address. You can withdraw tokens from an expired address. But, you can't deposit tokens into an expired address.

* **timeoutAt (required):** The time at which the address expires

You can also specify one of the following recommended fields:

* **multiUse (recommended):** A boolean that specifies if the address may receive more than one deposit.
* **expectedAmount (recommended):** The amount of IOTA tokens that the address is expected to receive. When the address contains this amount, it's considered expired. We recommend specifying this condition.

:::info:
You can't specify the `expected_amount` and `multi_use` fields in the same CDA. Please refer to the [FAQ](../references/cda-advice.md) for more advice about CDA conditions.
:::

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeoutAt` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeoutAt` and `multiUse` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. See the [CDA FAQ](../references/cda-advice.md) on when to use addresses with the `multiUse` field set. |
|`timeoutAt` and `expectedAmount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount. See the [CDA FAQ](../references/cda-advice.md) on when to use addresses with the `multi_use` field set.|

:::warning:Warning
If a CDA was created with only the `timeoutAt` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. 

To avoid withdrawing from a spent address, we recommend creating CDAs with either the `multiUse` field or with the `expectedAmount` field whenever possible.
:::

## Seed state

To keep track of payments, accounts store the state of all CDAs in a local database. This state is called the seed state.

Accounts use this data to keep a history of activity and to avoid making unnecessary API calls to nodes.

|**Data**| **Purpose**|
|:-----------------|:----------|
|The last key index that was used to create a CDA| Create a new CDA that has never been used before|
|All active CDAs|Stop withdrawals from CDAs that may receive deposits|
|Pending transfers| Monitor pending transactions and rebroadcast or reattach them if necessary|