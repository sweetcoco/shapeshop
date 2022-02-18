# ShapeShop React Hook

The hook accepts 3 arguments.

1. [required] a `ref` to the object you wish to capture mouse events on
2. [required] the default `ShapeType` you want ShapeShop to interpret from these events
3. [optional] the memoized callback you want to execute on each mouse event, which is passed a CanvasUpdate when invoked.

Refer to the [example Canvas component](../../example/react-app/src/Canvas.tsx) for an implementation.

Remember that ShapeShop works by giving you shape data back, its up to you to draw it or use it at all.

The [example react-app](../../example/react-app/) has a thorough implementation.
