# Send value transaction

**Now that you have some free testnet tokens on your address, it is time to send them to another one. In this tutorial, we will generate a new, unused address and transfer our funds there.**

## Prerequisites

Make sure you have the IOTA Python client library ([PyOTA](https://pypi.org/project/PyOTA/)) installed.

:::danger:Important
If you own IOTA tokens on the Mainnet, we recommend creating a new test seed to use on the Devnet.
:::

:::danger:
Since you are sending tokens to yourself, you need to generate a new address to receive the funds. It is extremely important that you never send funds to an address that you already used for withdrawal. More reading about this topic [here](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse).
:::

## Example code

```python
'''
This example creates a simple transaction with a custom message/tag
500 iota will be transfered to the given address
'''

from iota import Iota
from iota import ProposedTransaction
from iota import Address
from iota import Tag
from iota import TryteString

# Put your seed here from the previous step!
seed = '<your-seed-here>'

# Since we are sending value we need a seed to sign the transaction
api = Iota('https://nodes.devnet.iota.org:443', seed)

# The address to send 500i
receiver_address = api.get_new_addresses(index=10)['addresses'][0]

# Check if the generated address has been used before
is_spent = api.were_addresses_spent_from([receiver_address])['states'][0]

if is_spent:
    print('Address %s has been spent from before!' % receiver_address.__str__() )
else:
    tx = ProposedTransaction(
        address=Address(receiver_address),
        message=TryteString.from_unicode('This transaction should include 2000i!'),
        tag=Tag('VALUETX'),
        value=500
    )

    result = api.send_transfer(transfers=[tx])

    print('Transaction sent to the tangle!')
    print('https://devnet.thetangle.org/address/%s' % receiver_address.__str__())
```

## What is happening here?

### Generate a receiver address

```python
from iota import Iota
from iota import ProposedTransaction
from iota import Address
from iota import Tag
from iota import TryteString

# Put your seed here from the previous step!
seed = '<your-seed-here>'

# Since we are sending value we need a seed to sign the transaction
api = Iota('https://nodes.devnet.iota.org:443', seed)

# The address to send 500i
receiver_address = api.get_new_addresses(index=10, count=1)['addresses'][0]

# Check if the generated address has been used before
is_spent = api.were_addresses_spent_from([receiver_address])['states'][0]
```

To send tokens, you need two things in IOTA:

1. A seed owning funds sitting on address(es). These addresses are called `inputs` since they can be used to finance outgoing transations in a bundle.

2. An address where you would like to send the tokens.

The first one we took care of in the previous [example](root://iota-python/0.1/core/how-to-guides/receive_tokens.md), so we are focusing on the second here.

As we mentioned above, we are sending tokens to ourselves. We need a new receiver address that has not been spent from before. [You should never send funds to an address that was already used for spending!](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse) Let us use the API to generate a new address. We tell the library to generate `count=1` new address with `index=10`.

To be on the safe side, we can check if this address has been spent from before with the `were_addresses_spent_from` API call.

:::info:
If you would like to experiment, complete this tutorial, then re-run this example but explicitly tell the library to use your original `index=0` address for receiving. `were_addresses_spent_from` will stop you from re-using the address in this example.
:::

### Construct transaction

Now we have everything to construct our first value transaction. This phase looks quite similar to sending a zero-value transaction, although there is much more happening behind the curtain.

```python
tx = ProposedTransaction(
    address=Address(receiver_address),
    message=TryteString.from_unicode('This transaction should include 2000i!'),
    tag=Tag('VALUETX'),
    value=500
)
```

The first difference is that we specify the desired amount of tokens to be transferred in the `value` field of the `ProposedTransaction`. A positive value means that we are sending value to the address (a negative value would mean that we are withdrawing tokens from the address).

### Send transfer

```python
result = api.send_transfer(transfers=[tx])

print('Transaction sent to the tangle!')
print('https://devnet.thetangle.org/address/%s' % receiver_address.__str__())
```

Then we pass this transaction to `send_transfer` API call, that does the magic:

- Creates a bundle from our transaction.

     - The bundle balance (sum of transaction values) should be zero, but our transaction is an outgoing one with positive value. So we need to fund this transfer from somewhere. The API will scan the Tangle for possible inputs (addresses with positive balance) belonging to our seed.

     - The library appends transactions funding our outgoing transaction to the bundle. These transaction must be signed with a private key generated from our seed to prove ownership of the tokens.

     - It is quite rare that an input address contains the exact amount needed for funding the outgoing transaction, but it is always the full available amount on that address that is being withdrawn to prevent double spending from the same address. The part that is not needed is transferred by the library to a new unused address. Observe a new outgoing transaction in the bundle to a new address.

- Library signs inputs and finalizes bundle.

- Bundle is attached to the Tangle (Proof-of-Work calculation).

- Bundle is broadcast and stored.

Click on the link from the output to check the balance of the receiver address. Optionally, click on the transaction hash, then on the bundle field to view the full bundle with input and output transactions.

Congratulations, you have sent your first iotas!