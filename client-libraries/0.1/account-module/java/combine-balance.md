You may want to keep the majority of your balance on as few CDAs as possible. This way, making payments is faster and requires fewer transactions. To do so, you can transfer you available balance to a new CDA.

1. Create a CDA that has your account's total available balance as its expected amount

    ```java
	Date hours = new Date(System.currentTimeMillis() + 10000 * 60 * 60);
    ConditionalDepositAddress cda = account.newDepositAddress(hours, false, account.availableBalance()).get();
    ```

    :::info:
    Available balance is the total balance of all expired CDAs, which is safe to withdraw.

    Your account's total balance includes CDAs that are still active as well as expired, which is unsafe to withdraw.
    :::

2. Transfer your total available balance to the CDA

    ```java
    Future<Bundle> bundle = account.send(
            address.getDepositAddress().getHashCheckSum(), 
            address.getRequest().getExpectedAmount(), 
            Optional.of("Sweep of all addresses"),
            Optional.of("IOTA9SWEEP"));
    bundle.get();
    ```