# tslint-import-blacklist-with-ignore-files

Custom rule for TSLint to blacklist imports but let you ignore specific files
## Install
```bash
npm install --save-dev tslint-import-blacklist-with-ignore-files
```

## Configuration
Update your `tslint.json` config file, adding the new rules directory and the new rule  


### Config Examples
At least one line:

```json
"import-blacklist-with-ignore-files": [
  true,
  {
    "imports": ["xxx"],
    "ignore": ["somefile.ts"]
  }
]
```
