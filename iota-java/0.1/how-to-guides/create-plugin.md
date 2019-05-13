# Create a plugin

**Plugins extend the functionality of an account. All plugins implement the `EventListener` interface and are added to the `EventManager`. As a result, when you create a plugin, you don't need to register a separate `EventListener` with your account.**

## Prerequisites

[Create a new account](../how-to-guides/create-account.md).

## Create a plugin that prints events to the screen

To explain how to create a plugin, this guide helps you to create one that prints events to the screen as they happen.

To create a plugin class you can do one of the following:

* Extend the `AccountPlugin` class
* Implement the `Plugin` interface

### Extend the AccountPlugin class

The easiest way to create a plugin is to create a class that extends the `AccountPlugin` class.

```java
public class TestPlugin extends AccountPlugin {

	@Override
	public void load() throws Exception {
		// Load data that the plugin needs such as reading storage, generating memory intensive resources, etc..
	}

	@Override
	public boolean start() {
		// Start any processes that you want to run continuously

		// Return true if all went well, otherwise false
	return true;
	}

	@Override
	public void shutdown() {
		// Stop any running processes here
	}

	@Override
	public String name() {
	return "AwesomeTestPlugin";
	}

	@AccountEvent
	public void confirmed(EventTransferConfirmed e) {
	    System.out.println("account: " + account.getId());
	    System.out.println("confimed: " + e.getBundle().getBundleHash());
	}

	@AccountEvent
	public void promoted(EventPromotion e) {
	    System.out.println("account: " + account.getId());
	    System.out.println("promoted: " + e.getPromotedBundle());
	}
}
```

### Implement the Plugin interface

If you can't extend a class, or you do not want to, you can implement the `Plugin` interface. This way requires `getter` and `setter` methods for the account object with which the plugin will work.

```java
public class TestPlugin implements Plugin {

	private Account account;

	@Override
	public void setAccount(Account account) {
	this.account = account;
	}

	@Override
	public Account getAccount() {
	return account;
	}

	@Override
	public void load() throws Exception {
		// Load required data for this plugin. Think of reading storage, generating memory intensive resources, etc..
	}

	@Override
	public boolean start() {
		// Start any processes that you want to have running continuously

		// Return true if all went well, otherwise false
	return true;
	}

	@Override
	public void shutdown() {
		// Stop any running processes here
	}

	@Override
	public String name() {
	return "AwesomeTestPlugin";
	}

	@AccountEvent
	public void confirmed(EventTransferConfirmed e) {
	System.out.println("account: " + account.getId());
	System.out.println("confimed: " + e.getBundle().getBundleHash());
	}

	@AccountEvent
	public void promoted(EventPromotion e) {
	System.out.println("account: " + account.getId());
	System.out.println("promoted: " + e.getPromotedBundle());
	}
}
```

## Add the plugin class to your account object

After you've created a plugin class, you can add it to the builder of the account object to start it

```java
Plugin myPlugin = new TestPlugin();
IotaAccount account = new IotaAccount.Builder(SEED)
        .plugin(myPlugin)
        .build();
```

:::success:
When the account loads the plugin, you'll see the following message: `Loaded plugin AwesomeTestPlugin`
:::
