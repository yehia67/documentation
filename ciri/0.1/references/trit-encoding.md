# Trit encoding

cIRI has different options for trit encoding. This document covers what each trit encoding means.
cIRI takes the trit encoding as value from 1 to 5. The trit encoding is defined for the build phase.
Some examples:

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/aarch64--glibc--bleeding-edge-2018.07-1:toolchain --cpu=aarch64 --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```
```bash
bazel run -c opt --define trit_encoding=5 -- ciri
```

#### 1 : Simple trit encoding

With option 1, each trit is stored in one byte. 

#### 2 : 

#### 3 : 