import { useEffect } from 'react'
import { css } from './utils'
import { DragManager } from './drag-manager'
import { ResizeManager } from './resize-manager'
import { BoxView } from './BoxView'
import { useBoxes } from './controller'

const classes = css({
    app: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    header: {
        fontSize: 24,
        paddingLeft: 10,
        color: '#fff',
        backgroundColor: '#083e8f',
        display: 'flex',
        justifyContent: 'space-between',
        '& h1': {
            fontSize: 28
        },
        '& button': {
            width: 200
        }
    },
    main: {
        position: 'relative'
    }
})

/**
 * The main whiteboard component for rendering shapes.   To enable lower-level operations such as dragging and resizing,
 * the component uses separate libs, DragManager and ResizeManager, that operate outside the React state flow.
 * This is mainly due to performance, as React state updates can be slow for high-frequency operations.
 */
export function Whiteboard() {
    const { boxes, addBox, getBox } = useBoxes()

    useEffect(() => {
        const dragManager = new DragManager(onDragChange)
        const resizeManager = new ResizeManager(onResizeChange)
        return () => {
            dragManager.destroy()
            resizeManager.destroy()
        }
    }, [])

    function onDragChange(id: string, x: number, y: number) {
        const box = getBox(id)
        box?.setPosition(x, y)
    }

    function onResizeChange(id: string, width: number, height: number) {
        const box = getBox(id)
        box?.setSize(width, height)
    }

    return (
        <div className={classes.app}>
            <header className={classes.header}>
                <h1>Whiteboard</h1>
                <button onClick={addBox}>Add Box</button>
            </header>
            <main className={classes.main}>
                {boxes.map(box => {
                    return <BoxView key={box.id} box={box} />
                })}
            </main>
        </div>
    )
}
