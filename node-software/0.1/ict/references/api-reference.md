# Ict REST API reference

**This reference article contains the endpoints for communicating with an Ict node through the REST API.**

:::warning:Warning
This API is in beta, and is subject to change. We don't recommend using this API in production applications.
::: 

## Headers

HTTP requests to the following endpoints must include a `Content-Type` HTTP header.

|Header	|Value|	Required or Optional|
|:------------|:---------|:--------------------|
`Content-Type` |`application/x-www-form-urlencoded`|	Required|

## Parameters

HTTP requests must include the [API password](../how-to-guides/getting-started-api.md) in the request body, which must be in the following format:

```json
"password=your-password"
```

## Endpoints

All endpoints are relative to the `http://URL:API-PORT/` URL, where `URL` is the URL or IP address of the node and `API-PORT` is its [REST API port](../how-to-guides/getting-started-api.md).


### getConfig

Get a node's Ict configuration settings.

```
POST /getConfig/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/getConfig \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now'
```
---
### NodeJS
```js
var request = require('request');

var password = "password=change_me_now";
               
var options = {
url: 'http://localhost:2187/getConfig',
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
---
### Python
```python
import json
import urllib3

password = 'password=change_me_now'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/getConfig', body=password, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Example responses

--------------------
### 200 Success
```json
{
 "anti_spam_abs": 1000,
 "gui_enabled": true,
 "gui_password": "",
 "gui_port": 2187,
 "host": "0.0.0.0",
 "max_forward_delay": 200,
 "max_heap_size": 1.01,
 "min_forward_delay": 0,
 "name": "ict",
 "neighbors": [
  "URL:PORT",
  "URL:PORT",
  "URL:PORT"
 ],
 "port": 1337,
 "round_duration": 60000,
 "success": true,
 "tangle_capacity": 10000
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`config`|Object|Ict configuration settings for the node|
### setConfig

Update a node's Ict configuration settings. The new configuration settings are stored in the ict.cfg file. Depending on the exact changes, the node might be restarted to apply the changes.

```
POST /setConfig/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/setConfig \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&config={"anti_spam_abs": 1000,
"gui_enabled": true,"gui_password": "change_me_now",
"gui_port": 2187,"host": "0.0.0.0","max_forward_delay": 200,
"max_heap_size": 1.01,"min_forward_delay": 0,"name": "ict",
"neighbors": ["URL:PORT","URL:PORT","URL:PORT"],"port": 1337,
"round_duration": 60000,"tangle_capacity": 1000}'
```
---
### NodeJS
```js
var request = require('request');

var config = {
  anti_spam_abs: 1000,
  gui_enabled: true,
  gui_password: "change_me_now",
  gui_port: 2187,
  host: "0.0.0.0",
  max_forward_delay: 200,
  max_heap_size: 1.01,
  min_forward_delay: 0,
  name: "ict",
  neighbors: ["URL:PORT","URL:PORT","URL:PORT"],
  port: 1337,
  round_duration: 60000,
  tangle_capacity: 1000
  };

var data = "password=change_me_now&config=" + JSON.stringify(config);

var options = {
  url: 'http://localhost:2187/setConfig',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(data);
    console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

config = {
 'anti_spam_abs': 1000,
 'gui_enabled': True,
 'gui_password': 'change_me_now',
 'gui_port': 2187,
 'host': '0.0.0.0',
 'max_forward_delay': 200,
 'max_heap_size': 1.01,
 'min_forward_delay': 0,
 'name': 'ict',
 'neighbors': ('URL:PORT', 'URL:PORT', 'URL:PORT'),
 'port': 1337,
 'round_duration': 60000,
 'tangle_capacity': 1000
}

data = 'password=change_me_now&config={}'.format(json.dumps(config))

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()
response = http.request('POST', 'http://localhost:2187/setConfig', body=data, headers=headers)
results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=2, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`config`|Required|Object|Ict configuration settings to update for the node. The `config` object must be in the same structure as the one returned from the `getConfig` endpoint and include all fields.|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### getInfo

Get general information about a node, including whether updates are available, the current version of the Ict software that it's running, and the default configuration settings.

```
POST /getInfo/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/getInfo \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now'
```
---
### NodeJS
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
---
### Python
```python
import json
import urllib3

password = 'password=change_me_now'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/getInfo', body=password, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Example responses

--------------------
### 200 Success
```json
{
"default_config": {
    "anti_spam_abs": 1000,
    "gui_enabled": true,
    "gui_password": "change_me_now",
    "gui_port": 2187,
    "host": "0.0.0.0",
    "max_forward_delay": 200,
    "max_heap_size": 1.01,
    "min_forward_delay": 0,
    "name": "ict",
    "neighbors": [],
    "port": 1337,
    "round_duration": 60000,
    "tangle_capacity": 10000
    },
"success": true,
"version": "0.5"
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`version`|String|Version of the Ict|
|`update`|String|Version of the latest Ict version. This field is returned only if a version is available that's newer than the value of the `version` field.|
|`default_config`|Object|Default configuration settings. Not the custom configuration of the node.|
### update

Download the given Ict version on a node. To check if a newer version of the Ict is available, use the `getInfo` endpoint.

```
POST /update/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/update \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&version=0.5'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&version=0.5";
               
var options = {
url: 'http://localhost:2187/update',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&version=0.5'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/update', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`version`|Required|String|Version of the Ict to download.|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### getLogs

Get all log messages within a given index interval.

```
POST /getLogs/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/getLogs \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&min=0&max=20'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&min=0&max=20";
               
var options = {
url: 'http://localhost:2187/getLogs',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&min=0&max=20'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/getLogs', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`min`|Optional|Number|Index of first message that you want to read|
|`max`|Optional|Number|Index of last message that you want to read|
#### Example responses

--------------------
### 200 Success
```json
{
 "logs": [
       {
        "level": "info",
        "timestamp": 1547437313,
        "message": "Sender/Neighbor]   102  |90   |0    |0    |0       localhost/127.0.0.1:14265"
       },
       {
        "level": "warn",
        "timestamp": 1547439294,
        "message": "[Receiver/Ict]   Received invalid transaction from neighbor: localhost/127.0.0.1:14265 (issuance timestamp not in tolerated interval)"
       },
            ...
       ],
 "min": 0,
 "max": 112,
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`block`|Boolean|If `true`, the log message with the index of the `min` parameter is not yet available. The log message will be returned when it's available.|
|`logs`|Array|Array (limited length) of logs in ascending index order.|
|`min`|Number|Index of first available log message to read.|
|`max`|Number|Index of last available log message to read.|
### setModuleConfig

Change the configuration settings of a given IXI module that's installed on a node. The new configuration settings are stored in the module's .cfg file.

```
POST /setModuleConfig/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/setModuleConfig \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&path=chat.ixi-1.4.jar&config={"password":"Bk6ZxLxu7ANvcCKmoI3O",
"channels":["casual","ict","announcements","speculation"],
"contacts":["VSVSXLQW"],"username":"Anonymous"}
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&path=chat.ixi-1.4.jar&config={"password":"Bk6ZxLxu7ANvcCKmoI3O",
"channels":["casual","ict","announcements","speculation"],
"contacts":["VSVSXLQW"],"username":"Anonymous"}";
               
var options = {
url: 'http://localhost:2187/setModuleConfig',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&path=chat.ixi-1.4.jar&config={"password":"Bk6ZxLxu7ANvcCKmoI3O",
"channels":["casual","ict","announcements","speculation"],
"contacts":["VSVSXLQW"],"username":"Anonymous"}'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/setModuleConfig', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`config`|Required|Object|The new configuration object. The `config` object must be in the same structure as the one returned from the `getModuleConfig` endpoint and include all fields.|
|`path`|Required|String|Relative path of the module in the `modules/` directory.|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### addModule

Install an IXI module by downloading the precompiled .jar file from GitHub.

```
POST /addModule/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/addModule \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&user_slash_repo=iotaledger/chat.ixi'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&user_slash_repo=iotaledger/chat.ixi";
               
var options = {
url: 'http://localhost:2187/addModule',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&user_slash_repo=iotaledger/chat.ixi'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/addModule', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`user_slash_repo`|Required|String|Path to a precompiled .jar file on GitHub in the format `username/repository` (for example, `iotaledger/chat.ixi`)|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### getModuleConfig

Get the current and the default configuration settings of an IXI module that's installed on a node.

```
POST /getModuleConfig/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/getModuleConfig \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&path=chat.ixi-1.4.jar'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&path=chat.ixi-1.4.jar";
               
var options = {
url: 'http://localhost:2187/getModuleConfig',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&path=chat.ixi-1.4.jar'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/getModuleConfig', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`path`|Required|String|Relative path of the module in the `modules/` directory.|
#### Example responses

--------------------
### 200 Success
```json
{
 "config": { "color": "red", ... },
 "default_config": { "color": "blue", ... },
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`config`|Object|The current configuration settings of the IXI module.|
|`default_config`|Object|The default configuration settings of the IXI module. Use this object if you want to reset the configuration settings.|
### getModules

Get all IXI modules that are installed on a node.

```
POST /getModules/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/getModules \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now'
```
---
### NodeJS
```js
var request = require('request');

var password = "password=change_me_now";
               
var options = {
url: 'http://localhost:2187/getModules',
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
---
### Python
```python
import json
import urllib3

password = 'password=change_me_now'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/getModules', body=password, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Example responses

--------------------
### 200 Success
```json
{
    "modules": [
        {
            "path": "chat.ixi.jar",
            "name": "CHAT.ixi",
            "description": "...",
            ...
            "update": "1.3",
            "configurable": true
         },
        ...
    ],
    "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`modules`|Array|All the IXI modules that are installed on the node. The `update` field is returned only if a newer version is available. If the `configurable` field is set to `true`, the module can be configured. To configure a module, use the `getModuleConfig` endpoint.|
### removeModule

Deletes an installed IXI module from a node.  To check which modules are installed on a node, use the GetModules endpoint.

```
POST /removeModule/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/removeModule \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&path=chat.ixi-1.4.jar'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&path=chat.ixi-1.4.jar";
               
var options = {
url: 'http://localhost:2187/removeModule',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&path=chat.ixi-1.4.jar'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/removeModule', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`path`|Required|String|Relative path of the module in the `modules/` directory.|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### updateModule

Delete a module and install a different version of it. To get the latest version of a module, use the GetModules endpoint.

```
POST /updateModule/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/updateModule \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&path=chat.ixi-1.4.jar&version=1.4'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&path=chat.ixi-1.4.jar&version=1.4";
               
var options = {
url: 'http://localhost:2187/updateModule',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&path=chat.ixi-1.4.jar&version=1.4'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/updateModule', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`version`|Required|String|Version of the IXI module to install|
|`path`|Required|String|Relative path of the module in the `modules/` directory.|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### removeNeighbor

Removes a neighbor from the current Ict instance.

```
POST /removeNeighbor/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/removeNeighbor \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&address=example.com:1337'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&address=example.com:1337";
               
var options = {
url: 'http://localhost:2187/removeNeighbor',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&address=example.com:1337'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/removeNeighbor', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`address`|Required|String|Address of the neighbor node to remove. Addresses must be in the following format: `HOST:PORT` (for example, `example.org:1337`).|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### addNeighbor

Add a given neighbor to a node.

```
POST /addNeighbor/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/addNeighbor \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now&address=example.com:1337'
```
---
### NodeJS
```js
var request = require('request');

var data = "password=change_me_now&address=example.com:1337";
               
var options = {
url: 'http://localhost:2187/addNeighbor',
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded'
},
form: data
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
      var result = JSON.parse(data);
      console.log(JSON.stringify(result, null, 1));
  }
});
```
---
### Python
```python
import json
import urllib3

data = 'password=change_me_now&address=example.com:1337'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/addNeighbor', body=data, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Parameters

|**Parameter**|**Required or Optional**|**Type**|**Description**|
|:-----|:-----|:-----|:-----|
|`address`|Required|String|Address of the neighbor node to remove. Addresses must be in the following format: `HOST:PORT` (for example, `example.org:1337`).|
#### Example responses

--------------------
### 200 Success
```json
{
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`success`|Object|`true` if the action was successful, `false` if there was an error.|
### getNeighbors

Get all neighbors that a node is connected to and the statistics for their most recent communications.

```
POST /getNeighbors/
```

#### Example requests

--------------------
### Curl
```curl
curl http://localhost:2187/getNeighbors \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'password=change_me_now'
```
---
### NodeJS
```js
var request = require('request');

var password = "password=change_me_now";
               
var options = {
url: 'http://localhost:2187/getNeighbors',
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
---
### Python
```python
import json
import urllib3

password = 'password=change_me_now'

headers = {
   'content-type': 'application/x-www-form-urlencoded'
}

http = urllib3.PoolManager()

response = http.request('POST', 'http://localhost:2187/getNeighbors', body=password, headers=headers)

results = json.loads(response.data.decode('utf-8'))

print(json.dumps(results, indent=1, sort_keys=True))
```
--------------------

#### Example responses

--------------------
### 200 Success
```json
{
 "neighbors": [
            {
             "address": "http://example.com:1337",
             "stats": [
                    {
                     "timestamp": 1547437313, "all": 192, "new": 76, "requested": 3, "invalid": 0, "ignored": 5},
                     ...
                ]
             },
             ...
        ],
 "success": true
}
```
--------------------

#### Results

|**Field**|**Type**|**Description**|
|:-----|:-----|:-----|
|`neighbors`|Array|All neighbors that the node is connected to|
