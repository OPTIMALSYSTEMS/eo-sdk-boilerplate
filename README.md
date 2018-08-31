# EoSdkBoilerplate

Custom client for @eo-sdk/client library with custom actions, plugins &amp; states.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Generating Plugins, States, Actions, Links and Labels

You can use the `eo generate` (or just `eo g`) command to generate Angular components:
```bash
eo generate plugin my-new-component
eo g plugin my-new-component # using the alias
```

#### Plugins

New plugin component can extend functionality of existing states and components.
There are multiple insert points across the application (component-type.location):
* object-details-tab.favorite
* object-details-tab.inbox
* object-details-tab.notifications
* object-details-tab.object
* object-details-tab.process
* object-details-tab.result
* object-details-tab.version
* inbox-details-tab.inbox
* process-details-tab.process

You can insert plugin into a specific point or multiple points via simple configuration.
Each plugin component requires properties (see EoPlugin): 
* `id` - string representing tab ID | labelKey for translation (eo.custom.plugin.sample)
* `matchType` - regexp to identify insert points (/object-details-tab.*/)

All active plugins are included as EoPlugin in `custom-plugins/custom-plugins.module.ts`.
If you want to disable any plugin, simply remove the plugin component from entryComponents array.

The application can render plugins as TabPanels inside of TabContainers. 

```bash
# to generate TabPanel for each object-details component (/object-details-tab.*/)
eo g plugin plugin-name
```
```bash
# to generate TabPanel for each inbox-details component(regexp: /inbox-details-tab.*/)
eo g plugin plugin-name eo-inbox-details.*
```
```bash
# to generate TabPanel for object-details component only in favorite state (regexp: /object-details-tab.favorite/)
eo g plugin plugin-name object-details-tab.favorite
```

#### States

New states can be created as part of existing application.

Each state component requires properties (see EoLinkPlugin): 
* `id` - string representing state ID | labelKey for translation (eo.custom.state.sample)
* `path` - string representing url (custom/sample)
* `matchType` - regexp to identify specific insert point/points for link (/sidebar-navigation/)

and optional property:
* `queryParams` - object representing query ({debug: true}); to generate link 'custom/sample?debug=true'

All active states are included as Route & EoLink in `custom-states/custom-states.module.ts`.
If you want to disable any state, simply remove the state component from routes and links array.

```bash
# to generate state with specific path
# link in sidebar navigation is automaticaly included
eo g state state-name state-path
```

#### Actions

New actions can extend functionality of existing actions menu.

Each action component requires properties based on interface : 
* SimpleAction
* LinkAction
* ListAction
* ComponentAction
* ExternalComponentAction

and based on action target: 
* DmsObjectTarget
* InboxItemTarget
* ProcessItemTarget
* PreparedItemTarget
* WorkItemTarget
* StoredQueryTarget

All active actions are included as BaseAction in `custom-actions/custom-actions.module.ts`.
If you want to disable any action, simply remove the action component from entryComponents array.

```bash
# to generate action
eo g action action-name
```

#### Links

New link can extend functionality of existing sidebar container.

There are multiple insert points in the application bar:
* sidebar-navigation (navigation menu on the left)
* sidebar-profile (profile menu on the right)

Each link object requires properties (see EoLinkPlugin): 
* `id` - string representing link ID | labelKey for translation (eo.custom.state.sample)
* `path` - string representing url (custom/sample)
* `matchType` - regexp to identify specific insert point/points for link (/sidebar-navigation/)

and optional property:
* `queryParams` - object representing query ({debug: true}); to generate link 'custom/sample?debug=true'

All active links/states are included as EoLinkPlugin in `custom-states/custom-states.module.ts`.
If you want to disable any link, simply remove the reference from links array.

```bash
# to generate custom link (/sidebar-navigation/)
eo g link link-path link-id
```
```bash
# to generate custom link in profile menu (/sidebar-profile/)
eo g link link-path link-id sidebar-profile
```

#### Labels

New labels can extend existing language files inside i18n folder.

Basic version contains multiple language files (`assets/i18n/*.json`):
* en.json (default)
* de.json

Application provides support for international languages. (en, de, ar, es, pt, fr, zh, lv, ru, it, uk, ja, ko, hi, bn)


```bash
# to generate label for specific key/id (eo.custom.state.sample)
eo g label label-key --language translation
```
```bash
# examples
eo g label eo.custom.state.saturday --en Saturday --de Samstag
eo g label eo.custom.state.sunday --en Sunday --de Sonntag --es Domingo
eo g label eo.custom.state.sunday.time --en "Sunday {{time}}" --de "Sonntag {{time}}"
```

**NEW LANGUAGE:** You can add new language via main configuration (`/assets/config/main.json`) and creating specific file inside i18n folder.

Before you add labels/keys to a language file (assets/i18n/*.json) make sure the language file already exists.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build:prod` for a production build.

## Update

Run `npm run update` to update the project to new stable version.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
