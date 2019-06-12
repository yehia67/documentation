# Update an Ict node

**The Ict software is in a beta development stage, so it's likely to change, meaning that you'll need to update it. When a new version of the Ict software is released on GitHub, we recommend that you update the version on your node.**

You have three options for updating the Ict software:
* Download the pre-built Java file from GitHub (quickest option)
* Build the Java file from the source code on GitHub
* Write a script that uses the REST API to automate the update process 

## Download the pre-built Java file

The pre-built Ict Java file is available on the [IOTA GitHub repository](https://github.com/iotaledger/ict/releases). Downloading and executing this file is the quickest and simplest way to install the Ict software.

1. Stop the node

    ```bash
    sudo systemctl stop ict
    ```

2. Change into the `/home/ict` directory

    ```bash
    cd /home/ict
    ```

3. Find out the current version of the Ict Java file that's on your server

    ```bash
    ls | grep .jar
    ```

4. Remove the Ict Java file. Replace the `${VERSION}` variable with the current version of the Ict on your server.

    ```bash
    sudo rm ict${VERSION}.jar
    ```

5. Download the latest Ict Java file into your `/home/ict` directory. Replace the `${VERSION}` variable with the [latest version](https://github.com/iotaledger/iri/releases) of the Ict software.

    ```bash
    sudo wget https://github.com/iotaledger/ict/releases/download/${VERSION}/ict-${VERSION}.jar
    ```

    The download may take some time. If everything went well, you should see the following line near the end of the output:

    ```
    HTTP request sent, awaiting response ... 200 OK
    ```

6. Open the `systemd` service

    ```bash
    sudo nano /etc/systemd/system/ict.service
    ```

7. Update the value of the `ExecStart` field in the `systemd` service to use the latest version of the Ict Java file that you just downloaded. Replace the `${VERSION}` variable with the version of the Ict Java file.

    ```
    ExecStart =/usr/bin/java -jar /home/ict/ict${VERSION}.jar
    ```

8. Start the node

    ```bash
    systemctl daemon-reload
    systemctl start ict
    ```

### Build the Ict Java file from the source code

Instead of downloading the pre-built Ict Java file, you may want to build the file from the source code the any of the following reasons:
* You want to be sure that the code you run is the same as the source code
* You want to modify the code before you run it

1. Stop the node

    ```bash
    sudo systemctl stop ict
    ```

2. Change into the `/home/ict` directory

    ```bash
    cd /home/ict
    ```

3. Find out the current version of the Ict Java file that's on your server

    ```bash
    ls | grep .jar
    ```

4. Remove the Ict Java file. Replace the `${VERSION}` variable with the current version of the Ict Java file on your server.

    ```bash
    sudo rm ict${VERSION}.jar
    ```

5. Pull the latest version from GitHub

    ```bash
    sudo git pull
    ```

6. Build the Ict Java file

    ```bash
    sudo gradle fatJar
    ```

    If everything went well, you should see the `BUILD SUCCESSFUL` message in the output.

7. Install the dependencies for the ict website and build the files

    ```bash
    cd web
    npm install
    npm run build
    `````

    If everything went well, you should see the `Built in xxxs.` message in the output.

8. Open the `systemd` service

    ```bash
    sudo nano /etc/systemd/system/ict.service
    ```

9. Update the value of the `ExecStart` field in the `systemd` service to use the latest version of the Ict Java file that you just built. Replace the `${VERSION}` variable with the version of the Ict Java file.

    ```
    ExecStart =/usr/bin/java -jar /home/ict/ict${VERSION}.jar
    ```

10. Start the node

    ```bash
    systemctl daemon-reload
    systemctl start ict
    ```

## Download the latest Ict through the REST API

To check if a newer version of the Ict Java file is available and download the it, you can use the [`update`](../references/api-reference.md#update) endpoint of the REST API.

### Prerequisites

Before you complete this guide, we recommend completing the [Getting started guide](../how-to-guides/getting-started-api.md). This guide assumes that you've completed that guide and that you have the index.js file open in a code editor.

:::info:
Just want the code? [See the final code](#final-code).
:::

---

1. In the `request()` function, remove the `console.log()` function

2. Under the `result` variable, create a new one to store the `update` field of the returned data

    ```js
    var update = result.update;
    ```

3. Create an `if` statement that checks if the `update` field contains data

    ```js
    if(update){

    }
    ```

4. In that `if` statement, create a variable to store the password and the `version` parameter of the `update` endpoint

    ```js
    var command = `password=change_me_now&version=${update}`;
    ```

5. Create an `updateOptions` object for the `request()` function to send a `POST` request to the `update` endpoint and authenticate the request with the password. Replace `http:localhost:2187` with the URL and REST API port of your node, and replace `change_me_now` with your password.

    ```js
    var updateOptions = {
        url: 'http://localhost:2187/update',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: command
        };

        request(updateOptions, function (error, response, data) {
            if(!error && response.statusCode == 200){
            console.log(data);
            console.log("Successfully updated Ict");
            } else {
            console.log(`HTTP error: ${response.statusCode}`);
            console.log(error);
            }
    });
    ```

6. Execute the file


    :::warning:Warning
    If the `update` endpoint is successful, the node will have stopped running.
    :::

7. On your node, open the `systemd` service

    ```bash
    sudo nano /etc/systemd/system/ict.service
    ```

8. Update the value of the `ExecStart` field in the `systemd` service to use the latest version of the Ict Java file that you just downloaded. Replace the `${VERSION}` variable with the version of the Ict Java file.

    ```
    ExecStart =/usr/bin/java -jar /home/ict/ict${VERSION}.jar
    ```

9. Start the node

    ```bash
    systemctl daemon-reload
    systemctl start ict
    ```

### Final code
 
Before you run this sample code, replace `http:localhost:2187` with the URL and REST API port of your node, and replace `change_me_now` with your password.

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
    var update = result.update;

    if(update){
        var command = `password=change_me_now&version=${update}`;

        var updateOptions = {
        url: 'http://localhost:2187/update',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: command
        };

        request(updateOptions, function (error, response, data) {
            if(!error && response.statusCode == 200){
            console.log(data);
            console.log("Successfully updated Ict");
            } else {
            console.log(`HTTP error: ${response.statusCode}`);
            console.log(error);
            }
        });

    } else if (response.statusCode !== 200) {
        console.log(`HTTP error: ${response.statusCode}`);
        console.log(error);
    } else {
        console.log("Ict already up to date")
    }
}
});
```