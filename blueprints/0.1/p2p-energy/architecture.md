# Application architecture

**The P2P energy grid application publishes data to an IOTA network from sources, producers, consumers, and the grid.**

:::warning:Disclaimer
Running an open source project, like any human endeavor, involves uncertainty and trade-offs. We hope the architecture described below helps you to deploy similar systems, but it may include mistakes, and can’t address every situation. If you have any questions about your project, we encourage you to do your own research, seek out experts, and discuss them with the IOTA community.
:::

This blueprint uses the following architecture whereby the source, producer, consumer, and grid are interconnected through an IOTA network.

![P2P Energy PoC - Sequence Diagram](../images/p2p_sequence.png)

## Building blocks

All entities communicate, using a combination of MAM channels and web API calls.

![P2P energy PoC - communication](../images/p2p_communication.png)

### Source MAM channel

Sources creates a MAM channel to tell the producer how much energy they have contributed over a period of time, using the following payload:

```json
{
   "command": "output",        /* The MAM command */
   "startTime": 1542267468229, /* Unix Epoch in milliseconds */
   "endTime": 1542267469229,   /* Unix Epoch in milliseconds */
   "output": 1.234             /* kWh */
}
```

To allow the producer to validate that it's subscribed to the correct channel, the source publishes a `hello` command to any new channel.

```json
{
   "command": "hello"
}
```

To signal that a channel is no longer in use, the source publishes a `goodbye` command to it.

```json
{
   "command": "goodbye"
}
```

After creating a MAM channel, sources register with producers, using the [producer's registration API](#producer-registration-api).

![P2P energy PoC - source workflow](../images/p2p_source.png)

### Consumer MAM channel

Consumers create a MAM channel to keep the grid up to date with how much they owe, using the following payload:

```json
{
   "startTime": 1542267468229,         /* ms since 1900 */
   "endTime": 1542267469229,           /* ms since 1900 */
   "usage": 1.234                      /* kWh */
}
```

After creating a MAM channel, consumers register with the grid, using the [grid's registration API](#grid-registration-api).

![P2P energy PoC - consumer workflow](../images/p2p_consumer.png)

### Producer MAM channel

The producer creates a MAM channel to tell the grid the following:

How much energy all of its sources have contributed over a period of time
A proposed price for the energy
An address to which to send the payment in IOTA tokens

```json
{
   "command": "output",                    /* The MAM command */
   "startTime": 1542267468229,             /* Unix Epoch in milliseconds */
   "endTime": 1542267469229,               /* Unix Epoch in milliseconds */
   "output": 1.234,                        /* kWh */
   "producerPrice": 56789,                 /* IOTA tokens per kWh */
   "paymentIdOrAddress": "PPPPPP...QQQQQQ" /* Method of receiving payment */
}
```

The `producerPrice` field is not guaranteed to be met by the grid, instead the grid may calculate its own price by monitoring and recording the price for all producers. For example, the grid may pay an average of the values of all `producerPrice` fields or a weighted average based on how much the producer contributed to the grid.

The `paymentIdOrAddress` can be an IOTA address or a reference ID so that the grid has another way of making payments.

After creating a MAM channel, producers register with the grid, using the [grid's registration API](#grid-registration-api). This way, the grid can monitor the amount of energy that the producers generate.

![P2P energy PoC - producer workflow](../images/p2p_producer.png)

### Producer registration API

Producers allow sources to register their MAM channels, using an API, so that producers can monitor them.

#### Register

Registers a new source.

```
PUT https://producer/registration/:registrationId
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registrationId` | Required|A string of characters that identifies a source. You must generate your own random ID and keep it for future API calls. | string|

##### Body parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `itemName` | Required|The name of your source. You can enter any name. | string|
| `itemType` | Required|The type of energy that the source provides. You can enter any type. | string|
| `root` | Optional|The root of the MAM channel | string|
| `sideKey` | Optional|The side key for the MAM channel that's given in the `root` parameter. You need a side key only if the MAM channel is in restricted mode. | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
   "itemName": "My Solar Source",
   "itemType": "solar",
   "root": "CCCCCC...DDDDDD",
   "sideKey": "AAA....ZZZZZZ"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://producer/registration/:registrationId", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var body = {
   "itemName": "My Solar Source",
   "itemType": "solar",
   "root": "CCCCCC...DDDDDD",
   "sideKey": "AAA....ZZZZZZ"
}

var options = {
  url: 'https://producer/registration/:registrationId',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(body))
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://producer/registration/:registrationId \
-X PUT \
-H 'Content-Type: application/json' \
-d '{
   "itemName": "My Solar Source",
   "itemType": "solar",
   "root": "CCCCCC...DDDDDD",
   "sideKey": "AAA....ZZZZZZ"
}'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|

#### Deregister

Deregisters an existing source.

When a source is dereistered, the producer stops monitoring its MAM channel.

```
DELETE https://producer/registration/:registrationId/:sideKey
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registrationId` | Required|The registration ID that was used to register the source | string|
| `sideKey` | Optional|If the source was registered with a side key, you must pass this parameter | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://producer/registration/:registrationId/:sideKey", headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var options = {
  url: 'https://producer/registration/:registrationId/:sideKey',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://producer/registration/:registrationId/:sideKey \
-X DELETE \
-H 'Content-Type: application/json'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|

### Grid MAM channel

When consumers register with the grid, it creates a MAM channel to tell them how much they owe over a period of time, using the following payload:

```json
{
   "command": "payment-request",           /* the command */
   "owed": 345,                            /* amount in IOTA owed
                                              excludes pending transactions */
   "usage": 123,                           /* the amount of kWh the payment is for */
   "paymentIdOrAddress": "WWWWWW...XXXXXX" /* payment address for owed
                                              balance payment to grid */
}
```

The `paymentIdOrAddress` can be an IOTA address or a reference ID so that the consumer has another way of making payments.

After the grid has taken its cut of the IOTA tokens, the rest is paid to the producers for their energy.

To allow the producers and consumers to validate that they're subscribed to the correct channel, the grid publishes a `hello` command to any new channel.

```json
{
   "command": "hello"
}
```

To signal that a channel is no longer in use, the source publishes a `goodbye` command to it.

```json
{
   "command": "goodbye"
}
```

### Grid registration API

Grids allow producers and consumers to register themselves, using an API.

#### Register

Registers a new producer or consumer.

```
PUT https://producer/registration/:registrationId
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registrationId` | Required|A string of characters that identifies a producer or consumer. You must generate your own random ID and keep it for future API calls. | string|

##### Body parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `itemName` | Required|The name of your producer or consumer. You can enter any name. | string|
| `itemType` | Required|`producer` or `consumer`| string|
| `root` | Optional|The root of the MAM channel to register | string|
| `sideKey` | Optional|The side key for the MAM channel that's given in the `root` parameter. You need a side key only if the MAM channel is in restricted mode. | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
   {
   "itemName": "Jake",
   "itemType": "consumer",
   "root": "CCCCCC...DDDDDD",
   "sideKey": "AAA....ZZZZZZ"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://grid/registration/:registrationId", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var body = {
   "itemName": "Jake",
   "itemType": "consumer",
   "root": "CCCCCC...DDDDDD",
   "sideKey": "AAA....ZZZZZZ"
}

var options = {
  url: 'https://grid/registration/:registrationId',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(body))
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://grid/registration/:registrationId \
-X PUT \
-H 'Content-Type: application/json' \
-d '{
   "itemName": "Jake",
   "itemType": "consumer",
   "root": "CCCCCC...DDDDDD",
   "sideKey": "AAA....ZZZZZZ"
}'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   {
   "success": true,
   "message": "OK",
   "root": "JJJJJJ...KKKKKK",
   "sideKey": "CCC...DDDD"
}
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|
|`root`| The root of the MAM channel that the consumer should monitor for payment information|
|`sideKey`| If the MAM channel is in restricted mode, this is the side key to decrypt the message|

#### Deregister

Deregisters an existing MAM channel.

When a MAM channel is deregistered, the grid stops monitoring it.

```
DELETE https://grid/registration/:registrationId/:sideKey
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registrationId` | Required|The registration ID that was used to register the source | string|
| `sideKey` | Optional|If the source was registered with a side key, you must pass this parameter | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://grid/registration/:registrationId/:sideKey", headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var options = {
  url: 'https://grid/registration/:registrationId/:sideKey',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://grid/registration/:registrationId/:sideKey \
-X DELETE \
-H 'Content-Type: application/json'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|

### Grid storage API

The grid storage API is available to any part of the architecture that needs to store information on a permanent basis.

#### Register

Saves an item to the database.

```
PUT https://grid/storage/item/:registration-id/:context/:id
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registration-id` | Required|The registration ID that was used to register the producer or consumer | string|
| `context` | Required|A name that's used to group your content. You can think of this parameter as a directory for your data.
 | string|
|`id`| Required|A name that identifies your data. For example `file.txt`| string|

##### Body parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `{}` | Required|A JSON object | JSON|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
    }

command = {
   "myCustomData": "Some data"
}

stringified = json.dumps(command)

request = urllib2.Request(url="https://grid/storage/item/:registration-id/:context/:id", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var body = {
   "myCustomData": "Some data"
}

var options = {
  url: 'https://grid/storage/item/:registration-id/:context/:id',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify(body))
  },
  json: command
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://grid/storage/item/:registration-id/:context/:id \
-X PUT \
-H 'Content-Type: application/json' \
-d '{
   "myCustomData": "Some data"
}'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|

#### Get item

Returns existing data from the database.

```
GET https://grid/storage/:registration-id/:context/:id
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registration-id` | Required|The registration ID that was used to register the data | string|
| `context` | Required|The name of the context that the data is in | string|
|`id`| Required|The name of the data that you want to read| string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://grid/registration/:registration-id/:context/:id", headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var options = {
  url: 'https://grid/registration/:registration-id/:context/:id',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://grid/registration/:registration-id/:context/:id \
-X GET \
-H 'Content-Type: application/json'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK",
   "item": {
      "myCustomData": "Some data"
   }
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|
|`item`|The JSON data that was found|

#### Delete item

Deletes existing items.

```
DELETE https://grid/storage/:registration-id/:context?/:id?
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `registration-id` | Required|The registration ID that was used to register the data. If you omit the `context` and `id` parameters, all the data that is saved for this ID will be deleted. | string|
| `context` | Optional|The name of the context that you want to delete. If you omit the `id` parameter, all data in this context will be deleted. | string|
|`id`| Optional|The name of the data that you want to delete| string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
  }

request = urllib2.Request(url="https://grid/registration/:registration-id", headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var options = {
  url: 'https://grid/registration/:registration-id',
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
};

request(options, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    console.log(data);
  }
});
```
---
### cURL
```bash
curl https://grid/registration/:registration-id \
-X DELETE \
-H 'Content-Type: application/json'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|

#### Read all items

Allows you to get items from the storage in a paged manner. Both page and page-size are optional and will default to 0 and 10 respectively.

```
GET https://grid/storage/:registration-id/:context?page?&page-size?
```

**Response**

```json
{
   "success": true,          /* true or false */
   "message": "OK",          /* Or error message if fail */
   "ids": [...],             /* array of the ids */
   "items": [...],           /* array of the items */
   "totalPages": 6,          /* calculated from page-size and num items */
   "totalItems": 45,         /* total number of items available */
   "pageSize": 10            /* The page size used in calculations */
}
```

#### Examples

A producer with a registration ID of ABC123 might want to store the details of its sources in a safe place instead of just locally for backup.

It would create or update an item with a PUT to https://grid/storage/ABC123/sources/XXX123.

The item could be retrieved with a GET to https://grid/storage/ABC123/sources/XXX123

The item could be deleted with a DELETE to https://grid/storage/ABC123/sources/XXX123

Or all the items for ABC123 could be deleted with 
https://grid/storage/ABC123/

The producer could get all its items on page 5 with a page size of 10 with a GET call to https://grid/storage/ABC123/sources?page=5&pageSize=10
