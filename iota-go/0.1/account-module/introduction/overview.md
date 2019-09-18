# Get started with the account module

**An account is an object that makes it easier to send and receive transactions. Accounts store data such as addresses and pending bundle hashes in a local database. This data allows you to interact with an IOTA network without worrying about withdrawing from spent addresses or promoting and reattaching pending transactions.**

Accounts abstract the complexity of the IOTA protocol and allow you to focus on making payments. In accounts, a payment can be one of two types:

* **Incoming payment:** A bundle that deposits IOTA tokens into an account
* **Outgoing payment:** A bundle that withdraws IOTA tokens from an account

:::warning:Beta software
The client libraries are currently in beta and you should not use them in production environments.
:::

## Audience

This documentation is for developers who are familiar with the Go programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as [bundles, transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md), and [why you should withdraw from addresses only once](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse).

## Prerequisites

To download the Go library and its dependencies, we recommend that you use [vgo modules](https://github.com/golang/go/wiki/Modules) (since Go 1.11) to manage dependencies in your project.

## Install the library

To install the Go library and its dependencies, do the following:

1. In any directory outside of $GOPATH, create a directory for your project and initialize it. Change the `<your-module-path>` placeholder to the path of your project such as `github.com/me/awesome-project`.

	```bash
	go mod init <your-module-path>
	```

2. Download the libraries

	```bash
	go get github.com/iotaledger/iota.go/account
    go get github.com/iotaledger/iota.go/api
	```

This command downloads the latest version of the IOTA Go client library and writes the version into the `go.mod` file.

## Get started

After you've [installed the library](#install-the-library), you can [create a new account](../how-to-guides/create-account.md).

## API reference

For details on all available API methods, see the [API reference](https://github.com/iotaledger/iota.go/tree/master/account). 

## Support the project

If the Go library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota.go/issues/new-issue), feature request or a [pull request](https://github.com/iotaledger/iota.go/pulls/). 

We thank everyone for their contributions. In order for your pull requests to be accepted, they must fulfill the following criteria:
- You must write tests for your additions with Ginkgo
- You must write example code that desribes the parameters and the functionality of your additions 
- Your pull request must pass the continuous integration configuration

### Write tests with Ginkgo

Before your pull requests can be accepted, you must test your code in Ginkgo.

1. Download Ginkgo

	```bash
	go get github.com/onsi/ginkgo/ginkgo
	go get github.com/onsi/gomega/...
	```

2. If you've written a new package, generate a corresponding test-suite file

	```bash
	cd <dir-of-your-package>
	ginkgo bootstrap
	```

3. Generate a new testing file

	```bash
	ginkgo generate <package-name>
	```

After creating a testing file, you'll have following two files:

- `<package-name>_suite_test.go`
- `<package-name>_test.go`

:::info:
You can use the existing tests as a reference on how to write Ginkgo tests or
you can [read the documentation](https://onsi.github.io/ginkgo/).
:::

4. Run your tests
	```bash
	go test -v
	=== RUN   TestAddress
	Running Suite: Address Suite
	============================
	Random Seed: 1542616006
	Will run 11 of 11 specs

	•••••••••••
	Ran 11 of 11 Specs in 0.261 seconds
	SUCCESS! -- 11 Passed | 0 Failed | 0 Pending | 0 Skipped
	--- PASS: TestAddress (0.26s)
	PASS
	ok  	github.com/iotaledger/iota.go/address	0.264s
	```

### Update documentation

If your changes affect the documentation, please update it.

1. If non existent, add a `.examples` directory in your newly created package

2. Create a new file with the following convention: `<package-name>_examples_test.go` inside
the `.examples` directory

3. Write examples in the following schema:
	```
	// i req: s, The ASCII string to convert to Trytes.
	// o: Trytes, The Trytes representation of the input ASCII string.
	// o: error, Returned for non ASCII string inputs.
	func ExampleASCIIToTrytes() {
		trytes, err := converter.ASCIIToTrytes("IOTA")
		if err != nil {
			// handle error
			return
		}
		fmt.Println(trytes) // output: "SBYBCCKB"
	}
	```

| **Symbol**     | **Description** |
|:---------------|:--------|
| i req | Describes a parameter to the function. |
| i | Describes an optional parameter to the function. |
| o | Describes a return value of the function. |

Syntax:

- For parameters: `<symbol>: <parameter_name>, <description>.`  
- For return values: `<symbol>: <type>, <description>.`
- Example function: `Example<OriginFunctionName>`

## Join the discussion

Join our [Discord](https://discord.iota.org) to get involved in the community, ask for help, or to discuss the technology. 