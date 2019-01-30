# API error messages

**If an API request fails with an error code, you may see one of the following errors. Use this page to resolve errors.**

## Invalid addresses input

Make sure that addresses are valid by searching for them on a [Tangle explorer](https://thetangle.org/search).

Make sure that addresses don't include a checksum (9 extra trytes). Addresses must contain only 81 trytes. If your address contains 90 trytes, remove the last 9 of them.

## Invalid depth input

Make sure that the value of the `depth` parameter is a number (not a string).

Decrement the value of the `depth` parameter. The IRI node may limit the maximum accepted value.

If you're making the request to your own IRI node, check the [`MAX-DEPTH`](../references/iri-configuration-options.md#maxdepth) configuration option.

## Invalid parameters

Check the spelling of the parameters.

Make sure that the parameters are in the correct order.

## COMMAND is not available on this node

Make the request to a different IRI node. The current IRI node has restricted requests to this endpoint.

If you're making the request to your own IRI node, make sure that the command is not listed in the [`REMOTE-LIMIT-API`](../references/iri-configuration-options.md#remote-limit-api) configuration option.

## One of the tips is absent

The IRI node doesn't have the tip transaction in its ledger.

Use a different tip transaction as a parameter, or try making the request to a different IRI node.