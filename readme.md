[![Build Status](https://app.travis-ci.com/sostenesapollo/ts-node-api.svg?branch=master)](https://app.travis-ci.com/sostenesapollo/ts-node-api)
[![Coverage Status](https://coveralls.io/repos/github/sostenesapollo/ts-node-api/badge.svg)](https://coveralls.io/github/sostenesapollo/ts-node-api)
### Clean node api

##### How to run 
> Up your docker container
```npm run up```

> To watch typescript changes and auto reload inside docker container
```npm run watch```

> To start debug inside vscode
```Just press F5 | Or go to run > start debugging```

> Build flow
1. Create a new branch and make the changes
2. After changes done test all the `unit` and `integration` tests with `npm run test`
3. Create a new tag with the version number
4. Add to package.json the new version number
5. Open a new pull request
6. Merge the pull request
7. Push the new branch to the remote production server `git push p master`