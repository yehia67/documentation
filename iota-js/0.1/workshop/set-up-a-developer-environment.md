# Set up a developer environment

**To use the JavaScript client library, you need a development environment, which is a set of programming tools that you need to create a program.**

## Prerequisites

You need a device with a Windows, macOS, or Linux operating system.

---

1. Install the [latest LTS](https://nodejs.org/en/download/) of Node.js

2. Install a code editor

    We recommend [Visual Studio Code](https://code.visualstudio.com/Download), but many more are available.

3. Open a [command-line interface](https://en.wikipedia.org/wiki/Command-line_interface)

    Depending on your operating system, a command-line interface could be [PowerShell in Windows](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6), the [Linux Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) or [Terminal for macOS](https://macpaw.com/how-to/use-terminal-on-mac).

4. Initialize a new project by typing the following in the command-line interface

    ```bash
    npm init
    ```

Now, you have a `package.json` file, which includes the packages and applications your project depends on, information about its unique source control, and specific metadata like the project's name, description, and author. Whenever you install packages, those packages will be added to this file as a dependency.

## Next steps

[Start installing packages](../workshop/install-packages.md).

