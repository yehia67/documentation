# Send simple data transaction

**IOTA allows you to send data (zero-value) transactions as well as IOTA tokens. These zero-value transactions are useful for applications that want to send and store immutable messages on the Tangle. To send only a zero-value transaction, you don't need any IOTA tokens.**

## Prerequisites

Make sure you have the IOTA Python client library ([PyOTA](https://pypi.org/project/PyOTA/)) installed.

## Example code

```python
'''
This example creates a simple transaction with a custom message/tag
There is no value attached to this transaction.
'''

from iota import Iota
from iota import ProposedTransaction
from iota import Address
from iota import Tag
from iota import TryteString

# Note that we don't need a seed to send 0 value transactions
# since these transactions are not signed, we can publish to
# any address
api = Iota('https://nodes.devnet.iota.org:443', testnet=True) 

# Note that this is a string representation of the address.
# To use it with the lib, we need to create an iota.Address
# object from it.
address = 'PYTHONLIBEXAMPLEADDRESSDONOTUSEINYOURPROJECT9999999999999999999999999999999999999'

# A ProposedTransaction is a transaction object that has
# not yet been sent to the Tangle.
tx = ProposedTransaction(
    address=Address(address),
    message=TryteString.from_unicode('You did it <your-name-here>!'),
    tag=Tag('HELLOWORLD'),
    value=0
)

# Prepares a set of transfers and creates the bundle, then
# attaches the bundle to the Tangle, and broadcasts and
# stores the transactions.
result = api.send_transfer(transfers=[tx])

print('Transaction sent to the tangle!')
print('https://devnet.thetangle.org/address/%s' % address)
```

:::info:
Put your name in the message field of the transaction to send a personalized message.
:::

## What is happening here?

### Import what you need

To be able to use the features provided by the library, you have to get familiar
with some of the object representations used in there. Naming is intended to be 
self explanatory, but if you would like to dig deeper, browse the [PyOTA documentation](https://pyota.readthedocs.io/en/latest/).

```python
# `Iota` is the extended API class
from iota import Iota
# Types to construct a transaction
from iota import ProposedTransaction
from iota import Address
from iota import Tag
from iota import TryteString
```

### Declare API instance

In PyOTA, an API instance is the Alpha and Omega for any interactions you want to
carry out with the network. There are two types of APIs at your disposal:

 - Core API for low-level interactions with a node:
   
   ```python
   api = iota.StrictIota('adapter-specification')
   ```

 - and Extended API to perform more complex operations:
   
   ```python
   api = iota.Iota('adapter-specification')
   ```

:::warning:
"Core API" and "Extended API" are PyOTA specific names only!
:::

:::info:
The Extended API is the superset of the Core API + convenience methods. You can call the same low-level commands as in the Core API. This might come handy when you would like to fine-tune the behavior of your application.
:::

In this example we are using the Extended API class:

```python
# Note that we don't need a seed to send 0 value transactions
# since these transactions are not signed, we can publish to 
# any address
api = Iota('https://nodes.devnet.iota.org:443', testnet=True) 
```

The only mandatory argument here is the adapter sepcification that tells our API instance which node to connect to. If you run your own node, you can specify its URI here.

:::info:
Note that we give some hints to PyOTA about using the testnet (`testnet=True`), but it is not necessary. All it does is it sets the default [minimum weight magnitude](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md) to 9, whereas it is 14 on the mainnet.
:::

### Specify address

```python

# Note that this is a string representation of the address.
# To use it with the lib, we need to create an iota.Address
# object from it.
address = 'PYTHONLIBEXAMPLEADDRESSDONOTUSEINYOURPROJECT9999999999999999999999999999999999999'

```
This is the address where your transaction will be sent.
Addresses in IOTA are 81 trytes long and may only contain characters of the [tryte alphabet](root://dev-essentials/0.1/references/tryte-alphabet.md).

PyOTA uses the [TryteString](https://pyota.readthedocs.io/en/latest/types.html#trytestring) class to represent trytes as a sequence of ASCII characters. Its subclasses help you to differentiate between special purpose trytes:

 - `Fragment`: A signature or message fragment inside a transaction. Fragments are always    2187 trytes long.

 - `Hash`: An object identifier. Hashes are always 81 trytes long. There are many different types of hashes:

   - `Address`: Identifies an address on the Tangle.

   - `BundleHash`: Identifies a bundle on the Tangle.

   - `TransactionHash`: Identifies a transaction on the Tangle.

 - `Seed`: A TryteString that is used for crypto functions such as generating addresses, signing inputs, etc. Seeds can be any length, but 81 trytes offers the best security.

 - `Tag`: A tag used to classify a transaction. Tags are always 27 trytes long.

 - `TransactionTrytes`: A TryteString representation of a transaction on the Tangle. TransactionTrytes are always 2673 trytes long.

### Construct transaction

```python
# A ProposedTransaction is a transaction object that has
# not yet been sent to the Tangle.
tx = ProposedTransaction(
    address=Address(address),
    message=TryteString.from_unicode('You did it <your-name-here>!'),
    tag=Tag('HELLOWORLD'),
    value=0
)
```

PyOTA makes a disctinction between "proposed" and "regular" transaction (and bundle) objects. The former are not attached to the Tangle yet, unlike the latter. When you prepare your transactions and bundles, you create "proposed" objects that you can manipulate freely. In contrast, when you fetch transactions from the Tangle, you do not want to be able to modify the contents of the object and hence invalidate the transaction.

### Send transaction to the Tangle

```python
# Prepares a set of transfers and creates the bundle, then
# attaches the bundle to the Tangle, and broadcasts and
# stores the transactions.
result = api.send_transfer(transfers=[tx])

print('Transaction sent to the tangle!')
print('https://devnet.thetangle.org/address/%s' % address)
```

Yes, it is this easy!

All you have to do is call `send_transfer` and you can immediately see your transaction by following the link to the [IOTA Tangle Explorer](https://devnet.thetangle.org/).

:::info:
The link takes you to the Devnet Tangle Explorer. Be sure to switch to the Mainnet to see transactions on the real Tangle.
:::

Congratulations, you have sent your first IOTA transaction!