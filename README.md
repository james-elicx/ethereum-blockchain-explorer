# [Ethereum Blockchain Explorer](https://etherexplorer.io)

A modern blockchain explorer, built for the Ethereum network. Search for information about addresses, blocks, and transactions.

A live version is deployed using Cloudflare [Pages](https://pages.cloudflare.com/) at [etherexplorer.io](https://etherexplorer.io), with its blockchain data coming from [Infura](https://infura.io).

## Built With...

- [React](https://reactjs.org)
- [Ethers.js](https://docs.ethers.io/v5)
- [TypeScript](https://www.typescriptlang.org)
- [Sass](https://sass-lang.com)
- [Vite](https://vitejs.dev)
- [Vitest](https://vitest.dev)

## Contributing

To contribute to this project, please fork it and open a pull request to the `dev` branch with your additions.

### Environment Variables

To use a custom Infura project instead of the default Ethers.js one, do the following.

1. Create a `.env.local` file in the root directory of the project.
2. Add the following environment variables to the file:

```
VITE_INFURA_PROJECT_ID=<your infura project id>
```
