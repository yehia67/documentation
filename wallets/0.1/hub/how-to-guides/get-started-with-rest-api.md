# Get started with the RESTful API

**When you expose Hub's RESTful API server, you can interact with it through HTTP endpoints. These endpoints allow you to manage users' tokens by interfacing with the Hub database and an IOTA node. In this guide, you learn the basics of the RESTful API to create a new user with some new deposit addresses.**

## Prerequisites

To use the code samples in this guide, you must have the following:

* [Node.js (8+)](https://nodejs.org/en/) or [Python (3+)](https://www.python.org/downloads/) and [PIP](https://pip.pypa.io/en/stable/installing/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt

 :::info:
The endpoints are all documented in the [RESTful API reference](../references/restful-api-reference.md).
:::

## Step 1. Set up a connection to Hub

1\. Install the libraries

--------------------
### Node.js

```bash
npm install request --save
```
---
### Python

```bash
pip install urllib3
```
--------------------

2\. Import the libraries

--------------------
### Node.js

```bash
var request = require('request');
```
---
### Python

```bash
import json
import urllib3
```
--------------------

3\. Set up the request body. Replace the `http://127.0.0.1:50051` URL with value of the `--listenAddress` flag that you used when you set up Hub.

--------------------
### Node.js

```bash
var options = {
url: 'http://127.0.0.1:50051',
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'X-IOTA-API-Version': '1',
    'Content-Length': Buffer.byteLength(JSON.stringify(command))
},
json: command
};

request(options, function (error, response, data) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(data));
    }
});
```
---
### Python

```bash
http = urllib3.PoolManager()

response = http.request('POST', 'http://127.0.0.1:50051',
                 headers={'Content-Type': 'application/json', 'X-IOTA-API-Version': '1'},
                 body=command)

results = json.loads(response.data.decode('utf-8'))
print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

## Step 2. Deposit IOTA tokens into Hub

1\. Create a new user

--------------------
### Node.js

```bash
command = {
  "command": "CreateUser",
  "userId": "Jake"
}
```
---
### Python

```bash
command = json.dumps({
  "command": "CreateUser",
  "userId": "Jake"
})
```
--------------------

You should see an empty object in the console, which means that the user was created.

:::info:
You can see this user in the Hub database by [querying the `user_account` table](../how-to-guides/query-the-database.md).
:::

2\. Create a new deposit address for the user

--------------------
### Node.js

```bash
command = {
  "command": "GetDepositAddress",
  "userId": "Jake"
}
```
---
### Python

```bash
command = json.dumps({
  "command": "GetDepositAddress",
  "userId": "Jake"
})
```
--------------------

You should see a new deposit address in the console.

3\. Create a new deposit address with the checksum

--------------------
### Node.js

```bash
command = {
  "command": "GetDepositAddress",
  "includeChecksum": true,
  "userId": "Jake"
}
```
---
### Python

```bash
command = json.dumps({
  "command": "GetDepositAddress",
  "includeChecksum": true,
  "userId": "Jake"
})
```
--------------------

Now, the user has two addresses that were created from two different `seeduuid` fields. You can see this data in the database by [querying the `user_address` table](../how-to-guides/query-the-database.md).

:::info:
In the database, addresses are always saved without the checksum.
:::

4\. Send some IOTA tokens to one of the user's deposit addresses

:::info:
[Trinity](root://wallets/0.1/trinity/introduction/overview.md) is the official IOTA wallet, which makes it easy to send IOTA tokens.
::: 

5\. Get the balance and history for the user  

--------------------
### Node.js

```bash
command = {
  "command": "GetBalance",
  "userId": "Jake"
}
```
---
### Python

```bash
command = json.dumps({
  "command": "GetBalance",
  "userId": "Jake"
})
```
--------------------

If you sent IOTA tokens to the deposit address in step 4, the output should display something like the following:

```shell
10 i available for 'Jake'
History:
events {
	timestamp: 1540856214000
	type: DEPOSIT
	amount: 10
}
```

If you look at the deposit address history in a Tangle explorer such as [thetangle.org](https://thetangle.org/), you will see that Hub moved the funds away from the deposit address and into another address (Hub owner's address where funds are aggregated until a user requests a withdrawal). This process is called a [sweep](../concepts/sweeps.md).

:::success:Congratulations :tada:
You've successfully created a new user and tested how Hub handles deposits of IOTA tokens.
:::

## Next steps

[Set up a demo exchange](../how-to-guides/create-a-demo-exchange.md) to test an integration of Hub.

[Integrate Hub into your exchange](../how-to-guides/integrate-hub.md).




