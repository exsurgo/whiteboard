import { useState } from 'react'
import { Box } from './models'

/** Custom hook to manage the state of boxes. */
export function useBoxes() {
    const [boxes, setBoxes] = useState<Box[]>([])

    /** Adds a new box to the state. */
    function addBox() {
        setBoxes([...boxes, new Box()])
    }

    /** Returns a box by its ID. */
    function getBox(id: string): Box | undefined {
        return boxes.find(b => b.id === id)
    }

    return {
        boxes,
        addBox,
        getBox
    }
}
