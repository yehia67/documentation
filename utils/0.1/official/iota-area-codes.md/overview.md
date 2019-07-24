# IOTA area codes overview

**IACs are short, tryte-encoded, geo-location codes that can be used to tag and retrieve IOTA transactions related to specific locations.**

IACs are a clone of [Open Location Codes](https://en.wikipedia.org/wiki/Open_Location_Code) (OLC), also known as [Plus Codes](https://plus.codes/), proposed by Google Zurich in 2014. But, IACs include some minor changes to make them compatible with the tryte encoding that's used in IOTA:

|               | OLC                    | IAC                    |
| ------------- | ---------------------- | ---------------------- |
| **Example**   | `9F4MGCH7+R6F`         | `NPHTQORL9XK`          |
| **Alphabet**  | `23456789CFGHJMPQRVWX` | `FGHJKLMNOPQRSTUVXWYZ` |
| **Separator** | `+`                    | `9`                    |
| **Padding**   | `0`                    | `A`                    |

## How it works

IACs are a way of encoding location into a form that is shorter and easier to use than showing coordinates in the usual form of latitude and longitude.

An IAC can be a maximum of 12 trytes long, excluding the 9 separator after the first eight trytes.

An IAC consists of three parts:

- The first four trytes are the area code, describing a region of roughly 100 km x 100 km
- The next six trytes are the local code, describing an area as small as 14 m x 14 m
- The final two trytes are for precision, describing an area as small as 1 m x 1 m

| **IAC length**   | **Approximate area**|
|:--------------|:---------------------|
|2       |2200 km |
|4      | 110 km |
|6          | 5.5 km     |
|8            | 275 m        |
|10  | 14 m              |
|11    |3.5 m |
|12 |Less than 1 m|

## Why use this utility

Transactions on the Tangle can sometimes contain information that's specific to a certain area such as service advertisements or sensor information.

By using IACs, you can tag a transaction with an area and allow someone else to find it by querying for transactions in that area.
