import { useEffect, useState } from 'react'
import './App.css'
// import axios from 'axios'
import DUMMY_NOTES from './DUMMY_NOTES'
import Note from './components/Note/Note'
import INote from './interfaces/note.interface'

function App() {
    // use state to rerender UI
    const [notesList, setNotesList] = useState<Array<INote>>([])

    // runs when App component renders the first time
    useEffect(() => {
        const listFromStorageString = localStorage.getItem('my-notes') // get from local storage
        if (listFromStorageString) {
            const listFromStorageArray = JSON.parse(listFromStorageString)
            setNotesList(listFromStorageArray) // save from local storage
        } else {
            setNotesList(DUMMY_NOTES) // otherwise save DUMMY_NOTES
        }
    }, []) // [] - not dependent on anything (only runs the 1st time)

    // store to localStorage
    useEffect(() => {
        console.log('Saving to localstorage')

        const notesListString = JSON.stringify(notesList) // must convert to string
        localStorage.setItem('my-notes', notesListString)
    }, [notesList])

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

    const updateNoteItem = (updatedNote: INote) => {
        console.log(`Value updated in the app component: ${updatedNote}`)

        // temp variable
        const updatedList = notesList.map((noteItem: INote) => {
            if (noteItem._id === updatedNote._id) {
                return updatedNote
            }
            return noteItem
        })

        // updating the state of notesList
        setNotesList(updatedList)
    }

    return (
        <div className="App">
            <div className="notes-list">
                {notesList.map((noteItem, index) => {
                    return (
                        <Note
                            note={noteItem}
                            onNoteUpdate={updateNoteItem}
                            key={index}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App
