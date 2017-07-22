# David L Minard

Website for David L Minard, Audio Engineer and Photographer.

## Development

Heavily dependent on Docker for consistent environemnt and tools.

Install node dependencies (usually a one time operation)

```
docker run --rm -ti -v $(pwd):/app -w /app node npm install
```

Launch a dev instance (starts "browser sync" which lets you live edit/reload files)

```
docker run --rm -ti -v $(pwd):/app -w /app node node_modules/gulp-cli/bin/gulp.js dev
```

## Deployment

This deployment is extremely biased towards my home hosting environment.

```
docker run --rm -ti -v $(pwd):/app -w /app node node_modules/gulp-cli/bin/gulp.js
./build-static.sh
```
