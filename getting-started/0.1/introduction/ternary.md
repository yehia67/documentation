# Ternary

**In IOTA, data is represented according to the [ternary numeral system](https://en.wikipedia.org/wiki/Ternary_numeral_system), which consists of trits and trytes. Compared to [binary](https://en.wikipedia.org/wiki/Binary_number), ternary computing is considered to be more efficient as it can represent data in three states rather then just two.**

In IOTA, data is represented in balanced ternary, which consists of 1, 0, or -1. These values are called trits, and three of them are equal to one tryte, which can have 27 (3<sup>3</sup>) possible values.

## Tryte encoding

To make trytes easier to read, they are represented as one of 27 possible tryte-encoded characters, which consist of only the number 9 and the uppercase letters A-Z.

|**Tryte-encoded character**| **Trits**| **Decimal number**|
|:----------------------|:-----|:--------------|
|                                  9|  0,  0,  0 |     0|
|                                  A|  1,  0,  0 |     1|
|                                  B| -1,  1,  0 |     2|
|                                  C|  0,  1,  0 |     3|
|                                  D|  1,  1,  0 |     4|
|                                  E| -1, -1,  1 |     5|
|                                  F|  0, -1,  1 |     6|
|                                  G|  1, -1,  1 |     7|
|                                  H| -1,  0,  1 |     8|
|                                  I|  0,  0,  1 |     9|
|                                  J|  1,  0,  1 |    10|
|                                  K| -1,  1,  1 |    11|
|                                  L|  0,  1,  1 |    12|
|                                  M|  1,  1,  1 |    13|
|                                  N| -1, -1, -1 |   -13|
|                                  O|  0, -1, -1 |   -12|
|                                  P|  1, -1, -1 |   -11|
|                                  Q| -1,  0, -1 |   -10|
|                                  R|  0,  0, -1 |    -9|
|                                  S|  1,  0, -1 |    -8|
|                                  T| -1,  1, -1 |    -7|
|                                  U|  0,  1, -1 |    -6|
|                                  V|  1,  1, -1 |    -5|
|                                  W| -1, -1,  0 |    -4|
|                                  X|  0, -1,  0 |    -3|
|                                  Y|  1, -1,  0 |    -2|
|                                  Z| -1,  0,  0 |    -1|

## Utilities

You can use the following IOTA Tangle Utilities with ternary data:

- [Convert data to/from trytes](https://utils.iota.org/text-conversion)

- [Compress trytes for storage](https://utils.iota.org/compress)

## Related guides

[Convert data to/from trytes in JavaScript](root://client-libraries/0.1/how-to-guides/js/convert-data-to-trytes.md)