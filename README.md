# aui-ng2

aui-ng2 is a set of angular 2 components, directives and services to simplify the integration with Atlassian products based on AUI/ADG.
The library is still under development and is considered in an experimental state. So be aware that things will change rapidly.

## Installing

```
$ npm install k15t-aui-ng2
```

## Features / supported widgets
* Modal dialogs
* Message dialogs
* Select (supports single and multi selection)
* Tabs
* Tooltip
* Wizard

## Additional libraries which can be used in combination:
* JQuery

## Run demo app

```
$ npm run build
$ npm run start:server
```

Open http://localhost:3000

## License

Licensed under The MIT License (MIT).

## Contributing

To add new components, please see the [AUI documentation](https://docs.atlassian.com/aui/latest/docs/auiselect2.html).

Overall we follow the Google JavaScript Style Guide with the following exceptions:
 * We do not use JSDoc and Google specific annotations for now. Thus, the corresponding sections can be ignored.
 * Because of bugger and better displays we agree to allow a line length of 140 characters.

To enforce the conventions/coding rules we use JSCS which automatically verifies all changed JS-files during the build based on the following rule set:
https://github.com/jscs-dev/node-jscs/blob/master/presets/google.json
