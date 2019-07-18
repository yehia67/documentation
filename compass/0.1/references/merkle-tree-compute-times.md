# Merkle tree computation times

**To give you an idea of how long it takes to compute a Merkle tree, we tested it on an instance of a virtual private server on Amazon Web Services with the following specifications: [T2.Xlarge](https://aws.amazon.com/ec2/instance-types/)**

|**Merkle tree depth**|**Number of private key/address pairs**|**Computation time (minutes)**|**Network uptime\***|
|:--------|:----------------------|:------------------------------|:----------|
|14|16,384|3.75|11 days 9 hours|
|15|32,768|7.5|22 days 18 hours|
|16|65,536|15|45 days 12 hours|
|17|131,072|30|91 days|
|18|262,144|60|182 days 1 hours|
|19|524,288|120|364 days 2 hours|
|20|1,048,576|240|1 year 363 days 4 hours|
|21|2,097,152|480|3 years 361 days 8 hours|
|22|4,194,304|960|7 years 357 days 17 hours|
|23|8,388,608|1,920|15 years 350 days 10 hours|

* With 60-second milestone intervals
