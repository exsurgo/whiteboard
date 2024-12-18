import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Whiteboard } from './Whiteboard'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Whiteboard />
    </React.StrictMode>
)
