# Perform a snapshot transition

**During a global snapshot, nodes remove old transaction data from their ledgers to free memory. After a global snapshot, nodes have only the addresses with a balance of at least 1 i. If you don't see your correct balance after a global snapshot, you must perform a snapshot transition to allow Trinity to request the latest balance of your addresses.**

:::danger:
On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. Please check our advice for [protecting your Trinity account](../how-to-guides/protect-trinity-account.md).
:::

:::info:
Trinity is stateful, which means that it stores a local copy of your transaction history on your device. As a result, you can still see your transaction history after a global snapshot.
:::

--------------------
### Desktop

1. Go to **Account** > **Account management** > **Tools**

2. Click **Transition**
---
### Mobile

1. Go to **Settings** > **Account management**

2. Click **Transition**
--------------------

:::success:
You should see your correct balance.
::: 

![photo of snapshot transition](../images/transition.jpg)
