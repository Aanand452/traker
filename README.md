


Basic react+redux project.
- Full Webpack pipeline created through [react-create-app](https://github.com/facebookincubator/create-react-app)
- Redux basic config with thunk and [redux devtools](https://github.com/zalmoxisus/redux-devtools-extension) integration
- Basic Master/Detail Routing using [react-router](https://reacttraining.com/react-router)
- Added data mock and example of how to load data async with redux
- Integrated [Salesforce Lightning Design System](https://www.lightningdesignsystem.com) to use as base CSS

### Structure
```
|- server
    |- config
      |- config.js  // Passport configuration for SAML authentication
      |- routes     // Route configuration for the Express application
      ...
    |- app.js       // Entry point for the Express application
|- src
   |- index.js      // Entry point for the app, contains redux store config and initial render
   |- actions/      // Redux action creators, single file for now, distribute in multiple as app scales
   |- reducers/     // Redux reduces, business logic and state management, single file for now, distribute in multiple as app scales
   |- config/     // Global js configuration variables and api url consts.
   |- components/   // Visual UI components, components with no state dependent logic
   |- containers/   // State dependent components
      |- App.js     // Main app container, contains routing
```
* For more check create-react-app [Folder Structure](#folder-structure)

### How to run for localhost testing
1. Install [nodejs LTS](https://nodejs.org/en/download/)
2. Install [yarn](https://yarnpkg.com)
3. run ```yarn start```

---------
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find some information on how to perform common tasks. [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

---------

## External Libraries used

- [glamour](https://www.npmjs.com/package/glamor): Used for having each component styles inside the component file.
- [rc-tooltip](https://www.npmjs.com/package/rc-tooltip): Used for tooltips in the app they were styled lightning like.
- [currency-formatter](https://www.npmjs.com/package/currency-formatter): Used for formatting numbers in the app.
- [react-select](https://www.npmjs.com/package/react-select): Used for dropdown pickers.
- [react-highlight-words](https://www.npmjs.com/package/react-highlight-words): Used for highlighting searched words in the price lists.
- [lodash](https://www.npmjs.com/package/lodash): Used for some specific array processing in the app for a better compatibility among browsers.
