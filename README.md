Javascript bundler & code-splitter in the browser #microstack

<center><img src="https://github.com/coderofsalvation/load.js/raw/master/loadjs.png"/></center>

## Usage

        <html lang="en">
          <head>
            <script src="load.js"></script>
          </head>
          <body>
            <div id="app"></div>
            <script>
                load([
                    "http://stylus-lang.com/try/stylus.min.js",
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

<img src="https://github.com/coderofsalvation/load.js/raw/master/screenshot.png"/>

The second argument (`/js/bundle.js` hints loadjs that it can be bundled, resulting in 
a tab on the right). 
Loading the html-file without the `?flag` (or running `load.cmd('')`) will load the bundled-version instead of the individual files.

## Install

Just save [load.js](https://raw.githubusercontent.com/coderofsalvation/load.js/master/load.js) to a directory, or run this in the terminal:

    $ wget https://raw.githubusercontent.com/coderofsalvation/load.js/master/load.js

And add `index.html` like shown above

## Extending 

Developers can add tabs to trigger other tools, tests or actions like so:

    load.addButton('my tab', () => alert('run test') )

## Why

The time is ripe for in-browser webdevelopment:

* more control over js includes (load analytics after first meaningful frame etc)
* es6 is supported in current browsers 
* chrome devtools allows serving gitrepositories locally using 'overrides'
* javascript modules work in the browser
* sass-like css syntax can run directly in the browser using [stylus](https://stylus-lang.com) .e.g 
* code-splitting can be achieved using http-vue-loader and similar module-loaders
* npm modules can be included directly in the browser using npm CDN's like unpkg.com
* api responses can be easily mocked or requested remotely

> It goes without saying that this doesn't apply for people who got emotionally or financially attached to their current tools & stacks.

## How to develop locally?

Simple create an Overrides-directory with projects, for example on a chrome book

    hit ctrl-t to start a terminal
    > shell 
    $ cd Downloads
    $ mkdir Overrides
    $ cd Overrides
    $ mkdir myproject.com

> Now add 'Overrides' as the overrides folder, and type `https://myproject.com` and voila..a free IDE editor + it serves the webpage over https!

<img src="https://raw.githubusercontent.com/coderofsalvation/load.js/master/devtools.png"/>
