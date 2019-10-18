# Query the Hub database

**To keep track of user data, Hub stores it in database tables. Some of the data in these tables isn't exposed to the APIs. For example, you may want to find out the seed UUID for an address so that you can recreate the seed. This guide shows you the basics to get started with querying the Hub database tables.**

:::info:
This guide assumes that you installed Hub with a MYSQL database such as MariaDB, which is the one we use in our installation guide.
:::

## Prerequisites

[Create a user who has a deposit address](../how-to-guides/get-started-with-the-grpc-api.md).

---

1. Connect to the MYSQL

    ```sql
    mysql -u root -p
    ```

2. Select the `hub` database

    ```sql
    USE hub
    ```

3. Display a list of all the tables in the database

    ```sql
    SHOW TABLES;
    ```

4. Display information about your users' addresses and their associated seed UUIDs

    ```sql
    SELECT * from user_address;
    ```

    :::info:
    To display data from another table, replace `user_address` with the name of that table.
    :::

    You should see something like the following:

    ```sql
    | id | address | user_id | seed_uuid | created_at | balance |
    +----+---------+---------+-----------+-------------+--------+
    |  1 | RPMENBAM9QOGSCMPIMHLFB9SCCUEUIYM9ODNXYZBUGB9PVZJTSNEZRLJXIPAAJDQTZMJSTDLFUHR9JFSD | 1 | Fnb3MRpr8gacuh1n1CMQQja5Dr53rCqrs4i9kiw0wYysft2d7vzjaPHJRAHjIkPd | 2019-03-28 13:38:48 |       0 |
    |  2 | DAUBDIQEAOMNWYL9OLBQUABXIHVEDWEBFPPZCSVUS9HIKWFUSGHLAULFNFWPFQUHCIFKPRRZVFAGBBFJZ |       2 | TqHIfR0GCIKJPCZ8Q2z6UUQcJi4McGuUjJpkNloDR28cIL7hrMZDtQNAtTqyT2bJ | 2019-04-01 13:39:55 |       0 |
    |  3 | S9OEPEMNSYOZKHPUDWCSH9KJDLDLWHTCNIHBDRTCQHFERTEABJVMRHUX9MIBGCYJINTSAWHVDFFXIIAFA |       2 | N5WrisKpidnvrYSr0aSxtncRr0SH8kUHJfYPEKNZU7DjO2XjL24cxRg6RBTMLpY | 2019-04-01 13:49:43 |       0 |
    +----+--------+---------+-----------------+----------+-------+
    ```

5. Disconnect from MYSQL

    ```sql
    QUIT
    ```

:::info:
To learn about MYSQL and the different commands, [see their website](https://dev.mysql.com/doc/refman/8.0/en/tutorial.html).
::: 


