# Get started with the account module

**An account is an object that makes it easier to send and receive transactions. Accounts store data such as addresses and pending bundle hashes in a local database. This data allows you to interact with an IOTA network without worrying about withdrawing from spent addresses or promoting and reattaching pending transactions.**

Accounts abstract the complexity of the IOTA protocol and allow you to focus on making payments. In accounts, a payment can be one of two types:

* **Incoming payment:** A bundle that deposits IOTA tokens into an account
* **Outgoing payment:** A bundle that withdraws IOTA tokens from an account

:::warning:Beta software
The client libraries are currently in beta and you should not use them in production environments.
:::

## Audience

This documentation is designed for developers who are familiar with the Java programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as [address reuse](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse), [bundles, and transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md).

## Prerequisites

To use this library, you must have Java 6 (or later).

## Install the library

The IOTA Java client library is available on [JitPack][https://jitpack.io/].

### Dependencies

The Java library uses the following third-party libraries:

* [Retrofit 2](https://square.github.io/retrofit/) type-safe HTTP client: `2.3.0`
* [Simple Logging Facade for Java](http://www.slf4j.org/): `1.7.25`
* [Apache Commons Lang](http://commons.apache.org/proper/commons-lang/): `3.6`
* [Apache Commons IO](http://commons.apache.org/proper/commons-io/): `2.5`
* [Legion of the Bouncy Castle](https://www.bouncycastle.org/java.html) Java cryptography APIs: `1.58`

To download the IOTA Java client library and its dependencies, you can use one of the following options:

* Download the library with Gradle
* Download the library with Maven
* Download the library manually

### Install the library with Gradle

 1. Add the JitPack repository to your root `build.gradle` file

    ```gradle
    allprojects {
        repositories {
            maven { url 'https://jitpack.io' }
        }
    }
    ```

2. Add the iotaledger dependency to your module `build.gradle` file

    ```gradle
    dependencies {
        compile 'com.github.iotaledger:iota-java:1.0.0-beta3'
    }
    ```
    
### Install the library with Maven

1. Add the JitPack repository to your root `pom.xml` file
    ```xml
    <repositories>
        <repository>
            <id>jitpack.io</id>
            <url>https://jitpack.io</url>
        </repository>
    </repositories>
    ```

2. Add the iotaledger dependency to your module `pom.xml` file
    ```xml
    <dependency>
        <groupId>com.github.iotaledger.iota-java</groupId>
        <artifactId>jota</artifactId>
        <classifier>jar-with-dependencies</classifier>
        <version>[VERSION_INFORMATION]</version>
    </dependency>
    ```
    
3. Change the value of the `<version>` tag to either a release number or the first 10 characters of a Git commit hash:
`<version>a98de8ea50</version>` or `<version>1.0.0-beta3</version>`

:::info:
Find the latest version on the [JitPack](https://jitpack.io/#iotaledger/iota-java) page.
:::

### Install the library manually

1. Clone or download the [GitHub repository](https://github.com/iotaledger/iota-java)

    Inside the project, you'll have the following directories:
    * jota
    * jota-parent

2. Reference the jota directory in your project

3. In the `jota` directory, install the dependencies

    ```bash
    mvn clean install
    ```

Now, you have a `jota-[VERSION]-jar-with-dependencies.jar` file, depending on your version of the library.

## Get started

After you've installed the library, you can [create a new account](../how-to-guides/create-account.md).

Most API calls are **synchronous**. As a result, we recommend that you call the API from a background thread or a worker thread to stop the API from blocking other threads such as the UI or the main thread.

## API reference

For a full list of API commands for the Java library, go to the [iotaledger GitHub page](https://github.com/iotaledger/iota-java/tree/dev/jota/src/main/java/org/iota/jota/account).

## Support the project

If the Java library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota-java/issues/new-issue), feature request or a [pull request](https://github.com/iotaledger/iota-java/pulls/).  
We have some [basic contribution guidelines](https://github.com/iotaledger/iota-java/blob/dev/CONTRIBUTING.md) to keep our code base stable and consistent.

### Update documentation

If your changes affect the documentation, please update it.

## Join the discussion

Join our [Discord](https://discord.iota.org) to get involved in the community, ask for help, or to discuss the technology.