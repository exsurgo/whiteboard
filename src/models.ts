import { generateUniqueId } from './utils'

const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = 100
const DEFAULT_X = 100
const DEFAULT_Y = 100

export class Box {
    public readonly id: string

    /** Dirty flag to indicate if the model needs to be saved to the DB. */
    private dirty = false

    constructor(
        public x: number = DEFAULT_X,
        public y: number = DEFAULT_Y,
        public width: number = DEFAULT_WIDTH,
        public height: number = DEFAULT_HEIGHT
    ) {
        this.id = generateUniqueId()
    }

    public setPosition(x: number, y: number) {
        this.assign({ x, y })
    }

    public setSize(width: number, height: number) {
        this.assign({ width, height })
    }

    public assign(data: Partial<Box>) {
        Object.assign(this, data)
        this.dirty = true
    }
}
