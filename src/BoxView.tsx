import { useState } from 'react'
import { css, getRandomColor } from './utils'
import { Box } from './models'

export interface BoxProps {
    box: Box
}

const classes = css({
    box: {
        position: 'absolute',
        backgroundColor: '#ecac57'
    },
    resizer: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        cursor: 'se-resize',
        backgroundColor: '#333'
    }
})

export function BoxView({ box }: BoxProps) {
    const [color] = useState<string>(getRandomColor())

    // Get the initial size/position
    const { x, y, width, height } = box

    return (
        <div
            data-id={box.id}
            data-draggable={true}
            className={classes.box}
            style={{ backgroundColor: color, width, height, top: y, left: x }}
        >
            <div data-resizable={true} className={classes.resizer}></div>
        </div>
    )
}
