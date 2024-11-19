# Whiteboard Demo

A simple whiteboard component for rendering shapes.  To enable lower-level operations such as dragging and resizing,
the component uses separate libs, DragManager and ResizeManager, that operate outside the React state flow.
This is mainly due to performance, as React state updates can be slow for high-frequency operations.

## Demo

[See Demo Here](whiteboard-demo.mp4)

