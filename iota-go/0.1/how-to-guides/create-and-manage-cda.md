# Make payments to/from your account

**To make payments, both the sender and the receiver need to have a CDA. The sender needs an expired CDA that contains IOTA tokens, and the receiver needs an active CDA.**

:::info:Accounts only
CDAs can be used only in an account and not in the generic client library methods. As a result, both you and the sender must have an account to be able to use CDAs.
:::

:::info:Checksum
The last 9 characters of a CDA are the checksum, which includes the address and all of its conditions. This checksum is not compatible with Trinity because it doesn't yet support CDAs.
:::

1. Import the required packages

    ```go
    "time"

	"github.com/iotaledger/iota.go/account/deposit"
	"github.com/iotaledger/iota.go/account/oracle"
	oracle_time "github.com/iotaledger/iota.go/account/oracle/time"
    ```

2. Create a new CDA that expires tomorrow

    ```go
    // Get the current time
    now, err := timesource.Time()
    handleErr(err)

    now = now.Add(time.Duration(24) * time.Hour)

    // Specify the conditions
    conditions := &deposit.Conditions{TimeoutAt: &now, MultiUse: true}

    cda, err := account.AllocateDepositAddress(conditions)
    handleErr(err)
    ```

3. After making sure that the CDA is still active, send a deposit to it
    
    ```go
    bundle, err := account.Send(cda.AsTransfer())
    handleErr(err)

    fmt.Printf("Made deposit into %s in the bundle with the following tail transaction hash %s\n", cda.Address, bundle[0].Hash)
    ```

    You should see something like the following in the output:

    ```
    Made deposit into DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKDTMAUX9ILA in the bundle with the following tail transaction hash WZEATTRJYENRALJTWPVGDQZHETIDJXPUROUM9BBPS9RJEELDMU9YNZFBSDGPQHZHMXBVCKITSMDEEQ999
    ```

    :::info
    If you want to test this sample code with free test tokens, [request some](root://getting-started/0.1/tutorials/receive-test-tokens.md).

    Be aware that the last 9 characters of your address is the checksum, which is not compatible with the faucet. Remove these characters before pasting your address into the input field.
    :::

## Automate the decision-making process

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

## Send someone your CDA

If you want a depositer to send IOTA tokens to your account, you need to send them your CDA.

Because CDAs are descriptive objects, you can serialize them into any format before sending them. The `generateCDA()` method returns a CDA object with the following fields. You can serialize a CDA into any format before distributing it to senders.

```js
{
   address, // The last 9 trytes are the checksum
   timeoutAt,
   multiUse,
   expectedAmount
}
```

For example, you can serialize these fields to create a magnet link.

### Serialize a CDA into a magnet link

The built-in method for serializing a CDA is to create a magent link.

1. To serialize the CDA into a magent link, use the `AsMagnetLink()` method of the CDA object

    ```go
    fmt.Println(cda.AsMagnetLink())
    // iota://MBREWACWIPRFJRDYYHAAME…AMOIDZCYKW/?timeout_at=1548337187&multi_use=1&expected_amount=0
    ```

2. To send a transaction to a CDA that's been serialized into a magnet link, deserialize the magent link into a CDA

    ```go
    cda, err := deposit.ParseMagnetLink(cda.AsMagnetLink())
    handleErr(err)
    ```

## Next steps

[Try exporting your account so you can import it onto another device](../how-to-guides/import-seed-state.md).