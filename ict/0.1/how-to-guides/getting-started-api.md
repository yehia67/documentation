# Getting started with the Ict REST API

**The Ict REST API allows you to programatically configure a node, download the latest Ict Java file, update IXI modules, as well as access data from neighbors, log messages, and IXI modules.**

In the following guide, you'll use Node.js to send an HTTP POST request for the following:

* The version of the Ict software that a node is running
* The default values of the configuration parameters
* If a newer version of the Ict is available, the newer version number.

## Prerequisites

To use the sample code in this guide, you must have the following:

* [Node,js (8+)](https://nodejs.org/en/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection
* Access to an [Ict node](../how-to-guides/run-an-ict-node.md)

## Authentication

Nodes wait to receive transactions from clients on the REST API port.

All requests must include the password to the Ict website in a query parameter, which must be in the following format:

```json
"password=your-password"
```

:::info:
If you've forgotten your password, [find it in the configuration file](../references/troubleshooting.md).
:::

## Get general information about a node

:::info:
Just want the code? [See the final code](#final-code).
:::

1. Create a working directory called node-info-example

    ```bash
    mkdir node-info-example
    cd node-info-example
    ```

2. In the `node-info-example` directory, install the [request module](https://github.com/request/request)

    ```bash
    npm install request --save
    ```

3. Create a file called index.js in the `node-info-example` directory

4. In the index.js file, require the `request` module

    ```js
    var request = require('request');
    ```

5. Create a variable to store your password. Replace `change_me_now` with your password.

    ```js
    var password = "password=change_me_now";
    ```

    :::info:
    If you've forgotten your password, [find it in the configuration file](../references/troubleshooting.md).
    :::

6. Create an `options` object to authenticate the request with your password. Replace `http:localhost:2187` with the URL and REST API port of your node, and replace `change_me_now` with your password.

    ```js
    var options = {
    url: 'http://localhost:2187/getInfo',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: password
    };
    ```

7. Call the `request()` function and pass it the `options` object

    ```js
    request(options, function (error, response, data) {
    if (!error && response.statusCode == 200) {
        var result = JSON.parse(data);
        console.log(JSON.stringify(result, null, 1));
    }
    });
    ```

8. Execute the file

The output should display something like the following:

```
{
"success":true,
"default_config":{
    "max_heap_size":1.01,
    "round_duration":60000,
    "max_forward_delay":200,
    "anti_spam_abs":1000,
    "gui_port":2187,
    "tangle_capacity":10000,
    "gui_password":"change_me_now",
    "port":1337,
    "neighbors":[],
    "name":"ict",
    "host":"0.0.0.0",
    "gui_enabled":true,
    "min_forward_delay":0
    },
"version":"0.5"
}
```

:::success:Success
Congratulations :tada: You've just sent your first successful HTTP request to a node.
:::

### Final code

```js
var request = require('request');

var password = "password=change_me_now";


var options = {
url: 'http://localhost:2187/getInfo',
method: 'POST',
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
},
form: password
};

request(options, function (error, response, data) {
if (!error && response.statusCode == 200) {
    var result = JSON.parse(data);
    console.log(JSON.stringify(result, null, 1));
}
});
```

## Next steps

Try using this endpoint to find out the latest Ict version and [update your node](../how-to-guides/update-ict-with-api.md).
