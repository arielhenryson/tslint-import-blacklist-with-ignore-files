# tslint-import-blacklist-with-ignore-files
Custom rule for TSLint to blacklist imports but let you ignore specific files

Check out this blog post about this rule

https://medium.com/ariel.henryson/how-to-prevent-import-of-some-modules-with-tslint-4786c9411cd7


## Install
```bash
npm install --save-dev tslint-import-blacklist-with-ignore-files
```

## Configuration
Update your `tslint.json` config file, adding the new rules directory and the new rule  


### Config Examples
```json
 "import-blacklist-with-ignore-files": [
    true,
    {
        "imports": [
            {
                "name": ["someNPM"],
                "ignore": ["main.ts"]
            },
            {
                "name": ["someOtherNPM"],
                "ignore": ["*.spec.ts"]
             }
        ]
    }
 ]
```
