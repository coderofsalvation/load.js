Javascript bundler & code-splitter in the browser #microstack

<img src="loadjs.png"/>

## Usage

        <html lang="en" manifest="/app.manifest">
          <head>
            <script src="/js/load.js"></script>
          </head>
          <body>
            <div id="app"></div>
            <script>
                load([
                    "/js/stylus.min.js",
                    "https://unpkg.com/vue@2.5.13/dist/vue.min.js",
                    "https://unpkg.com/vue-router@3.0.1/dist/vue-router.js",
                    "https://unpkg.com/http-vue-loader@1.3.4/src/httpVueLoader.js",
                    "https://unpkg.com/photoswipe@4.1.3/dist/default-skin/default-skin.css",
                ],'/js/bundle.js') 
                .then( () => load(["/js/main.js"]) ) 
                .catch( console.error )
            </script>
          </body>
        </html>

> Now loading index.html will work as usual. Loading `index.html?dev`, will trigger the 
bundler (or type `load.cmd('dev')` in the devtools console).

<img src="screenshot.png"/>

The second argument (`/js/bundle.js` hints loadjs that it can be bundled, resulting in 
a tab on the right). 
Loading the html-file without the `?flag` (or running `load.cmd('')`) will load the bundled-version instead of the individual files.

## Extending 

Developers can add tabs to trigger other tools, tests or actions like so:

    load.addButton('my tab', () => alert('run test') )

## Why

It's time to reduce clutter (es6 + devtools with builtin webservers are here).
