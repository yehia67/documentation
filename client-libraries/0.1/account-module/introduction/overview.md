# Account module overview

**The account module is a stateful package that allows you to make payments without worrying about withdrawing from spent addresses or promoting and reattaching pending transactions.**

## How the account module works

The account module allows you to create an account object, which manages your seed's spent addresses and keeps track of pending bundle hashes in a local database. Each object can manage only one seed.

|**Data**| **Purpose**|
|:-----------------|:----------|
|The last key index that was used to create a addresses| Create a new address that has never been used before|
|All active address|Stop withdrawals from address that may receive deposits|
|Pending transfers| Monitor pending transactions and rebroadcast or reattach them if necessary|

## Conditional deposit addresses

One of the many benefits of using accounts is that you can define conditions in which your addresses are active or expired. These conditions help senders to decide whether it's safe to send tokens to an address. For this reason, addresses in accounts are called _conditional deposit addresses_ (CDA).

Accounts use CDAs to help reduce the risk of withdrawing from [spent addresses](root://getting-started/0.1/clients/addresses.md#spent-addresses). When you request IOTA tokens from someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

### Conditions of a CDA

When you create a CDA, you must specify the `timeoutAt` field to define whether it's active or expired.

You can also specify one of the following recommended fields:

- **multiUse (recommended):** A boolean that specifies if the address may receive more than one deposit.
- **expectedAmount (recommended):** The amount of IOTA tokens that the address is expected to receive. When the address contains this amount, it's considered expired. We recommend specifying this condition.

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeoutAt` |The CDA can be used in withdrawals as long as it contains IOTA tokens|
|`timeoutAt` and `multiUse` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. See the [CDA FAQ](../references/cda-advice.md) on when to use addresses with the `multiUse` field set. |
|`timeoutAt` and `expectedAmount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount. See the [CDA FAQ](../references/cda-advice.md) on when to use addresses with the `multi_use` field set.|

:::warning:Warning
If a CDA was created with only the `timeoutAt` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. Therefore, to avoid withdrawing from a spent address, we recommend creating CDAs with either the `multiUse` field or with the `expectedAmount` field whenever possible.
:::

### Advice for creating CDAs

When creating a CDA, you should consider the following questions.

#### How long should you specify in a CDA's timeout?

The value that you specify in the `timeout_at` field depends on how fast you expect the depositor to make a deposit. If you are in direct contact with the depositor and you are both waiting to settle the transfer, you can specify a shorter timeout.

:::danger:Important
If a CDA was created with only the `timeout_at` field, it can be used in outgoing payments as soon as it has a non-zero balance even if it hasn't expired. So, to avoid withdrawing from a spent address, we recommend creating CDAs with either the `multi_use` field or with the `expected_amount` field whenever possible.
:::

#### When should you create a multi-use CDA?

We recommend that you use multi-use CDAs when the following conditions are true:

- You expect multiple payments of arbitrary value from multiple depositors.
- You fully control the creation and sharing of the CDA, for example on your website.
- When you cannot share a CDA with the `expected_amount` field value set with each depositor individually.

Or when communicating with depositors who reliably request a new CDA when the `timeout_at` field value is running out.

One scenario for `multi_use` CDA addresses is sharing a donation address on a website or other digital medium, such as a screen. In this scenario, you can receive multiple deposits of arbitrary value and you fully control the sharing of the CDA. You can refresh the CDA on the website or screen each time the CDA is 72 hours before its `timeout_at` value runs out. This gives depositors enough time to finalize the payments they may have sent before you refreshed the CDA.

#### When should you create a CDA with an expected amount?

You should specify the value of the `expected_amount` field when the value of the deposit is clear from both the depositor's and the receiver's point of view. For example, when you want to withdraw from an exchange, you can give the exchange a CDA with the expected amount that you want to withdraw.