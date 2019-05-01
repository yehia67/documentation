# Send and receive transactions

**To send and receive transactions in an account, you must use conditional deposit addresses (CDA). CDAs are special addresses that allow you to specify the conditions in which they may be used in account withdrawals and deposits.**

Accounts use CDAs to reduce the [risks associated with spent addresses](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse). When you request IOTA tokens from a someone, you can create a CDA that's active for a certain period of time. This way, you let the sender know that you intend to withdraw from that address only after that time. As a result, the sender can decide whether to make a deposit, depending on how much time is left on a CDA.

:::info:
CDAs can be used only in an account and not in the generic [client library methods](root://client-libraries/0.1/introduction/overview.md). As a result, both you and the sender must have an account to be able to use CDAs.
:::

## Create a CDA

To create a CDA, specify the following condition, which defines whether it's active or expired:

* **timeout_at (required):** The time at which the address expires

And one of the following, recommended fields:

* **multi_use (recommended):** A boolean that specifies if the address may be sent more than one deposit.
* **expected_amount (recommended):** The amount of IOTA tokens that the address is expected to contain. When the address contains this amount, it's considered expired. We highly recommend using this condition.

:::info:
You can't specify the `expected_amount` and `multi_use` fields in the same CDA. Please refer to the [FAQ](../references/cda-faq.md) for more information.
:::

|  **Combination of fields** | **Withdrawal conditions**
| :----------| :----------|
|`timeout_at` |The CDA can used in withdrawals as long as it contains IOTA tokens|
|`timeout_at` and `multi_use` (recommended) |The CDA can be used in withdrawals as soon as it expires, regardless of how many deposits were made to it. See the [CDA FAQ](../references/cda-faq.md) on when to use addresses with the `multi_use` field set. |
|`timeout_at` and `expected_amount` (recommended) | The CDA can be used in withdrawals as soon as it contain the expected amount. See the [CDA FAQ](../references/cda-faq.md) on when to use addresses with the `multi_use` field set.|

:::warning:Warning
If a CDA was created with only the `timeout_at` field, it can be used in withdrawals as soon as it has a non-zero balance even if it hasn't expired. 

To avoid withdrawing from a spent address, we recommend creating CDAs with either the `multi_use` field or with the `expected_amount` field whenever possible.
:::

## Prerequisites

[Create a new account](../how-to-guides/create-account.md).

## Create a new CDA

1. Store the current time from your account's timesource object

    ```go
    // get current time
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
    // allocate a new deposit address with timeout conditions.
    conditions := &deposit.Request{TimeoutAt: &now, MultiUse: true}
    cda, err := acc.AllocateDepositRequest(conditions)
    handleErr(err)
    ```

### Create an oracle

A CDA may expire during the time it takes for a bundle to be created, sent, and confirmed. So, you need to make a decision about whether to deposit into a CDA, depending on its conditions. To automate this decision-making process, you can create an [oracle](https://github.com/iotaledger/iota.go/tree/master/account/oracle) that returns a decision (true or false) about whether to deposit into it.

Oracles take an oracle source as an argument and return `true` if the oracle source decides that you may deposit into the CDA.

1. Use the [`TimeDecider` oracle source](https://github.com/iotaledger/iota.go/tree/master/account/oracle/time) to check if the CDA's expiration time is at least 30 minutes away. These 30 minutes give the bundle time to be sent and confirmed.

    ```go
    threshold := time.Duration(30)*time.Minute
    // timeDecider is an OracleSource
    timeDecider := oracle_time.NewTimeDecider(timesource, threshold)
    // Create a new SendOracle with the given OracleSources
    sendOracle := oracle.New(timeDecider)
    ```

    :::info:
    To avoid conflicts with the `time` package, you must add a prefix to the `"github.com/iotaledger/iota.go/account/oracle"` import. In this example, we use the `oracle_time` prefix.
    :::

2. To call the oracle, pass the CDA to the `OkToSend()` method of the `sendOracle` object

    ```go
    // Ask the SendOracle whether we should make a deposit
    ok, rejectionInfo, err := sendOracle.OkToSend(cda)
    handleErr(err)
    if !ok {
        fmt.Println("Won't send transaction: ", rejectionInfo)
        return
    }
    ```

## Deposit IOTA tokens into a CDA

1. When a CDA contains an expected amount, you can deposit that amount into it by passing the object to the `account.Send()` method.
    
    ```go
    bundle, err := account.Send(cda.AsTransfer())
    handleErr(err)

    fmt.Printf("Made deposit into %s in the bundle with the following tail transaction hash %s\n", cda.Address, bundle[0].Hash)
    ```

:::info:
If you're testing your account on the Devnet and you don't have enough balance, use the [Devnet faucet](https://faucet.devnet.iota.org/) to request Devnet tokens.
:::

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

## Next steps

[Listen to events in your account](../how-to-guides/listen-to-events.md).