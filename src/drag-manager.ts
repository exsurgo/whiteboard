export type OnDragChange = (id: string, x: number, y: number) => void

const DRAG_ZINDEX = '9999999'

/** Handles low-level drag operations outside the React state flow. */
export class DragManager {
    private element: HTMLElement | null = null
    private isDragging = false
    private shiftX = 0
    private shiftY = 0

    constructor(private callback: OnDragChange) {
        document.addEventListener('mousedown', e => this.onMouseDown(e))
        document.addEventListener('mousemove', e => this.onMouseMove(e))
        document.addEventListener('mouseup', () => this.onMouseUp())
    }

    onMouseDown(event: MouseEvent) {
        const element = event.target as HTMLElement
        if (!element?.dataset.draggable) return
        event.preventDefault()

        this.element = element
        event.preventDefault()
        this.isDragging = true

        this.shiftX = event.clientX + element.getBoundingClientRect().left
        this.shiftY = event.clientY + element.getBoundingClientRect().top

        element.style.zIndex = DRAG_ZINDEX

        this.moveAt(event.pageX, event.pageY)
    }

    onMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            this.moveAt(event.pageX, event.pageY)
        }
    }

    onMouseUp() {
        this.isDragging = false
        if (this.element) this.element.style.zIndex = ''
    }

    moveAt(pageX: number, pageY: number) {
        if (!this.element) return

        this.element.style.left = pageX - this.shiftX + 'px'
        this.element.style.top = pageY - this.shiftY + 'px'

        // Run callback to update state
        const id = this.element.dataset.id
        if (id) this.callback(id, pageX - this.shiftX, pageY - this.shiftY)
    }

    destroy() {
        document.removeEventListener('mousedown', this.onMouseDown)
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }
}
