export type OnResizeChange = (id: string, width: number, height: number) => void

const RESIZE_ZINDEX = '9999999'

/** Handles low-level resize operations outside the React state flow. */
export class ResizeManager {
    private isResizing = false
    private startX = 0
    private startY = 0
    private startWidth = 0
    private startHeight = 0
    private element: HTMLElement | null = null

    constructor(public callback: OnResizeChange) {
        document.addEventListener('mousedown', e => this.onMouseDown(e))
        document.addEventListener('mousemove', e => this.onMouseMove(e))
        document.addEventListener('mouseup', () => this.onMouseUp())
    }

    onMouseDown(event: MouseEvent) {
        const resizer = event.target as HTMLElement
        if (!resizer?.dataset.resizable) return
        event.preventDefault()

        this.element = resizer.parentElement as HTMLElement
        this.isResizing = true

        // Get initial position of the mouse
        this.startX = event.clientX
        this.startY = event.clientY

        this.element.style.zIndex = RESIZE_ZINDEX

        // Get initial size of the element
        this.startWidth = parseInt(getComputedStyle(this.element).width, 10)
        this.startHeight = parseInt(getComputedStyle(this.element).height, 10)
    }

    onMouseMove(event: MouseEvent) {
        if (this.isResizing && this.element) {
            const newWidth = this.startWidth + (event.clientX - this.startX)
            const newHeight = this.startHeight + (event.clientY - this.startY)

            // Set new dimensions
            this.element.style.width = `${newWidth}px`
            this.element.style.height = `${newHeight}px`

            // Run callback to update state
            const id = this.element.dataset.id
            if (id) this.callback(id, newWidth, newHeight)
        }
    }

    onMouseUp() {
        this.isResizing = false
        if (this.element) this.element.style.zIndex = ''
    }

    destroy() {
        document.removeEventListener('mousedown', this.onMouseDown)
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }
}
