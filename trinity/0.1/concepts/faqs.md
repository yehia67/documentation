## FAQs

### Can I make a mistake with Trinity Wallet?

Trinity is engineered to be as simple to use as possible. This means that as long as you keep your account password and seed backup secure, your funds are secure.

However as with any e-currency, you can still send funds to an incorrect address.  Please ensure that the Send address is correct on the Send Confirmation screen. 

>A transaction that is sent cannot be retracted or reimbursed.

### Why is my balance incorrect?

Your account may be out of sync with the Tangle. To fix this, change the node you are connected to, then perform a manual sync. If you have not used your wallet on this device in a long time, you may need to perform a Snapshot Transition. Manual Sync and Snapshot Transition can be found in Account Management/Tools on desktop, and Advanced Settings on mobile. Also note that future developments in IOTA will eliminate the need to perform snapshot transitions.

### Why is my transaction not confirming?

Find your transaction in the History section (main page on Desktop, History tab on Mobile) and click on it. Then hit the “Retry” button. This will help to get your transaction confirmed. You can automate this process by turning on “Auto-promotion” in Settings. 

>Auto-promotion on Mobile is only available when the app is in the foreground.

### I can’t send my IOTA because Trinity stops me. Why is this?

There are different reasons depending on the situation:

For security reasons IOTA addresses should only be used once for sending. If you have funds on an address that has already been spent from, Trinity stops you spending again from that address. This is done to protect your funds. Please get in touch with us on the #help channel in the official IOTA Discord for further help.

If the address you are sending to has been used in the past (i.e. already spent from), Trinity will prevent you sending to that address to protect the funds. In this case, please request a fresh address from your recipient.

If you are making multiple transactions, you may need to wait for your first transaction to be confirmed before making another transaction. Then you should be able to send your second transaction.

### I have lost access to my device! How do I recover my wallet?

Don’t worry, nobody can access your seed or balance without your password. You can access your funds by reinstalling Trinity on another device and using your SeedVault file or other seed backup to retrieve your seed safely.

To restore your wallet, simply select "Yes" when the Wallet Setup asks if you already have a seed. Then enter the seed or import your SeedVault file. Ensure the checksum matches your backup checksum. After choosing a new password, Trinity will automatically restore your account balance.

>For extra protection, please transfer your funds to a new seed at this time.

### Why doesn't Trinity support fingerprint authentication?

Trinity puts the security of your funds above all else. Current limitations in the Android OS pose a tough question for developers. We have to choose between permitting users the convenience of using fingerprints scanners, vs. the risk of offering a less secure wallet. As always, IOTA leans toward security. We are constantly evaluating options to retain maximum security and improve the user experience.

### What are the account and SeedVault password requirements?

There are no mandatory requirements.  To create a strong password, use lower case, upper case, number or special symbols. Trinity uses the zxcvbn library for password strength estimation, which checks the password against:

- Most common passwords
- Common names and popular English words
- Common patterns like dates, repeats (aaa), sequences (abcd), keyboard patterns (qwertyuiop)
- Secure password length - 12 characters

### What is a SeedVault?
A SeedVault is an encrypted file for storing your seed securely. The seed is encrypted behind a password and cannot be accessed without that password. This results in a very safe way to store your seed.

### How do I create a SeedVault?

It is recommended to create a SeedVault when setting up your Trinity wallet. However as the SeedVault file is compatible with the Keepass password manager, you can create and edit SeedVault files without using the Trinity wallet.

To set up a SeedVault file in Keepass, you must:

#### On Mac

1. Create a new database in MacPass.

2. Go to File > Database Settings > Security and change Algorithm to Argon2.

3. Create a new Entry in the database.

4. Clear the Password field because it is not used by Trinity.  You will be asked to set a password at this point. This is the same as the SeedVault password.

5. Give the Entry a name / title. This name will be displayed in the Trinity wallet as the Account Name after importing the SeedVault.

6. Click on Add Field and then click on the word Custom to change its name. Change the name to Seed.

7. In the box below labelled Value, enter your seed (you can copy-paste into this field).

8. Now mark the field as Protected by clicking on the padlock sign next to the value field.

9. Save the file with an appropriate and unique name, eg SeedVault-20180505

10. You can now import the file as a SeedVault file in Trinity.

![video explaining creating a seedvault on Mac](keepass-mac.mp4)

Creating SeedVault on mac

#### On Windows

1. Create a new database in KeePass.

2. Save the file with an appropriate and unique name, for example, <i>SeedVault-20180505</i>

3. You will be asked to set a password at this point. This is the same as the SeedVault password. Make sure it is secure (see requirements in SeedVault FAQ question).

4. Go to ```File > Database Preferences``` and change **Key derivation** to **Argon2** and **Value-parallelismus** to **1** and save

5. Create a new Entry in the database.

6. Give the Entry a title. This name will be displayed in the Trinity wallet as the Account Name after importing the SeedVault.

7. Switch to ``Advanced`` tab and ``Add a new String`` field.

8. Name it Seed, enter your seed in the ``Value`` field and mark ``Enable`` in-memory protection

9. Save the changes

10. You can now import the file as a SeedVault file in Trinity.

![video explaining creating a seedvault on Windows](keepass-win.mp4)

Creating SeedVault on Windows
