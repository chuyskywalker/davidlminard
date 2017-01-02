# David L Minard

To Develop, install all the node modules.

_Hint: I use `docker` so I prepend all of these commands with `docker run --rm -ti -v $(pwd):/app -w /app node`_

```
# Local npm?
npm install
```

Then you can either user browsersync or caddy.

Browsersync:
```
node node_modules/gulp-cli/bin/gulp.js dev
```

Caddy:
(Terminal 1)
````
node node_modules/gulp-cli/bin/gulp.js watch
```

(Terminal 2)
```
# Download caddy - https://caddyserver.com/
./caddy.exe
```

To Deploy:

```
node node_modules/gulp-cli/bin/gulp.js
./build-static.sh
```
