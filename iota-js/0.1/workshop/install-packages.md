# Install packages

**The JavaScript client library is organized in packages, which contain related methods. For example, the `converter` package contains methods for converting data to/from trits and trytes.** 

## Prerequisites

To complete this guide, you need a [development environment](../workshop/set-up-a-developer-environment.md).

---

1. Find the name of the package that you want to install

    :::info:
    The JavaScript client library has many packages to choose from. If you aren't sure which one you need, you can [find them all on GitHub](https://github.com/iotaledger/iota.js/tree/next/packages).
    :::


2. In a command-line interface, change into the directory where you initialized your project, and install the packages

    ```bash
    npm install @iota/core @iota/converter --save
    ```

    If everything went well, you should see something like the following in the output. You can ignore any 'npm WARN' messages.

    ```shell
    + @iota/converter@1.0.0-beta.8
    + @iota/core@1.0.0-beta.8
    added 19 packages from 10 contributors and audited 68 packages in 5.307s
    found 0 vulnerabilities
    ```

    You now have a `package.lock.json` file and a `node_modules` directory, which contains the packages and their dependencies.

:::success: Congratulations :tada:
You can now install any packages that you need.
:::

## Next steps

[Generate an address](../workshop/generate-an-address.md).