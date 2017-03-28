# PhpUnitTest for VS Code

This is an extention that runs PHPUnit tests in the terminal window of VS Code and is a variation of [this Extention]("https://github.com/elonmallin/vscode-phpunit")


## Get Started

* Install [PHPUnit]("https://phpunit.de/") using composer
    ```
    composer global require "phpunit/phpunit=5.7.17"
    - or -
    composer global require "phpunit/phpunit=6.0.0"
    ```

* Download the PhpUnitTest extention for VS Code and modify the extention configs as needed
    ```
    {
        "phpunittest.execPath": "phpunit",
        "phpunittest.arguments": [
            "--configuration", "./phpunit.xml.dist"
        ]
    }
    ```

* Write a basic unit test

    ```
    <?php

    class BasicTest extends PHPUnit_Framework_TestCase
    {
        public function testOne()
        {
            $one = 1;
            $this->assertTrue($one == 1);
        }
    }
    ```

* Press `F7` to execute all of the tests in the current file
* If you would like to only 1 test, click anywhere on the line where the function is declared and then press `F7`.  This will execute the unit test for that function only.

-----
## Keyboard Shortcuts

- `F7` executes the unit tests
- `alt+F7` executes all of the unit tests in the directory you are in

-----
## License
[MIT License]("https://github.com/kevinmims/PhpUnitTest/blob/master/LICENSE")