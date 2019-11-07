# Get started with the Python core library

**The Python core client library includes low-level methods for interacting with the Tangle. You can use this library to use the core IOTA protocol. For example, you can connect to nodes, create bundles, and promote and reattach pending transactions.**

:::warning:Beta software
The client libraries are currently in beta and you should not use them in production environments.
:::

## Audience

This documentation is designed for developers who are familiar with the Python programming language and object-oriented programming concepts. You should also be familiar with basic IOTA concepts such as [address reuse](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse), [bundles, and transactions](root://dev-essentials/0.1/concepts/bundles-and-transactions.md).

## Prerequisites

To use this library, you must have at least Python 2.7. Other officially supported Python versions are 3.5, 3.6 and 3.7.

## Install the library

The IOTA Python client library, or commonly known as PyOTA, is available on [PyPi](https://pypi.org/project/PyOTA/).

### Install library from PyPi

 - Install PyOTA without add-ons:

    ```bash
    pip install pyota
    ```

 - Install PyOTA with extension modules. [Ccurl](https://pypi.org/project/PyOTA-CCurl/) speeds up the library's cryptographic functions, while  [PoW](https://pypi.org/project/PyOTA-PoW/) makes it possible to do local proof-of-work calculations for your transactions.

    ```bash
    pip install pyota[ccurl,pow]
    ```
    
### Install library from source

1. [Create virtualenv](https://realpython.com/blog/python/python-virtual-environments-a-primer/) (recommended, but not required).

2. Clone official repo from [GitHub](https://github.com/iotaledger/iota.py):

    ```bash
    git clone https://github.com/iotaledger/iota.py.git
    ```
    
3. Install from source

    ```bash
    cd iota.py
    pip install -e .
    ```

:::info:
Find the latest version on the [PyPi](https://pypi.org/project/PyOTA/) page or check out the latest release notes on [GitHub](https://github.com/iotaledger/iota.py/releases).
:::

## Get started

After you've downloaded the library, you can connect to a node and request information from it.

```python
# Import `Iota` API class from iota package
from iota import Iota
# Import `pprint` for a nicer output
from pprint import pprint

# Create a new instance of the IOTA API class
# Use the `adapter` field to specify which node to connect to
api = Iota(
  adapter = 'https://nodes.devnet.iota.org:443'
)

# Send a request to a node, receive response
response = api.get_node_info()

pprint(response)
```

## API reference

For a full list of API commands for the Python library, go to the [PyOTA documentation page](https://pyota.readthedocs.io/en/latest/api.html).

PyOTA implements the [core API](../../../../node-software/0.1/iri/references/api-reference.md) to interact with a node, furthermore the [extended API](https://pyota.readthedocs.io/en/latest/api.html#extended-api) that is intended to make your life easier by abstracting away low-level operations. For example, [sending a transfer](https://pyota.readthedocs.io/en/latest/api.html#extended-api) with the extended API is a one line operation. 

You may notice, that API calls in PyOTA are named after the [Python naming convention](https://www.python.org/dev/peps/pep-0008/#naming-conventions). As a result, you may use the following API calls:

### Core API - TODO: add links to pyota docs once it is updated

- [`add_neighbors`](https://github.com/iotaledger/iota.py)
- [`attach_to_tangle`](https://github.com/iotaledger/iota.py)
- [`broadcast_transactions`](https://github.com/iotaledger/iota.py)
- [`check_consistency`](https://github.com/iotaledger/iota.py)
- [`find_transactions`](https://github.com/iotaledger/iota.py)
- [`get_node_api_configuration`](https://github.com/iotaledger/iota.py)
- [`get_balance`](https://github.com/iotaledger/iota.py)
- [`get_inclusion_states`](https://github.com/iotaledger/iota.py)
- [`get_neighbors`](https://github.com/iotaledger/iota.py)
- [`get_node_info`](https://github.com/iotaledger/iota.py)
- [`get_tips`](https://github.com/iotaledger/iota.py)
- [`get_transactions_to_approve`](https://github.com/iotaledger/iota.py)
- [`get_trytes`](https://github.com/iotaledger/iota.py)
- [`interrupt_attaching_to_tangle`](https://github.com/iotaledger/iota.py)
- [`remove_neighbors`](https://github.com/iotaledger/iota.py)
- [`store_transactions`](https://github.com/iotaledger/iota.py)
- [`were_addresses_spent_from`](https://github.com/iotaledger/iota.py)

### Extended API - TODO: add links to pyota docs once it is updated

- [`broadcast_and_store`](https://github.com/iotaledger/iota.py)
- [`broadcast_bundle`](https://github.com/iotaledger/iota.py)
- [`find_transaction_objects`](https://github.com/iotaledger/iota.py)
- [`get_account_data`](https://github.com/iotaledger/iota.py)
- [`get_bundles`](https://github.com/iotaledger/iota.py)
- [`get_inputs`](https://github.com/iotaledger/iota.py)
- [`get_latest_inclusion_states`](https://github.com/iotaledger/iota.py)
- [`get_new_addresses`](https://github.com/iotaledger/iota.py)
- [`get_transaction_objects`](https://github.com/iotaledger/iota.py)
- [`get_transfers`](https://github.com/iotaledger/iota.py)
- [`is_promotable`](https://github.com/iotaledger/iota.py)
- [`is_reattachable`](https://github.com/iotaledger/iota.py)
- [`prepare_transfer`](https://github.com/iotaledger/iota.py)
- [`promote_transaction`](https://github.com/iotaledger/iota.py)
- [`replay_bundle`](https://github.com/iotaledger/iota.py)
- [`send_transfer`](https://github.com/iotaledger/iota.py)
- [`send_trytes`](https://github.com/iotaledger/iota.py)
- [`traverse_bundle`](https://github.com/iotaledger/iota.py)

## Support the project

If the Python library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota.py/issues/new), feature request or a [pull request](https://github.com/iotaledger/iota.py/pulls).  
We have some [basic contribution guidelines](https://github.com/iotaledger/iota.py/blob/master/CONTRIBUTING.rst) to keep our code base stable and consistent.

### Update documentation

If your changes affect the documentation, please update it.

## Join the discussion

Join our [Discord](https://discord.iota.org) to get involved in the community, ask for help, or to discuss the technology.


