# ShapeShop

A js library for drawing and generating SVG shapes and freeform paths, using a mouse/finger/stylus. The rendering is left up to you, ShapeShop just gives you the data you need. ShapeShop supports plain old js, React Hooks, and (in the future) exports a React Component for ease of use.

#

## Developing

### Build the packages

```sh

npm install       # install dev dependencies and symlink packages in root node_modules

npm run build
```

### Run the example

```sh
cd example/react-app

npm install

npm start
```

You may need to delete node_modules and re-install in the example/react-app if the package changes aren't getting picked up. Otherwise a simple stop and start of the react-app dev server should pick up any changes.
