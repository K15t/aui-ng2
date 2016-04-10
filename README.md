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

## Additional libraries which cloud be used:
* [JQuery](https://jquery.com) - jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal 
  and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. 
  The library is required to for using AJS. Outside that scope, **it is highly recommended to use the Angular APIs interact with the dom**!  
  
* [AJS](https://docs.atlassian.com/aui/latest/docs/auiselect2.html) - JavaScript library from Atlassian for using AUI components.

## Run the demo app
The demo shows the different widgets in action based on several code examples. 

```
$ npm run build
$ npm run demo
```

If the server is up and running, you can access the examples under [http://localhost:3000](http://localhost:3000) in your browser.

## How to use it in your application
Besides the aui-ng2 dependency as part of your package.json, the following resources needs to be added on your start page as well

```
    <link rel="stylesheet" type="text/css" href="//aui-cdn.atlassian.com/aui-adg/5.9.15/css/aui.css"/>
    <link rel="stylesheet" type="text/css" href="//aui-cdn.atlassian.com/aui-adg/5.9.15/css/aui-experimental.css"/>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    ...
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="//aui-cdn.atlassian.com/aui-adg/5.9.15/js/aui.js"></script>
    <script src="//aui-cdn.atlassian.com/aui-adg/5.9.15/js/aui-experimental.js"></script>   
```

For an detailed example, please see the demo app.

## Contribute to this project
If you like to contribute on this project, request a new feature or you find a bug please see [CONTRIBUTING.md](https://github.com/K15t/aui-ng2/blob/master/CONTRIBUTING.md)
for further details.

## License

Licensed under The MIT License (MIT).
