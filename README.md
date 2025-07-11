# phone-store

A simulated app of a phone store. Powered by "prueba-tecnica-api-tienda-moviles" API and [Material UI React component library](https://mui.com/). Implemented in React.js

See it in action in [the project's Github pages](https://giomikee.github.io/phone-store/)

**Note:** Due to Github pages limitation, deeplinks other than the home page (https://giomikee.github.io/phone-store/) will not work for now.

## Getting started

This project requires **node 18** to run. If `nvm` is installed locally, simply run `nvm use` within the project and it will automatically set the node version to 18 as due to the configuration in this project.

Install project dependencies

```bash
npm install
```

To run the app locally, run this command
```bash
npm run dev
```

Run the test locally with:
```bash
npm run test
## Or in watch mode, `npm run test:watch`
```

See the test coverage with:
```bash
npm run test:coverage
```

Validate lint checks with:
```bash
npm run lint:validate
```

If any errors are detected, we can try autofixing them with:
```bash
npm run lint
```

These commands and also including the build are executed as well on pre-push, and in the project's CI on each push and pull request created.

## Technical structure

### [.env](https://github.com/giomikee/phone-store/blob/main/.env)

Environment variables which can have different values depending on the environment of the application. Also contains what can be considered sensitive information like tokens or API URLs.

### [Services](https://github.com/giomikee/phone-store/tree/main/src/services)

Logic that calls the APIs are isolated in the services. [Check them out here](https://github.com/giomikee/phone-store/tree/main/src/services)

### [Stores](https://github.com/giomikee/phone-store/tree/main/src/state)

Data retreived from APIs are saved in the app's stores to reduce calling the APIs within the same session. Furthermore, the stores provide actions to manipulate the stored data according to different use cases [Check them out here](https://github.com/giomikee/phone-store/tree/main/src/state)

### [Utils](https://github.com/giomikee/phone-store/tree/main/src/utils)

Logic that can be shared as much as possible are extracted into utils so that a single source of truth can be achieved whenever possible. Some of these utils include formatting price, getting total price, and efficiently URLs with query params. [Check them out here](https://github.com/giomikee/phone-store/tree/main/src/utils)

### Custom hooks

Custom hooks are also an efficient way of allowing logic to be shared across different components. They are also useful to keep components as lean as possible. This allowed the components to reduce themselves to mostly template code and isolate the logic that they need in individual custom hooks. Their files start with `use*` the project.

### Components

Components were also shared whenever possible for reusability. To allow this, they had to be mostly stateless which means they needed to be controlled via props, events, or slots to adapt them according to different use cases. Some of the shared components are:

- [NavBar](https://github.com/giomikee/phone-store/tree/main/src/components/NavBar)
- [NavButton](https://github.com/giomikee/phone-store/tree/main/src/components/NavButton)
- [PhoneChips](https://github.com/giomikee/phone-store/tree/main/src/components/PhoneChips)

Apart from reusability, features were also split into smaller components in order to keep each one as lean as possible.

### [Constants](https://github.com/giomikee/phone-store/tree/main/src/constants)

Static values that are repeated multiple times in the application are stored in constants in the [constants folder](https://github.com/giomikee/phone-store/tree/main/src/constants) for the commonly shared constants, or in `*.const.ts` files. They allow reusability of constant values across the application.

### [Interfaces](https://github.com/giomikee/phone-store/tree/main/src/interfaces)

Interfaces and types have been defined in order to ensure that the entire application is type safe. This means that we can detect possible errors in the application in build time, which will result in better appliction quality in runtime/production. They are stored in [the interfaces folder](https://github.com/giomikee/phone-store/tree/main/src/interfaces) for the commonly shared interfaces, or in `*interfaces.ts` files.
