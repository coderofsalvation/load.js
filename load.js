(function(){
    window.load = function load(files, filename) {

        window.require = function(url, type, dev) {
            return new Promise(function(resolve, reject) {
                //url = !dev || url.match(/\?/) || url.match(/^http/) ? url : url+"?"+(new Date()).getTime()
                type = url.match(/css$/) ? 'css' : 'js'
                var tag = document.createElement(type == 'js' ? 'script' : 'link');
                if (type == 'css')
                    tag.rel = "stylesheet"
                tag[type == 'js' ? 'src' : 'href'] = url;
                tag.addEventListener('load', function() {
                    resolve(tag);
                }, false);
                tag.addEventListener('error', function() {
                    reject(tag);
                    console.log('require(' + url + ') failed')
                }, false);
                document.body.appendChild(tag);
            }
            )
        }
        window.bundle = function bundle(files, filename){
             var saveFile = (content) => {
                var contentType = 'application/octet-stream';
                var a = document.createElement('a');
                var blob = new Blob([content], {'type':contentType});
                a.href = window.URL.createObjectURL(blob);
                a.download = filename.replace(/.*\//gi, '');
                a.click()    
            }
            var css2js = (cssContent) => `document.querySelector('head').innerHTML += "<style type='text/css'>${cssContent.replace(/[\n|\r]/g, " ").replace(/"/g, '\\"')}</style>"`
            var p = files.map( (f) => fetch(f).then( (r) => r.text() )
                                                  .then( (code) => f.match(/\.css$/) ? css2js(code) : code ) )
            Promise.all( p )
            .then( (data) => {
                var text = data.join("\n")
                saveFile(text)
            })
        }
        window.load.addButton = (title,cb) => {
                var css = `
                .loadjs a {
                    text-decoration: none;
                    color: #AAA;
                    font-weight: 200;
                    background-color: #FFF;
                    border: 1px solid #CCC;
                    padding: 10px;
                    font-size: 10px;
                    border-radius: 5px;
                    margin-right: 5px;
                    display:inline-block;
                    height:40px;
                }
                .loadjs{
                    font-family: sans-serif;
                    padding: 0px 10px 10px 0px;
                    color: #AAA;
                    font-weight: bold;
                    z-index: 1800;
                    position: fixed;
                    text-align: right;
                    top: 10%;
                    right: 0px;
                    width: 100%;
                    transition: all 0.3s ease;
                    transform: rotate(-90deg);
                    transform-origin: center right;
                }
                .loadjs:hover{
                    right:15px;                   
                }
                .loadjs a:hover{
                    color:#888;
                    border-color:#888;
                }
                `      
                var menu = document.querySelector('.loadjs')
                if(!menu) document.body.innerHTML += `<div class='loadjs'></div><style>${css}</style>`
                menu = document.querySelector('.loadjs')
                menu.innerHTML += `<a href="#">${title}</a>`
                var a = menu.querySelectorAll('a:last-child')[0]
                a.onclick = cb        
        }

        function initMenu(files,filename){
                window.load.addButton(filename,function(files,filename){ 
                        window.bundle(files,filename) 
                }.bind(this,files,filename))
        }

        var cmd = String(document.location.search).substr(1) || window.localStorage.getItem("loadjs.cmd")
        window.load[cmd] = true // set flag for easy conditionals in application
      
        return new Promise( 
            function(files, filename, resolve, reject){
                var getFiles = (r,rj) => Promise.all( files.map( (f) => require(f,false,cmd == '?dev') ) ).then(r).catch(rj)
                if( filename ){
                        if( cmd == 'dev' ){
                                initMenu(files,filename)
                                return getFiles(resolve,reject)
                        }
                        require(filename,false,cmd == 'dev')
                        .then( resolve )
                        .catch( reject )                                                
                }else getFiles(resolve,reject)
            }.bind(this,files, filename)
        )
    }
    window.load.cmd = (cmd) => window.localStorage.setItem("loadjs.cmd",cmd)

})()
