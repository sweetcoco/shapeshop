# ShapeShop

A js(ts) library for drawing and generating SVG shapes and freeform paths, using a mouse/finger/stylus. The rendering is left up to you, ShapeShop just gives you the data you need. ShapeShop supports plain old js, React Hooks, and (in the future) exports a React Component for ease of use.

- [ShapeShop Core](packages/core/)
- [ShapeShop Hook](packages/react/)

#

## Developing

### Build the packages

```sh

npm install       # install dev dependencies and symlink packages in root node_modules

npm run build
```

### Run the example

```sh

# run the build steps listed above first.

cd example/react-app

npm install

# annoyingly, you need to go back to the root node_modules and delete react from it, the versions compete in the example react-app

npm start
```
