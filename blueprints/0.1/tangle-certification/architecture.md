# Application architecture

**The Tangle certificate application uses the IOTA MAM protocol to keep track of all valid certificates in streams of transactions called MAM channels.**

:::warning:Disclaimer
Running an open source project, like any human endeavor, involves uncertainty and trade-offs. We hope the architecture described below helps you to deploy similar systems, but it may include mistakes, and can’t address every situation. If you have any questions about your project, we encourage you to do your own research, seek out experts, and discuss them with the IOTA community.
:::

This blueprint uses the following architecture, whereby issuers create certificates, using the certification system's API. Third parties can authenticate certificates by reading the certificate transaction from the Tangle and validating the signature, using the issuer's public key.

ARCHITECTURE IMAGE

## Building blocks

The application allows issuers to upload their signed certificates to the Tangle through a certification system, which also allows third parties to authenticate them.

### Certification system API

The certification system exposes the following API endpoints that use the functions in the [IOTA certificates library](root://utils/0.1/official/tangle-certificate/overview.md).

#### Create a template

Adds a new SVG template to the certificate system.

The SVG may contain placeholders such as `%%HASH%%`, which can be replaced by an issuer when the certificate is viewed. This API will store the template and return an ID, which is referred to in the certificate data.

```
POST https://certification-system/template
```

##### Body parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `name` | Required|The name of your template. You can enter any name. | string|
| `content` | Required|The SVG content, including any placeholders | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "name": "Template 1",
  "content": "<svg>.....</svg>"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json'
    }

request = urllib2.Request(url="https://certification-system/template", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var body = {
  "name": "Template 1",
  "content": "<svg>.....</svg>"
}

var options = {
  url: 'https://certification-system/template',
  method: 'POST',
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
curl https://certification-system/template \
-X POST \
-H 'Content-Type: application/json' \
-d '{
  "name": "Template 1",
  "content": "<svg>.....</svg>"
}'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "id": "AAAA.....ZZZZZ",
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `id` | The template's unique storage ID|
| `success` | Whether the request was successful |
| `message` | A message from the server|

##### Example template

EXAMPLE IMAGE

#### Create an issuer

Creates an issuer on the certification system.

Before calling this endpoint, the issuer should generate their own public/private key pair and store it somewhere safe.

For each new issuer, the following information is stored in the certification system:

- A unique ID for the issuer
- A randomly generated seed with which to generate addresses to send the issuer's certificate transactions
- The latest address index that was used to issue a certificate, starting from 0
- The issuer's public key, which is used to authenticate the signature in certificate transactions

```
POST https://certification-system/issuer
```

##### Body parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `name` | Required|The name of the issuer. You can enter any name. | string|
| `publicKey` | Required|The issuer's public key | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "name": "Fred Bloggs",
  "publicKey": "-----BEGIN PUBLIC KEY----- -----END PUBLIC KEY-----"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://certification-system/issuer", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var body = {
  "name": "Fred Bloggs",
  "publicKey": "-----BEGIN PUBLIC KEY----- -----END PUBLIC KEY-----"
}

var options = {
  url: 'https://certification-system/issuer',
  method: 'POST',
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
curl https://certification-system/issuer \
-X POST \
-H 'Content-Type: application/json' \
-d '{
  "name": "Template 1",
  "content": "<svg>.....</svg>""name": "Fred Bloggs",
  "publicKey": "-----BEGIN PUBLIC KEY----- -----END PUBLIC KEY-----"
}'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "id": "AAAA.....ZZZZZ",
   "success": true,
   "message": "OK"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `id` | The ID of the issuer. Use this ID to issue certificates. |
| `success` | Whether the request was successful |
| `message` | A message from the server|

#### Issue a certificate

Issues a certificate by doing the following:

- Locate the issuers details
- Increment the issuer's latest address index
- Use the latest address index to generate a new address from the issuer's seed
- Create a MAM message that contains the issuer’s ID (which in turn points to their public key), the template ID, the data from the payload, the signature from the payload
- Attach the transaction to the Tangle and return the transaction hash

```
POST https://certification-system/certificate
```

##### Body parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `issuerId` | Required|The ID of the issuer | string|
| `templateId` | Required|The ID of the certificate template you want to use| string|
| `data` | Optional|The data to use in place of the template placeholders. Make sure the field name matches the placeholder name.| JSON object|
| `signature` | Required|The signed values of the `issuerId`, `templateId`, and `data` fields, using the issuer's private key | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

command = {
  "issuerId": "AAAA...ZZZZ",
  "templateId": "AAAA...ZZZZZ",
  "data": {
    "participantName": "John Smith",
    "participationDate": "1st April 2020"
  },
  "signature": "fkjhsdk8yhasdhsjd"
}

stringified = json.dumps(command)

headers = {
    'content-type': 'application/json',
}

request = urllib2.Request(url="https://certification-system/certificate", data=stringified, headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var body = {
  "issuerId": "AAAA...ZZZZ",
  "templateId": "AAAA...ZZZZZ",
  "data": {
    "participantName": "John Smith",
    "participationDate": "1st April 2020"
  },
  "signature": "fkjhsdk8yhasdhsjd"
}

var options = {
  url: 'https://certification-system/certificate',
  method: 'POST',
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
curl https://certification-system/certificate \
-X POST \
-H 'Content-Type: application/json' \
-d '{
  "issuerId": "AAAA...ZZZZ",
  "templateId": "AAAA...ZZZZZ",
  "data": {
    "participantName": "John Smith",
    "participationDate": "1st April 2020"
  },
  "signature": "fkjhsdk8yhasdhsjd"
}'
```
--------------------

##### Response examples
--------------------
### 200
```json
{
   "success": true,
   "message": "OK",
   "hash": "TTTT...WWWWW"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|
|`hash`|The hash of the certificate transaction that was attached to the Tangle|

#### Authenticate a certificate

Authenticates a certificate by doing the following:

- Reads the transaction from the Tangle, using the transaction hash
- Loads the issuers public key from the tangle, using the issuer's ID in the transaction's `signatureMessageFragment` field
- Verifies the signature, using the issuer’s public key

```
GET https://certification-system/authenticate/:hash
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `hash` | Required|The transaction hash of the certificate that you want to authenticate | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://certification-system/authenticate/:hash", headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var options = {
  url: 'https://certification-system/authenticate/:hash',
  method: 'POST',
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
curl https://certification-system/authenticate/:hash \
-X POST \
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

#### View a certificate

Renders a certificate.

Internally, the API does the same as the `authenticate` endpoint. If the authentication is successful, the template SVG is loaded, using the template ID from the transaction's `signatureMessageFragment` field, and is combined with the placeholder data.

```
GET https://certification-system/authenticate/:hash
```

##### Path parameters

|**Parameter** | **Required or Optional**|**Description** | **Type**|
|--|--|--|--|
| `hash` | Required|The transaction hash of the certificate that you want to render | string|

##### Examples
--------------------
### Python
```python
import urllib2
import json

headers = {
    'content-type': 'application/json'
}

request = urllib2.Request(url="https://certification-system/certificate/:hash", headers=headers)
returnData = urllib2.urlopen(request).read()

jsonData = json.loads(returnData)

print jsonData
```
---
### Node.js
```js
var request = require('request');

var options = {
  url: 'https://certification-system/certificate/:hash',
  method: 'POST',
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
curl https://certification-system/certificate/:hash \
-X POST \
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
   "svg": "<svg>.....</svg>"
}
```
--------------------

##### Results

|**Return field** | **Description** |
|--|--|
| `success` | Whether the request was successful |
| `message` | A message from the server|
|`svg`|The SVG image of the certificate|

### Issuers

After an issuer is created, using the `issuer` endpoint, it can create new certificates, using the following API workflow:

- Create an SVG template, using the `template` endpoint
- Issue a certificate, using the `certificate` endpoint

### Third parties

Third parties can use the `view` endpoint to view a certificate and the `authenticate` endpoint to authenticate it.