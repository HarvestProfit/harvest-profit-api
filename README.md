[![CircleCI](https://circleci.com/gh/HarvestProfit/harvest-profit-api.svg?style=svg&circle-token=73f1c0d9f7795616f84673df728141cc00fb0454)](https://circleci.com/gh/HarvestProfit/harvest-profit-api)
[![codecov](https://codecov.io/gh/HarvestProfit/harvest-profit-api/branch/master/graph/badge.svg)](https://codecov.io/gh/HarvestProfit/harvest-profit-api)


## Installation
You can install this via [NPM](https://www.npmjs.com/):
```bash
npm install harvest-profit-api
```
Or [Yarn](https://yarnpkg.com/en/):
```bash
yarn add harvest-profit-api
```

## Usage

```js static
import Api from 'harvest-profit-api';
```
## Development
While developing, you may find it useful to preview your components. You can do so by running the development server with:
```bash
yarn start
```

To deploy a new version to NPM, bump the version number, commit/merge to `master`, and run the following:
```bash
yarn run clean
yarn run build

# Either NPM
npm publish
# Or Yarn, they do the same thing
yarn publish
```

## License
This project is [MIT licensed](https://github.com/HarvestProfit/harvest-profit-api/blob/master/LICENSE)
