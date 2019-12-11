# Read transactions on the Tangle in Java

**In this guide, you get [transactions](root://getting-started/0.1/transactions/transactions.md) from the Tangle by connecting to a [node](root://getting-started/0.1/network/nodes.md) and asking it to filter them by their bundle hash. Then, you decode the message in the transaction and print it to the console.**

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Code walkthrough

1. Import the classes

    ```java
    import java.io.IOException;
    import java.util.List;

    import com.fasterxml.jackson.core.JsonParseException;
    import com.fasterxml.jackson.databind.JsonMappingException;

    import org.iota.jota.IotaAPI;
    import org.iota.jota.error.ArgumentException;
    import org.iota.jota.model.Transaction;
    import org.iota.jota.utils.TrytesConverter;
    ```
2. Connect to a node

    ```java
    IotaAPI api = new IotaAPI.Builder()
            .protocol("https")
            .host("nodes.devnet.thetangle.org")
            .port(443)
            .build();
    ```

3. Define the bundle hash that you want to use to filter transactions 

    ```java
    String bundleHash = "HGRGBSAQSKSBCDCX9IFUKDWYTJDKEMHAKWH9LJ9JCBL9EWHLSZQZYQXDZKVICNZKWKKUNTD9OSLVVEGFA";
    ```

4. Use the `findTransactionObjectsByBundle()` method to get transactions by the value of their `bundle` field. Then, get the message in the first transaction's `signatureMessageFragment` field, decode it, and print it to the console

    ```java
    try { 
        List<Transaction> response = api.findTransactionObjectsByBundle(bundleHash);
        System.out.println(TrytesConverter.trytesToAscii(response.get(0).getSignatureFragments().substring(0,2186)));
    } catch (ArgumentException e) { 
        // Handle error
        e.printStackTrace(); 
    }
    ```

    In the console, you should see your message:

    ```json
    "Hello world"
    ```

:::success:Congratulations :tada:
You've just found and read a transaction on the Tangle.
:::

## Run the code

These code samples are hosted on [GitHub](https://github.com/JakeSCahill/java-iota-workshop).

To get started you need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your device.

You also need a Java development environment that uses the [Maven](https://maven.apache.org/download.cgi) build tool. If this is your first time using the Java client library, complete our [getting started guide](../../getting-started/java-quickstart.md), and follow the instructions for installing the library with Maven.

In the command-line, do the following:

--------------------
### Linux and macOS
```bash
git clone https://github.com/JakeSCahill/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -Dexec.mainClass="com.iota.ReadData"
```
---
### Windows
```bash
git clone https://github.com/JakeSCahill/java-iota-workshop.git
cd java-iota-workshop
mvn clean install
mvn exec:java -D"exec.mainClass"="com.iota.ReadData"
```
--------------------

In the console, you should see your message:

```json
"Hello world"
```

## Next steps

[Generate a new address](../java/generate-an-address.md).

