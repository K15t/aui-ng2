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
$ npm run start:server
```

If the server is up and running, you can access the examples under [http://localhost:3000](http://localhost:3000) in your browser.


## License

Licensed under The MIT License (MIT).
