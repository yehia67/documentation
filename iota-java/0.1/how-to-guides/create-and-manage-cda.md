# Make payments to/from your account

**To make payments, both the sender and the receiver need to have a CDA. The sender needs an expired CDA that contains IOTA tokens, and the receiver needs an active CDA.**

:::info:
CDAs can be used only in an account and not in the generic client library methods. As a result, both you and the sender must have an account to be able to use CDAs.
:::

1. Define an expiration time for the CDA
  
    ```java
    // In this case, after 72 hours
    Date hours = new Date(System.currentTimeMillis() + 72000 * 60 * 60);
    
    ```

2. Create a new CDA with an expiration time and expected amount

    ```java
    Future<ConditionalDepositAddress> cda = account.newDepositAddress(hours, false, 1000).get();
    ```

3. After making sure that the CDA is still active, send a deposit to it

    ```java
    Future<Bundle> bundle = account.send(
            cda.getDepositAddress().getHashCheckSum(),
            cda.getRequest().getExpectedAmount(),
            Optional.of("Thanks for that pizza!"), Optional.of("OMNOMNOM"));
    bundle.get();
    ```

    :::info
    If you want to test this sample code with free test tokens, [request some from the Devnet faucet](root://getting-started/0.1/tutorials/receive-test-tokens.md).
    :::

    :::info:
    The last 9 characters of a CDA are the checksum, which is a hash of the address and all of its conditions. This checksum is not compatible with Trinity or the Devent faucet because they don't yet support CDAs.
    
    Remove the checksum before pasting your address into the input field of either of these applications.
    :::

## Transfer your entire available balance to one CDA

You may want to keep the majority of your balance on as few CDAs as possible. This way, making payments is faster and requires fewer transactions. To do so, you can transfer you available balance to a new CDA.

:::info:
Available balance is the total balance of all expired CDAs. This balance is safe to withdraw.

Your account's total balance includes CDAs that are still active as well as expired. This balance is unsafe to withdraw.
:::

1. Create a CDA that has your account's total available balance as its expected amount

    ```java
	Date hours = new Date(System.currentTimeMillis() + 10000 * 60 * 60);
    ConditionalDepositAddress cda = account.newDepositAddress(hours, false, account.availableBalance()).get();
    ```

2. Transfer your total available balance to the CDA

    ```java
    Future<Bundle> bundle = account.send(
            address.getDepositAddress().getHashCheckSum(), 
            address.getRequest().getExpectedAmount(), 
            Optional.of("Sweep of all addresses"),
            Optional.of("IOTA9SWEEP"));
    bundle.get();
    ```

## Send someone your CDA

If you want a depositer to transfer IOTA tokens to your account, you need to send them your CDA.

Because CDAs are descriptive objects, you can serialize them into any format before sending them. The `generateCDA()` method returns a CDA object with the following fields. You can serialize a CDA into any format before distributing it to senders.

This is the 

```js
{
   address, // The last 9 trytes are the checksum
   timeout_at,
   multi_use,
   expected_amount
}
```

For example, you can serialize these fields to create a magnet link.

### Serialize a CDA into a magnet link

The built-in method for serializing a CDA is to create a magent link.

1. To serialize a CDA to a magnet link, do the following:

    ```java
    String magnet = DepositFactory.get().build(cda.get(), MagnetMethod.class);
    
    System.out.println(magnet);
    // iota://YWEQLREFJQORXXKKEBBBDKOPAXHXJRGVPBUTBJFSRPPYVWWYUWSBDJTIUBJVFREXEAUZWRICKH9VBSQE9KPNLTCLNC/?timeout_at=1554472983208&multi_use=false&expected_amount=1000
    ```

2. To send a transaction to a CDA that's been serialized into a magnet link, first deserialize the magent link into a CDA

    ```java
     String magnet = "iota://YWEQLREFJQORXXKKEBBBDKOPAXHXJRGVPBUTBJFSRPPYVWWYUWSBDJTIUBJVFREXEAUZWRICKH9VBSQE9KPNLTCLNC/?timeout_at=1554472983208&multi_use=false&expected_amount=1000";
    ConditionalDepositAddress cda = DepositFactory.get().parse(magnet, MagnetMethod.class);
    Future<Bundle> bundle = account.send(
            cda.getDepositAddress().getHashCheckSum(),
            cda.getRequest().getExpectedAmount(),
            Optional.of("Thanks for that pizza!"), Optional.of("OMNOMNOM"));
    bundle.get();
    ```