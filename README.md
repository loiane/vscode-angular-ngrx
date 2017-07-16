# VS Code Angular ngRx

[![Greenkeeper badge](https://badges.greenkeeper.io/loiane/vscode-angular-ngrx.svg)](https://greenkeeper.io/)

[![Version](http://vsmarketplacebadge.apphb.com/version/loiane.angular-ngrx.svg)](https://marketplace.visualstudio.com/items?itemName=loiane.angular-ngrx)
[![Installs](http://vsmarketplacebadge.apphb.com/installs/loiane.angular-ngrx.svg)](https://marketplace.visualstudio.com/items?itemName=loiane.angular-ngrx)
[![Build Status](https://travis-ci.org/loiane/vscode-angular-ngrx.svg?branch=master)](https://travis-ci.org/loiane/vscode-angular-ngrx)
[![codecov](https://codecov.io/gh/loiane/vscode-angular-ngrx/branch/master/graph/badge.svg)](https://codecov.io/gh/loiane/vscode-angular-ngrx)
[![bitHound Overall Score](https://www.bithound.io/github/loiane/vscode-angular-ngrx/badges/score.svg)](https://www.bithound.io/github/loiane/vscode-angular-ngrx)
[![bitHound Code](https://www.bithound.io/github/loiane/vscode-angular-ngrx/badges/code.svg)](https://www.bithound.io/github/loiane/vscode-angular-ngrx)
[![bitHound Dev Dependencies](https://www.bithound.io/github/loiane/vscode-angular-ngrx/badges/devDependencies.svg)](https://www.bithound.io/github/loiane/vscode-angular-ngrx/master/dependencies/npm)

This extension allows **quickly scaffolding ngRx file templates** (actions, reducers, effects and more) in VS Code Angular project based on @ngrx/platform (v4+).

Snippets based on previous versions of @ngrx/store are also available.

### Sample project

The following project had all ngRx files created with this extension: [link](github.com/loiane/angular-ngrx4-lazy-loading).

The sample project is organized in modules and uses lazy loading to ngrx as well. Based on ngrx/plataform (ngrx v4), which allows lazy loading of ngrx functionalities.

## Features

You can find the following options been added to the context menu:

Menu Options  |
---           | 
New ngrx app/store module|
New ngrx feature/store module| 

### Generate app/store directory + files 

Right click on `app` folder in your current project to generate the `app-store.module`.
This command will generate the following files:

* `actions-creator.ts`
* `app-state.ts`
* `app-store.module.ts`
* `store.service.ts`
* `util.ts`

This extension creates a `app-store.module` with util files and also a module to manage the app state for the root level. This module needs to be imported in the `app.module` and all setup is completed!

### Generate app/feature-module/store directory + files 

Right click on `app/feature-module` folder in your current project to generate the `feature-store.module`. You will be prompted to enter the feature name.
This command will generate the following files:

* `feature-store.module.ts`
* `feature-store.service.ts`
* `feature.actions.ts`
* `feature.effects.ts`
* `feature.reducer.ts`
* `feature.state.ts`

This extension creates a `feature-store.module` with actions, reducer file, feature-state, effects. The module contains the required setup for ngrx for a feature-module (lazy loaded). A `feature-store.service` is also created to organize `store.select` and `store.displach` logic (the service can be injected into a component to retrieve and dispatch the actions as needed). RxJS is used for selecting the state instead of `reselect`. Sample code for CRUD operations already included. Just needs to be imported in your `feature.module`. 

## Snippets - Usage

Create a new typescript file and type `ngrx-` to see the snippets available. Press `enter`, and the snippet unfolds.

### ngRx Actions Snippets
Trigger | Description
--- | ---
ngrx-action-file| Accordion
ngrx-action-class | Accordion
ngrx-action-type | Accordion
ngrx-action-function  | Accordion
ngrx-action-factory| Accordion

### ngRx Reducer Snippets
Trigger | Description
--- | ---
ngrx-reducer-file| Accordion
ngrx-reducer-feature-file | Accordion
ngrx-reducer-case | Accordion

### ngRx Selector Snippets
Trigger | Description
--- | ---
ngrx-selector-file| Accordion
ngrx-selector | Accordion

### ngRx Effects Snippets
Trigger | Description
--- | ---
ngrx-effects-file| Accordion
ngrx-effect | Accordion

### ngRx State Snippets
Trigger | Description
--- | ---
ngrx-state-app| Accordion
ngrx-state-feature| Accordion

### ngRx Setup
Trigger | Description
--- | ---
ngrx-setup-store-root| Accordion
ngrx-setup-store-feature| Accordion
ngrx-setup-effects-root| Accordion
ngrx-setup-effects-feature| Accordion
ngrx-setup-devtools| Accordion

### ngRx Other Files
Trigger | Description
--- | ---
ngrx-util| Accordion
ngrx-store-service| Accordion

## Installation

1. Install Visual Studio Code 1.5.0 or higher
2. Launch Code
3. From the command palette `Ctrl`-`Shift`-`P` (Windows, Linux) or `Cmd`-`Shift`-`P` (OSX)
4. Select `Install Extension`
5. Type `angular ngrx` and press enter
6. Reload Visual Studio Code

## Release Notes

See the [CHANGELOG](CHANGELOG.md) for the latest changes.

## Disclaimer

**Important:** This extension due to the nature of it's purpose will create
files on your hard drive and if necessary create the respective folder structure.
While it should not override any files during this process, I'm not giving any guarantees
or take any responsibility in case of lost data. 
Always use version control!

## License

MIT

**Enjoy!**