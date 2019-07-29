# IOTA area codes overview

**IOTA area codes (IAC) are a proposed standard for tagging IOTA transactions with a geo-location, which allows you to be filter them by location.**

Transactions on the Tangle can sometimes contain information that's specific to a certain area such as service advertisements or sensor information.

By using IACs, you can tag a transaction with an area and allow someone else to find it by querying for transactions with a similar IAC.

## About IACs

IACs are a clone of [Open Location Codes](https://en.wikipedia.org/wiki/Open_Location_Code) (OLC), which includes some minor changes to make them compatible with [tryte encoding](root://iota-basics/0.1/concepts/trinary.md):

* The numbers and letters that make up a code are called _trytes_, which include the following: `FGHJKLMNOPQRSTUVXWYZ`
* The separator that comes after the eighth tryte in an IAC is a `9` instead of a `+`
* The `A` tryte is used for padding IACs instead of a `0`

## Reading IACs

IACs are a way of encoding locations into a form that is shorter and easier to use than coordinates in the usual form of latitude and longitude.

For example, the latitude and longitude coordinates of the address of the IOTA Foundation are 52.529510, 13.413018. The IAC for these coordinates is : `NPHTQORL9XK`.

Because an IAC consists of trytes, you can easily add them to the `tag` field of a transaction to tag it with a location.

An IAC consists of three parts (excluding the `9` separator):

- The first four trytes are the area code, describing a region of roughly 100 km x 100 km. For example, `NPHT` represents an area that includes Berlin and parts of Potsdam
- The next six trytes are the local code, describing an area as small as 14 m x 14 m
- The final two trytes are for extra precision

| **IAC length (trytes)**   | **Approximate area**|
|:--------------|:---------------------|
|2       |2200 km |
|4      | 110 km |
|6          | 5.5 km     |
|8            | 275 m        |
|10  | 14 m              |
|11    |3.5 m |
|12 |Less than 3 m|

## Further reading

For more information about IACs, [read our blog post](https://blog.iota.org/iota-area-codes-a-proposal-to-geo-tag-iota-transactions-d3c457d1df1b).

