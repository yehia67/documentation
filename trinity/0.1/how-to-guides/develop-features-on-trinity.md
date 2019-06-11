# Develop features on Trinity

**As well as an application, Trinity is an open-source platform on which you can develop new features.**

To get started with Trinity development, do the following:

1. Install the shared dependencies
2. Install the desktop development environment or the mobile development environment
3. Contribute to the code
4. Submit a pull request

Trinity desktop is written in React and built on Electron, whereas Trinity mobile is written in React Native.

Developers are encouraged to contribute to the [GitHub issues](https://github.com/iotaledger/trinity-wallet/issues).

## Prerequisites

To develop on Trinity, your computer must have the following:
* [An LTS version of Node.js](https://nodejs.org/en/) (we recommend version 10.15.3)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

:::info:
Restart your computer after installing these programs.
:::

## Install the shared dependencies

1. Clone the Trinity repository

    ```bash
    git clone https://github.com/iotaledger/trinity-wallet.git
    ```

2. Change into the `trinity-wallet` directory

    ```bash
    cd trinity-wallet
    ```

3. Install the shared dependencies

    ```bash
    yarn deps:shared
    ```

Now, you can install either the desktop or the mobile development environment.

## Install the desktop development environment

If you're using a Windows or Linux operating system, you need to install some extra build tools or packages.

--------------------
### Linux
```
sudo apt install build-essential libudev-dev libusb-1.0-0 libusb-1.0-0-dev
sudo apt install gcc-4.8 g++-4.8 && export CXX=g++-4.8
```
---
### Fedora
```
yum install build-essential libudev-dev libusb-1.0-0 libusb-1.0-0-dev libusbx-devel gcc-4.8 g++-4.8 && export CXX=g++-4.8
```
---
### Windows Vista and Windows 7
1. [Install the .NET Framework 4.5.1](https://www.microsoft.com/en-us/download/details.aspx?id=4077)

2. Install Visual C++ build tools and Python 2.7

    ```
    npm install --global windows-build-tools
    ```

3. Install OpenSSL VC++ Static 64bit Library

    ```
    git clone https://github.com/Microsoft/vcpkg C:\src\vcpkg
    cd C:\src\vcpkg
    .\bootstrap-vcpkg.bat
    .\vcpkg install openssl:x64-windows-static
    ```
---
### Other Windows versions
1. Install Visual C++ Build Tools and Python 2.7

    ```
    npm install --global windows-build-tools
    ```

2. Install OpenSSL VC++ Static 64bit Library

    ```
    git clone https://github.com/Microsoft/vcpkg C:\src\vcpkg
    cd C:\src\vcpkg
    .\bootstrap-vcpkg.bat
    .\vcpkg install openssl:x64-windows-static
    ```
--------------------

1. Install the desktop dependencies

    ```bash
    npm run deps:desktop
    ```

2. Change into the `desktop` directory

    ```bash  
    cd src/desktop
    ```

3. Build Trinity desktop

    ```bash
    npm run build
    ```

4. Now, you can either compile an executable file, or run Trinity in development mode

* If you want an executable file, compile Trinity

    ```bash
    npm run compile:mac
    ```

    :::info:
    Change `mac` to your operating system: `mac`, `win`, or `linux`.
    :::

    When Trinity is compiled, the executable file and the installation files will be located in the `src/desktop/out/` directory.

* If you want to run Trinity in development mode, start the app

    ```bash
    npm start
    ```

    Trinity will open when the build is ready.

## Install the mobile development environment

1. [Install the React Native dependencies](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-2)

    :::info:
    If you are targeting iOS and are using Xcode 10+, enable the legacy build system.
    :::

2. If you are targeting the iOS operating system, [install CocoaPods](https://cocoapods.org/#install).

3. Install the mobile dependencies
    ```bash
    yarn deps:mobile
    ```

4. Change into the `mobile` directory
    ```bash
    cd src/mobile
    ```

Now, you can run Trinity and the logger.

--------------------
### iOS
1. Install the additional dependencies with CocoaPods

    ```bash
    cd ios && pod install && cd ..
    ```

2. Run Trinity
    ```bash
    yarn ios:dev
    ```

3. Run the logger
    ```bash
    yarn log:ios
    ```
---
### Android
1. Run the application
    ```bash
    yarn android:dev
    ```

2. Run the logger
    ```bash
    yarn log:android
    ```
--------------------

## Contribute to the code

1. Create a new Git branch from the `develop` branch

    ```bash
    git checkout -b feature/my-awesome-new-feature
    ```

:::info:
Use a prefix to name your branches (for example, `feature/my-awesome-new-feature` or `bugfix/something-not-working`).
:::

Make all your changes to this branch.

### Create a new theme

A theme consists of a color scheme used by the UI of the mobile and desktop wallets. All themes are located in separate JavaScript files in the `/src/shared/themes/` directory.

1. In the `themes` directory, create a new JavaScript file and copy the contents of the Classic.js file into it

2. Change the color values to suit your theme and save the file

3. In the `themes.js` file, import your theme and add it to the `themes` constant

4. Go to `src/shared/locales/en/translation.json`, and add the name of your theme to the `themes` object. If you miss this step, the name of your theme will not be correct in Trinity.

### Localize new strings

If you are making a contribution that includes adding or changing text, follow these localization instructions.

1. Import the `translate` higher order component (HOC)
    ```javascript
    import { withNamespaces } from ‘react-i18next’;
    ```

2. Create a `t` constant, and set it to the `props` object
    ```javascript
    const { t } = this.props;
    ```

3. Tell i18next to get the translations for your keys (give the key an appropriate name).
    ```javascript
    <Text>{t(‘helloWorld’)}</Text>
    ```

4. Wrap the component
    ```javascript
    export withNamespaces(‘myContainer’)(MyContainer);
    ```

5. Add the translations for your keys to the translation.json file in the `src/shared/locales/en/` directory
    ```json
    "myContainer":{
        "helloWorld": "Hello world!"
    }
    ```

Your strings will be shown on [Crowdin](https://crowdin.com/project/iota-trinity-wallet) when we merge your pull request into the `develop` branch. The community can contribute to Trinity by translating your strings on Crowdin.

### Submit a pull request

After you've made your changes, create a new pull request on GitHub.

Use your branch as the source branch and use the `develop` branch as the target branch.

## Troubleshooting

You may find some of these issues while running Trinity in development mode.

### Trinity does not start after a version update

1. Sometimes, we update the dependencies and change the configurations. Try to reinstall the dependencies by doing `npm install` in the `trinity-wallet` directory. Then, build the wallet again by doing `npm run build`

2. The development environment does not clear the user configuration files when you switch between different versions of Trinity. If you have run a different version of Trinity before, remove the configuration files, then try and run Trinity again

--------------------
### macOS
```bash
rm -rf ~/Library/Application Support/Electron
```
---
### Windows
```bash
Remove-Item –path %APPDATA%/Electron –recurse
```
---
### Linux
```bash
rm -rf ~/.config/Electron
```
--------------------

### Trinity opens with a blank screen

1. Reload Trinity by pressing **Ctrl**+ **R** (**cmd**+**R** on macOS) while the Developer tools window is open and in focus.

2. Check the Developer tools console for any errors. Try to fix them or report them as an [issue](https://github.com/iotaledger/trinity-wallet/issues) on GitHub.
