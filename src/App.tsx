import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    // use state to rerender UI
    const [notesList, setNotesList] = useState<Array<any>>([])

    const getNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/notes')
            setNotesList(response.data.notes) // updates the "notesList"
            console.log(notesList)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="App">
            <div>Notes App</div>
            <div>
                <button onClick={getNotes}>Click me!</button>
            </div>
            <div>
                {/* show details of the first element */}
                <h4>{notesList[0]?.text}</h4> {/* ? checks if exists */}
                <h5>{notesList[0]?.link}</h5>
            </div>
        </div>
    )
}

export default App
