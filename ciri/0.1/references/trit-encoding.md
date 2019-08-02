# Trit encoding

**Because IOTA uses [trinary](root://dev-essentials/0.1/concepts/trinary.md)-based computing and our current processors understand only binary, you need to encode trinary data into bytes. The cIRI has five encoding options, which correspond to the number of trits that are stored in one byte. The more trits stored in a byte, the more efficient the storage. However, because trits need to be extracted from a byte before being used by the hashing algorithm, the more trits in a byte, the more processing power is needed.** 

The trit encoding is defined during the build phase, therefore you need to recompile the source code if you want to change the encoding. For example:

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/aarch64--glibc--bleeding-edge-2018.07-1:toolchain --cpu=aarch64 --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```
```bash
bazel run -c opt --define network=mainnet --define trit_encoding=5 -- ciri
```

|**Encoding option**|**Description**|
|:------------------|:--------------|
|1|**Each trit is stored in one byte**. This option reduces the processor usage for hashing.|
|2|**Two trits are stored in one byte**. This option is the default encoding.|
|3|**Three trits are stored in one byte** (one tryte is stored in one byte). This option is useful for debugging purposes and is more efficient than option 1.|
|4|**Four trits are stored in one byte**. This option is more storage efficient than option 3.|
|5|**Five trits are stored in one byte**. This option is the most storage efficient, but requires more calculations for hashing.|