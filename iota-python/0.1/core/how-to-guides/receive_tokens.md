# Receive free testnet tokens

**When testing IOTA, you may want to try sending IOTA tokens from one address to another. On the Mainnet, these tokens have a monetary value that can be traded on exchanges. To send test transactions without risking anything, you can use the Devnet. The Devnet is similar to the Mainnet, except the tokens are free. You can use the Devnet faucet website to receive 1Ki (1000) of free tokens.**

## Prerequisites

Make sure you have the IOTA Python client library ([PyOTA](https://pypi.org/project/PyOTA/)) installed.

:::danger:Important
If you own IOTA tokens on the Mainnet, we recommend creating a new test seed to use on the Devnet.
:::

## Generate a new address

To recieve tokens, you need an address that is generated from your seed.

In this tutorial, we generate a random seed with the library, but feel free to
use your own seed to play around on the Testnet.

:::info:
This seed will be used to prove that you own the address from which you want to withdraw IOTA tokens.

[Learn how a seed is used to prove ownership of an address](root://dev-essentials/0.1/concepts/addresses-and-signatures.md).
:::

```python
from iota import Iota
from iota.crypto.types import Seed
from iota.crypto.addresses import AddressGenerator
from pprint import pprint

# Generate a random seed
my_seed = Seed.random()

# Or use your own 
# my_seed = Seed('PYTHONLIBEXAMPLESEEDPYTHONLIBEXAMPLESEEDPYTHONLIBEXAMPLESEEDPYTHONLIBEXAMPLESEED9')

pprint('Your seed is: ' + my_seed.__str__())

# Declare API
api = Iota(
    adapter='https://nodes.devnet.iota.org:443',
    seed=my_seed,
    testnet=True,
)

# Generate an address from my_seed with default arguments.
# Note that API returns a dictionary with a list of addresses.
my_address = api.get_new_addresses()['addresses'][0]

# Enter this address into the IOTA Devnet Faucet
# (https://faucet.devnet.iota.org/) to receive 1 ki.
pprint('Your generated address is: ' + my_address.__str__())
```
:::warning:
Save your seed and address, because you will need them to receive test tokens and to withdraw from the address in the next tutorial!
:::

## Get some devnet tokens

1. Go to the [IOTA Devnet Faucet](https://faucet.devnet.iota.org/) page.

2. Copy-paste your generated address from the previous state.

3. Complete the captcha and hit `Request`.

4. Click on `Check balance` to monitor the balance of your address on the [Iota Devnet Tangle Explorer](https://devnet.thetangle.org). It might take 1-2 minutes until you receive the funds. Be patient!

## Check balance with library

You may also check if you have received the tokens with the library. We use the `get_account_data` API call to gather information from the Tangle.

:::warning: It is important that you specify your seed from the previous step here, otherwise the code will not run.
:::

```python
from iota import Iota
from iota.crypto.types import Seed
from pprint import pprint

# Put your own seed here from the previous step
my_seed = Seed('<your-seed-here>')

# Declare API
api = Iota(
    adapter='https://nodes.devnet.iota.org:443',
    seed=my_seed,
    testnet=True,
)

# Fetches information from the Tangle based on your seed.
result = api.get_account_data()

# Result contains used addresses, total balance and bundles
# on the Tangle associated to you.
pprint(result)
```

What is happening here eventually is that `get_account_data` starts generating addresses (from `index` 0) from our seed  and checks if those addresses have any transactions on the Tangle. The process stops if a generated address has no transaction associated with it on the Tangle.

Congratulations, you have successfully acquired some testnet tokens!