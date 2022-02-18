# ShapeShop

## api

The ShapeShop constructor accepts 3 arguments.

1. [required] an HTMLElement, in the dom, you wish to capture mouse events on
2. [required] the default `ShapeType` you want ShapeShop to interpret from these events
3. [optional] a callback you want to execute on each mouse event, which is passed a `CanvasUpdate` when invoked.

```ts
const shapeshop = new ShapeShop({
  el: $el,
  defaultShape: ShapeType.Rect,
  onCanvasUpdate: (update) => {
    console.log(update);
  }
});
```

When you are done with shapeshop, call the destroy method to clean up its mouse event listeners

```ts
shapeshop.destroy();
```
