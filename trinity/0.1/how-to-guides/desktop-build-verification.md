# Verifying your Trinity Desktop download

There are a few ways to verify the authenticity and integrity of your Trinity Desktop download. This helps you ensure that your copy of the app is the same as the one that was uploaded to GitHub by the IOTA Foundation.


## Windows
Verify the SHA256 hash:
1. Open Command Prompt
2. Run `certUtil -hashfile path\to\trinity-desktop-version.exe SHA256` (for example, if the `exe` for Trinity 0.3.2 is in `C:\Users\yourname\Downloads`, run `certUtil -hashfile C:\Users\yourname\Downloads\trinity-desktop-0.3.2.exe SHA256`)
  1. Verify that the hash in the [release notes](https://github.com/iotaledger/trinity-wallet/releases) matches the output of the command

Verify the code signature:
1. Right-click on `trinity-desktop-version.exe`
2. Click the "Digital Signatures" tab, then click "Details", then click "View Certificate"
  1. In the "Certification Path" tab, ensure that the the following information matches the path:
    1. DigiCert
    2. DigiCert SHA2 Assured Code Signing CA
    3. IOTA Stiftung
  2. Ensure that "Certificate status" says "This certificate is OK."


## macOS
Verify the SHA256 hash:
1. Open Terminal (in `/Applications/Utilities/Terminal`)
2. Run `shasum -a 256 /path/to/trinity-desktop-version.dmg` (for example, if the `dmg` for Trinity 0.3.2 is in `~/Downloads`, run `shasum -a 256 ~/Downloads/trinity-desktop-0.3.2.dmg`)
  1. Verify that the hash in the [release notes](https://github.com/iotaledger/trinity-wallet/releases) matches the output of the command

Verify the code signature (requires [Xcode Command Line Tools](https://www.ics.uci.edu/~pattis/common/handouts/macmingweclipse/allexperimental/macxcodecommandlinetools.html)):
1. Open Terminal (in `/Applications/Utilities/Terminal`)
2. Run `codesign -d -vv /path/to/Trinity.app` (for example, if Trinity is in `/Applications`, run `codesign -d -vv /Applications/Trinity.app`)
  1. Verify that the following information below matches the output of the command
    1. `Identifier=org.iota.trinity`
    2. `Authority=Developer ID Application: IOTA Stiftung (UG77RJKZHH)`
    3. `Authority=Developer ID Certification Authority`
    4. `Authority=Apple Root CA`
3. Run `spctl -a -vv path/to/Trinity.app`  (for example, if Trinity is in `/Applications`, run `spctl -a -vv /Applications/Trinity.app`)
  1.  Verify that the following information below matches the output of the command (assuming Trinity is in `/Applications`)
    1. `/Applications/Trinity.app: accepted`
    2. `source=Developer ID`
    3. `origin=Developer ID Application: IOTA Stiftung (UG77RJKZHH)`
    
    
## Linux
Verify the SHA256 hash (requires `sha256sum`, which is included with most distros):
1. Open Terminal
2. Run `sha256sum path/to/trinity-desktop-version.AppImage` (for example, if the `AppImage` for Trinity 0.3.2 is in `~/Downloads`, run `sha256sum ~/Downloads/trinity-desktop-0.3.2.AppImage`)
  1. Verify that the hash in the [release notes](https://github.com/iotaledger/trinity-wallet/releases) matches the output of the command
  
Verify the code signature:
1. Download the `asc` and `gpg` files listed in the "Assets" section of the  [release notes](https://github.com/iotaledger/trinity-wallet/releases)
2. Run `gpg --import path/to/gpgfile` (for example, if the `gpg` file is in `~/Downloads`, run `gpg --import ~/Downloads/iota.foundation.subkey.trinity.public.gpg`)
  1. Verify that the following information below matches the output of the command
    1. `gpg: key 46A440CCE5664A64: public key "IOTA Foundation (IOTA Foundation Identity) <contact@iota.org>"`
3. Run `gpg --verify path/to/trinity-desktop-version.AppImage.asc path/to/trinity-desktop-version.AppImage` (for example, if the `asc` and `AppImage` for Trinity 0.3.2 are both in `~/Downloads`, run `gpg --verify ~/Downloads/trinity-desktop-0.3.2.AppImage.asc ~/Downloads/trinity-desktop-0.3.2.AppImage`)
  1. Verify that the information below matches the output of the command:
    1. `gpg: Good signature from "IOTA Foundation (IOTA Foundation Identity) <contact@iota.org>"`
    
