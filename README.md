# create ocean dapp [![Styled with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io) [![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md)

## Build dapps with ocean protocol quickly

If something doesn’t work, please [file an issue](https://github.com/snaketh4x0r/create-ocean-dapp/issues)

**Note:You’ll need to have Node>=8.0.0 and NPM>=5.2 or  later version on your local development machine** 

## Quickstart

```
npx create-ocean-dapp mydapp1
cd mydapp1
npm start
npm install
```

This gets a basic react app running on your localhost
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser. The page will reload if you make edits to files in either `./client` or `./server`.

### Development Guide

1. if you are developing on contracts then 
```
cd dapp
npm imstall
```
check package.json for necessary scripts

2. if you are developing a front-end with no smart contract development
```
npm install
npm start
```
check package.json for necessary scripts 

### 🏖 Remote Ocean: Pacific

To make use of all the functionality, you need to connect to an Ocean network.

By default, the client will connect to Ocean components running within [Ocean's Pacific network](https://docs.oceanprotocol.com/concepts/pacific-network/) remotely.

By default, the client uses a burner wallet connected to the correct network automatically. If you choose to use MetaMask, you need to connect to the Pacific network. To do this:

1. select Custom RPC in the network dropdown in MetaMask
2. under New Network, enter `https://pacific.oceanprotocol.com` as the custom RPC URL
3. Hit _Save_, and you’re now connected to Pacific

## Directory structure

```
my-ocean-app
├── README.md
├── scripts
├── package.json
├── .gitignore
└── template
    ├── dapp
    │   ├── README.json
    │   ├── package.json
    │   └── contracts
    │       
    ├── client
    │   ├── README.md
    │   ├── package.json
    │   ├── node_modules
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   └── manifest.json
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── serviceWorker.js
    │       └── setupTests.js
    └── server
        |──  src
        |    |──server.js
        |    |──config.js
        |──  test
        |──  package.json
```

### 🐳 Use with Barge

If you prefer to connect to locally running components instead of remote connections to Ocean's Nile network, you can spin up [`barge`](https://github.com/oceanprotocol/barge) and use a local Spree network:

```bash
git clone git@github.com:oceanprotocol/barge.git
cd barge

# startup with local Spree node
./start_ocean.sh --no-commons
```

Then set [environment variables](#️-environment-variables) to use those local connections.

Finally, you need to copy the generated contract artifacts out of the Docker container. To do this, execute this script in another terminal:

```bash
./scripts/keeper.sh
```

The script will wait for all contracts to be generated in the `keeper-contracts` Docker container, then will copy the artifacts in place.

If you are on macOS, you need to additionally tweak your `/etc/hosts` file so Brizo can connect to Aquarius. This is only required on macOS and is a [known limitation of Docker for Mac](https://docs.docker.com/docker-for-mac/networking/#known-limitations-use-cases-and-workarounds):

```bash
sudo vi /etc/hosts

# add this line, and save
127.0.0.1    aquarius
```

Then use this host for the local Aquarius url in the client config:

```bash
REACT_APP_AQUARIUS_URI="http://aquarius:5000"
```

### ⛵️ Environment Variables

#### Client

The `./client/src/config.ts` file is setup to prioritize environment variables for setting each Ocean component endpoint.

By setting environment variables, you can easily switch between Ocean networks the commons client connects to, without directly modifying `./client/src/config.ts`. This is helpful e.g. for local development so you don't accidentially commit changes to the config file.

For local development, you can use a `.env.local` file. There's an example file with the most common network configurations preconfigured:

```bash
cp client/.env.local.example client/.env.local

# uncomment the config you need
vi client/.env.local
```

#### Server

The server uses its own environment variables too:

```bash
cp server/.env.example server/.env

# edit variables
vi server/.env
```

#### Contract-development

all contracts of protocol are present under dapp subdirectory 
To get started on integrating contracts
```
cd dapp
npm install
truffle compile
truffle migrate
```

#### Feature Switches

Beside configuring the network endpopints, the client allows to activate some features with environment variables in `client/.env.local`:

| Env Variable                           | Feature Description                                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REACT_APP_SHOW_CHANNELS`              | Show the channels feature which shows assets based on a certain tag in a prominent view. This is deeactivated by default and only activated in live Commons deployments. |
| `REACT_APP_SHOW_REQUEST_TOKENS_BUTTON` | Shows a second button on the `/faucet` route to request Ocean Tokens in addition to Ether. Will only work in Ocean testnets.                                             |
| `REACT_APP_ALLOW_PRICING`              | Activate pricing feature. Will show a price input during publish flow, and output prices for each data asset.                                                            |

#### More Settings

| Env Variable                                                          | Example                                | Feature Description                               |
| --------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| client: `REACT_APP_IPFS_GATEWAY_URI`<br /> server: `IPFS_GATEWAY_URI` | `"https://ipfs.oceanprotocol.com"`     | The IPFS gateway URI.                             |
| `REACT_APP_IPFS_NODE_URI`                                             | `"https://ipfs.oceanprotocol.com:443"` | The IPFS node URI used to add files to IPFS.      |
| `REACT_APP_REPORT_EMAIL`                                              | `"jelly@mcjellyfish.com"`              | The email used for the _report an asset_ feature. |

## 👩‍🔬 Testing

Test suite is setup with [Jest](https://jestjs.io) and [react-testing-library](https://github.com/kentcdodds/react-testing-library) for unit testing, and [Cypress](https://www.cypress.io) for integration testing.

To run all linting, unit and integration tests in one go, run:

```bash
npm test
```

The endpoints the integration tests run against are defined by your [Environment Variables](#️-Environment-Variables), and Cypress-specific variables in `cypress.json`.

### Unit Tests

For local development, you can start the test runners for client & server in a watch mode.

```bash
npm run test:watch
```

This will work for daily development but it misses the full interactivity of the test runner. If you need that, you will need to run them in individual terminal sessions:

```bash
cd client/
npm run test:watch

cd server/
npm run test:watch
```

### End-to-End Integration Tests

To run all integration tests in headless mode, run:

```bash
npm run test:e2e
```

This will automatically spin up all required resources to run the integrations tests, and then run them.

You can also use the UI of Cypress to run and inspect the integration tests locally:

```bash
npm run cypress:open
```

## ✨ Code Style

For linting and auto-formatting you can use from the root of the project:

```bash
# auto format all ts & css with eslint & stylelint
npm run lint

# auto format all ts & css with prettier, taking all configs into account
npm run format
```

## 🛳 Production

To create a production build of both, the client and the server, run from the root of the project:

```bash
npm run build
```

Builds the client for production to the `./client/build` folder, and the server into the `./server/dist` folder.

## ⬆️ Releases

From a clean `master` branch you can run any release task doing the following:

- bumps the project version in `package.json`, `client/package.json`, `server/package.json`
- auto-generates and updates the CHANGELOG.md file from commit messages
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

By creating the Git tag with these tasks, Travis will trigger a new Kubernetes live deployment automatically, after a successful tag build.

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)
