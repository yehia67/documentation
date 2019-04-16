# Send and receive transactions

**To send and receive transactions in an account, you must use conditional deposit addresses (CDA). CDAs are special addresses that allow you to specify the conditions in which they may be used in account withdrawals and deposits.**

Accounts use CDAs to avoid address reuse. When you request IOTA tokens from a someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

:::info:
CDAs can be used only in an account and not in the generic [client library methods](root://client-libraries/0.1/introduction/overview.md). As a result, both you and the sender must have an account to be able to use CDAs.
:::

## State of a CDA

CDAs can be in either an active or expired state. The state of a CDA determines whether you can withdraw from it or deposit into it:

**Active CDA:** You can deposit IOTA tokens into an active address. You can't withdraw tokens from an active address.

**Expired CDA:** You can withdraw tokens from an expired address. You can't deposit tokens into an expired address.

## Conditions of a CDA

To create a CDA, specify the following condition, which defines whether it's active or expired:

* **timeout_at (required):** The time at which the address expires

And one of the following, recommended fields:

* **multi_use (recommended):** A boolean that specifies if the address may be sent more than one deposit.
* **expected_amount (recommended):** The amount of IOTA tokens that the address is expected to contain. When the address contains this amount, it's considered expired. We highly recommend using this condition.

:::info:
The combination of both `expected_amount` and `multi_use` in the same CDA is not supported. Both fields are designed for different scenarios. Please refer to the [FAQ](../references/cda-faq.md) for more information.
:::

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeout_at` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeout_at` and `multi_use` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. See the [CDA FAQ](../references/cda-faq.md) on when to use addressess with the `multi_use` field set. |
|`timeout_at` and `expected_amount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount. See the [CDA FAQ](../references/cda-faq.md) on when to use addressess with the `multi_use` field set.|

:::warning:Warning
If a CDA was created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. 

To avoid address reuse, we recommend creating CDAs with either the `multi_use` field or with the `expected_amount` field whenever possible.
:::

## Prerequisites

You must have an account to complete this guide. if you don't have one, [create a new account](../how-to-guides/create-account.md).

## Create a new CDA

This guide assumes that you've followed our [Getting started guide](../README.md) and are using the [vgo modules](https://github.com/golang/go/wiki/Modules) to manage dependencies in your project.

1. Store the current time from your account's timesource object

    ```go
    // get the current time
    now, err := timesource.Time()
    handleErr(err)
    ```

2. Define an expiration time for the CDA

    ```go
    // define the time after which the CDA expires
    // (in this case after 72 hours)
    now = now.Add(time.Duration(72) * time.Hour)
    ```

3. Create a new multi-use CDA with an expiration time

    ```go
    // allocate a new deposit address with conditions
    conditions := &deposit.Conditions{TimeoutAt: &now, MultiUse: true}

    cda, err := account.AllocateDepositAddress(conditions)
    handleErr(err)
    ```

## Distribute a CDA

Because CDAs are descriptive objects, you can serialize them into any format and distribute them. For example, you can create a magnet-link for a CDA, with the `timeout_at`, `multi_use`, and `expected_amount` parameters.

1. To serialize the CDA into a magent link, use the `AsMagnetLink()` method of the CDA object

    ```go
    fmt.Println(cda.AsMagnetLink())
    // iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1&expected_amount=0
    ```

2. To parse the magnet link into a CDA, use the `ParseMagnetLink()` method of the `deposit` object

    ```go
    cda, err := deposit.ParseMagnetLink(cdaMagnetLink)
    handleErr(err)
    ```

## Decide whether to make a deposit into a CDA

A CDA may expire during the time it takes for a bundle to be created, sent, and confirmed. Therefore, before making a deposit into a CDA, you may want to create an oracle that can return a decision about whether to deposit into it.

### Create an oracle

In this example, the `sendOracle` object will return `true` only if the current time is at least 30 minutes before the end of the CDA's expiration time. These 30 minutes give the bundle time to be sent and confirmed.

```go
threshold := time.Duration(30)*time.Minute
// timeDecider is an OracleSource
timeDecider := oracle_time.NewTimeDecider(timesource, threshold)
// we create a new SendOracle with the given OracleSources
sendOracle := oracle.New(timeDecider)
```

:::info:
To avoid conflicts with the `time` package, you must add a prefix to the `"github.com/iotaledger/iota.go/account/oracle"` import. In this example, we used the `oracle_time` prefix.
:::

### Call an oracle

1. To call an oracle, pass the CDA to the `OkToSend()` method of the `sendOracle` object

    ```go
    // Ask the SendOracle whether we should make a deposit
    ok, info, err := sendOracle.OkToSend(cda)
    handleErr(err)
    if !ok {
        log.Fatal("won't send transaction:", info)
        return
    }
    ```

## Deposit IOTA tokens into a CDA

1. After making sure that the CDA is still active, you can use the `Send()` method to deposit IOTA tokens into it

    ```go
    // Send the bundle that makes the deposit
    // In this case, we assume that an expected amount was set in the CDA
    // and therefore the transfer is initialized with that amount.
    bundle, err := account.Send(cda.AsTransfer())
    handleErr(err)

    fmt.Printf("Made deposit into %s in the bundle with the following tail transaction hash %s\n", cda.Address, bundle[0].Hash)
    ```
