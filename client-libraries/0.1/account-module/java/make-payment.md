# Make payments with your account in Go

**In this guide, you use your account to deposit IOTA tokens into a pre-defined CDA.**

## IOTA packages

To complete this guide, you need to install the following packages (if you're using Go modules, you just need to reference these packages):

```bash
go get github.com/iotaledger/iota.go/account/builder
go get github.com/iotaledger/iota.go/account/deposit
go get github.com/iotaledger/iota.go/account/oracle
go get github.com/iotaledger/iota.go/account/oracle/time
go get github.com/iotaledger/iota.go/account/store/badger
go get github.com/iotaledger/iota.go/account/timesrc
go get github.com/iotaledger/iota.go/api
```

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Use the `ParseMagnetLink()` method to deserialize the predefined magnet link into a CDA 

    ```java
    String magnet = "iota://BWNYWGULIIAVRYOOFWZTSDFXFPRCFF9YEHGVBOORLGCPCJSKTHU9OKESUGZGWZXZZDLESFPPTGEHVKTTXG9BQLSIGP/?timeout_at=5174418337&multi_use=1&expected_amount=0";

    ConditionalDepositAddress cda = DepositFactory.get().parse(magnet, MagnetMethod.class);
    ```

    :::info:
    The given magent link is for an example CDA that expires in over 100 years.
    If you want to make a payment to a different CDA, use that one instead.
    :::


2. If you dont have a CDA that contains IOTA tokens, follow [this guide](../go/generate-cda.md)

3. After making sure that the CDA is still active, send a deposit to it

    ```java
    Future<Bundle> bundle = account.send(
            cda.getDepositAddress().getHashCheckSum(),
            cda.getRequest().getExpectedAmount(),
            Optional.of("Thanks for that pizza!"), Optional.of("OMNOMNOM"));
    bundle.get();
    ```

    You should see something like the following in the output:

    ```
    Sent deposit to DL9CSYICJVKQRUTWBFUCZJQZ9WNBSRJOA9MGOISQZGGHOCZTXVSKDIZN9HBORNGDWRBBAFTKXGEJIAHKDTMAUX9ILA in the bundle with the following tail transaction hash WZEATTRJYENRALJTWPVGDQZHETIDJXPUROUM9BBPS9RJEELDMU9YNZFBSDGPQHZHMXBVCKITSMDEEQ999
    ```

Your account will reattach and promote your bundle until it's confirmed.

## Run the code

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

If you don't have a Go development environment, or if this is your first time using the Go client library, complete our [getting started guide](../../getting-started/go-quickstart.md).

In the command-line, do the following:

```bash
git clone https://github.com/JakeSCahill/iota-samples.git
cd iota-samples/go/account-module
go mod download
go run make-payment/make-payment.go
```
You should see that the deposit was sent.

Your seed state will contain this pending bundle until it is confirmed.

## Next steps

[Try exporting your seed state so you back it up or import it onto another device](../java/export-seed-state.md).

