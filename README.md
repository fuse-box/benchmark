# Fusebox benchmark

```
npm install
# Fisrt test
node test1.js
# Second test
node test2.js
```

1200 files to require once

|         |            |
| ------------- |:-------------:| 
| FuseBox      | 0.234s |
| Webpack      | 1.376s |


1000 files to require / 10 times

|         |            |
| ------------- |:-------------:| 
| FuseBox      | 2.257s |
| Webpack      | 13.591s |