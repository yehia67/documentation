# Command line flags

**In the command to execute the Ict Java file, you can pass the following flags to change the default behavior of a node. For example, you can choose to save log messages to a file.**

**Flag**|**Alias**|**Example**|**Description**
:---|:---|:---|:---
`--config`|`-c`|`--config ict.cfg`|Loads the Ict configuration settings from the file given after the flag
`--config-create`| |`--config-create`|Writes or overwrites the default settings to the Ict configuration file (ict.cfg)
`--config-print`| |`--config-print`|Prints the Ict configuration to stdout and exits
`--debug`|`--verbose`|`--debug`|Sets root log level to 'debug' (default: INFO)
`--log-dir DIR`| |`--log-dir /tmp/`|Writes log messages to an existing directory that's given after the `--log-dir` flag (default: logs/)
`--logfile-enabled`| |`--logfile-enabled`|Enables log messages to be saved to the logs/ict.log file
`--log-file FILE`| |`--log-file ict-log.txt`|Writes log messages to a file that's given after the `--log-file` flag (default: ict.log)
`--trace`|`--verbose2`|`--trace`|Sets root log level to 'trace' (default: INFO)