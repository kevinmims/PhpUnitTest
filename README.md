# PhpUnitTest for VS Code

This is an extention that runs PHPUnit tests in the terminal window of VS Code.  
It is a variation on [This Extention]("https://github.com/elonmallin/vscode-phpunit")


## Use


Place your cursor over the function that you want to test.  Then press `F7` to execute the test

## Requirements

- PHPUnit must be installed and accessible

## Extension Settings

```
{
    "phpunittest.execPath": "path/to/phpunit",
    "phpunittest.arguments": [
        "--configuration", "./phpunit.xml.dist"
    ]
}
```
- If phpunit is installed globally, the default `execPath` does not need to be changed


**Enjoy!**