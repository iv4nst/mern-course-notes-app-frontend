import { useEffect, useState } from 'react'
import './App.css'
import Note from './components/Note/Note'
import INote from './interfaces/note.interface'
import {
    createNote,
    deleteNote,
    getNotes,
    updateNote,
} from './components/services/notesService'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'

function App() {
    // use state to rerender UI
    const [notesList, setNotesList] = useState<Array<INote>>([])

    // add note modal
    const [showAddNoteModal, setShowAddNoteModal] = useState(false)
    const handleCloseAddModal = () => {
        // reset the new note to default after closing the modal
        setNewNote({
            link: '',
            text: '',
        })
        setShowAddNoteModal(false)
    }
    const handleShowAddModal = () => setShowAddNoteModal(true)

    const [newNote, setNewNote] = useState<Partial<INote>>({
        link: '',
        text: '',
    })

    // runs when App component renders the first time
    useEffect(() => {
        getNotesFromServer()
    }, []) // [] - not dependent on anything (only runs the 1st time)

    const getNotesFromServer = async () => {
        const notes = await getNotes()
        setNotesList(notes)
    }

    const updateNoteItem = async (updatedNote: INote) => {
        // use what is sent from the server
        const noteFromServer = await updateNote(updatedNote)

        // update the notes list with new updated note
        const updatedList = notesList.map((noteItem: INote) => {
            if (noteItem._id === noteFromServer._id) {
                return noteFromServer
            }
            return noteItem
        })

        // updating the state of notesList
        setNotesList(updatedList)
    }

    const deleteNoteItem = async (noteToDelete: INote) => {
        const noteID = noteToDelete._id
        // await deleteNote(noteID)
        const a = await deleteNote(noteID)
        console.log(a)

        // update the notes list (compare note IDs and show only the ones that are not deleted)
        const remainingNotes = notesList.filter((noteItem) => {
            return noteItem._id !== noteID
        })
        setNotesList(remainingNotes)
    }

    const addNote = async () => {
        const savedNote = await createNote(newNote)
        setNotesList([...notesList, savedNote]) // new note, and all the existing notes on the server
        handleCloseAddModal()
    }

    return (
        <div className="App">
            <Button
                variant="dark"
                className="add-button"
                onClick={handleShowAddModal}
            >
                <div className="add-button-text">+</div>
            </Button>

            <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingTextarea2" label="Text">
                        <Form.Control
                            onChange={(event) => {
                                const newValue = event.currentTarget.value
                                // ...newNote - use all from newNote, but update "text"
                                setNewNote({ ...newNote, text: newValue })
                            }}
                            as="textarea"
                            placeholder="Enter your note text"
                            style={{ height: '100px' }}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Link"
                        className="mb-3 note-link"
                    >
                        <Form.Control
                            onChange={(event) => {
                                const newValue = event.currentTarget.value
                                // ...newNote - use all from newNote, but update "text"
                                setNewNote({ ...newNote, link: newValue })
                            }}
                            type="url"
                            placeholder="Enter note url"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addNote}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="notes-list">
                {notesList.map((noteItem, index) => {
                    return (
                        <Note
                            key={index}
                            note={noteItem}
                            onNoteUpdate={updateNoteItem}
                            onNoteDelete={deleteNoteItem}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App
