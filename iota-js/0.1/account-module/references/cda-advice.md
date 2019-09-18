# Advice about the conditions of a CDA

**When you're creating a CDA, you may find it difficult to know in advance what conditions it should have. This article has some useful advice for creating CDA conditions.**

## How long should I specify in a CDA's timeout?

The value that you specify in the `timeoutAt` field depends on how fast you expect the depositor to make a deposit. If you are in direct contact with the depositor and you are both waiting to settle the transfer, you can specify a shorter timeout.

:::danger:Important
If a CDA was created with only the `timeoutAt` field, it can be used in outgoing payments as soon as it has a non-zero balance even if it hasn't expired. So, to avoid withdrawing from a spent address, we recommend creating CDAs with either the `multiUse` field or with the `expectedAmount` field whenever possible.
:::

## When should I create a multi-use CDA?

We recommend that you use multi-use CDAs when the following conditions are true:

- You expect multiple payments of arbitrary value from multiple depositors.
- You fully control the creation and sharing of the CDA, for example on your website.
- When you cannot share a CDA with the `expectedAmount` field value set with each depositor individually.

Or when communicating with depositors who reliably request a new CDA when the `timeoutAt` field value is running out.

One scenario for `multiUse` CDA addresses is sharing a donation address on a website or other digital medium, such as a screen. In this scenario, you can receive multiple deposits of arbitrary value and you fully control the sharing of the CDA. You can refresh the CDA on the website or screen each time the CDA is 72 hours before its `timeoutAt` value runs out. This gives depositors enough time to finalize the payments they may have sent before you refreshed the CDA.

## When should I create a CDA with an expected amount?

You should specify the value of the `expectedAmount` field when the value of the deposit is clear from both the depositor's and the receiver's point of views. For example, when you want to withdraw from an exchange. You can give a CDA with an expected amount to the exchange.

Or when you request a payment for a specific service or good from a single deposit with whom you have direct communication.