# Listen to events in an account

**When an account is started with an `EventListener` object, that object emits events when they happen. An example of an event is when you send a bundle to a node. You can listen for these events and act on them by creating an instance of a listener.**

## Prerequisites

[Create an account](..how-to-guides/create-an-account.md).

---

1. Create a class that listens to account events

    ```java
	private class AccountListener implements EventListener {
        private IotaAccount account;

        public AccountListener(IotaAccount account) {
            this.account = account;
        }
        
        @AccountEvent
        public void confirmed(EventTransferConfirmed e) {
            System.out.println("account: " + account.getId());
            System.out.println("confirmed: " + e.getBundle().getBundleHash());
        }
        
        @AccountEvent
        public void promoted(EventPromotion e) {
            System.out.println("account: " + account.getId());
            System.out.println("promoted: " + e.getPromotedBundle());
        }
        
        @AccountEvent
        public void reattach(EventReattachment e) {
            System.out.println("account: " + account.getId());
            System.out.println("reattach: " + e.getNewBundle());
        }
        
        @AccountEvent
        public void sent(EventSentTransfer e) {
            System.out.println("account: " + account.getId());
            System.out.println("sent transfer: " + e.getBundle().getBundleHash());
        }
        
        @AccountEvent
        public void received(EventReceivedMessage e) {
            System.out.println("account: " + account.getId());
            System.out.println("message: " + e.getMessage());
        }
        
        @AccountEvent
        public void input(EventNewInput e) {
            System.out.println("account: " + account.getId());
            System.out.println("newInput: " + e.getAddress());
        }
    }

2. Register the `AccountListener` object with your account

    ```java
	account.getEventManager().registerListener(new AccountListener(account));
    ```

:::success:Congratulations :tada:
You're account is now emitting events that you can listen to and act on.
:::

## Next steps

[Create a plugin that listens to events](../how-to-guides/create-plugin.md).