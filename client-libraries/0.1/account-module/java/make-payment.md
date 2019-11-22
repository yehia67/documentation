# Make payments to/from your account

**To make payments, both the sender and the receiver need to have a conditional deposit address (CDA). The sender needs an expired CDA that contains IOTA tokens, and the receiver needs an active CDA to send tokens to.**

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Step 1. Create a conditional deposit address

1. [Plan the conditions](../introduction/overview.md#advice-for-creating-cdas) you would like your conditional deposit address to have

2. Define an expiration time for the CDA. This one expires tomorrow.
  
    ```java
    Date hours = new Date(System.currentTimeMillis() + 24000 * 60 * 60);
    
    ```

2. Create a new CDA with an expiration time and expected amount

    ```java
    Future<ConditionalDepositAddress> cda = account.newDepositAddress(hours, false, 1000).get();
    ```

If you want senders to transfer IOTA tokens to your account, you need to send them your CDA.

Because CDAs are descriptive objects with the following fields, you can serialize them into any format before sending them:

```js
{
   address, // The last 9 trytes are the checksum
   timeout_at,
   multi_use,
   expected_amount
}
```

For example, you can serialize these fields to create a magnet link.

### Optional: Serialize a CDA into a magnet link

1. To serialize a CDA to a magnet link, do the following:

    ```java
    String magnet = DepositFactory.get().build(cda.get(), MagnetMethod.class);
    
    System.out.println(magnet);
    // iota://YWEQLREFJQORXXKKEBBBDKOPAXHXJRGVPBUTBJFSRPPYVWWYUWSBDJTIUBJVFREXEAUZWRICKH9VBSQE9KPNLTCLNC/?timeout_at=1554472983208&multi_use=false&expected_amount=1000
    ```

2. To deserialize the magnet link into a CDA, do the following

    ```java
     String magnet = "iota://YWEQLREFJQORXXKKEBBBDKOPAXHXJRGVPBUTBJFSRPPYVWWYUWSBDJTIUBJVFREXEAUZWRICKH9VBSQE9KPNLTCLNC/?timeout_at=1554472983208&multi_use=false&expected_amount=1000";
    ConditionalDepositAddress cda = DepositFactory.get().parse(magnet, MagnetMethod.class);
    ```

## Step 2. Make a payment 

1. Copy and paste your address into the [Devnet faucet](https://faucet.devnet.iota.org), then wait for the tokens to be transferred to your address

    :::info:
    The last 9 characters of a CDA are the checksum, which is a hash of the address and all of its conditions.

    Make sure to remove the checksum before requesting IOTA tokens from the Devnet faucet.
    :::


2. After making sure that the CDA is still active, send a deposit to it

    ```java
    Future<Bundle> bundle = account.send(
            cda.getDepositAddress().getHashCheckSum(),
            cda.getRequest().getExpectedAmount(),
            Optional.of("Thanks for that pizza!"), Optional.of("OMNOMNOM"));
    bundle.get();
    ```

Your account will reattach and promote your bundle until it's confirmed.

### Optional: Combine your entire available balance into one CDA

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