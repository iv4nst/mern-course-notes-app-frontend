import { useEffect, useState } from 'react'
import './App.css'
// import axios from 'axios'
import DUMMY_NOTES from './DUMMY_NOTES'
import Note from './components/Note/Note'

function App() {
    // use state to rerender UI
    const [notesList, setNotesList] = useState<Array<any>>([])

    useEffect(() => {
        setNotesList(DUMMY_NOTES) // called the 1st time the component renders
    }, []) // [] - not dependent on anything (only runs the 1st time)

    // const getNotes = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/notes')
    //         setNotesList(response.data.notes) // updates the "notesList"
    //         console.log(notesList)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    console.log(notesList)

    return (
        <div className="App">
            <div className="notes-list">
                {notesList.map((noteItem, index) => {
                    return <Note note={noteItem} key={index} />
                })}
            </div>
        </div>
    )
}

export default App
