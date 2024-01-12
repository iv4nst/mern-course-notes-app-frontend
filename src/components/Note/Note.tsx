import { FC, FocusEvent } from 'react'
import INote from '../../interfaces/note.interface'
import './Note.css'

type Props = {
    note: INote
    onNoteUpdate: (note: INote) => void // Function that takes note as argument, and returns nothing
}

// FC - functional component
const Note: FC<Props> = ({ note, onNoteUpdate }) => {
    const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
        const newTextValue = event.currentTarget.textContent
        
        // if new text value is equal to the note passed from the parent - no change
        if (newTextValue === note.text) {
            return
        }

        const updatedNoteObject: INote = {
            ...note, // take all the values (has "text" property, but it's overridden below)
            text: newTextValue || '', // override "text" value
        }
        onNoteUpdate(updatedNoteObject)
    }

    return (
        <div className="note">
            {/* show details of the first element */}
            <div
                onBlur={noteTextUpdated}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="note__text"
            >
                {note.text}
            </div>
            <div className="note__link">
                <a href={note.link}>{note.link}</a>
            </div>
        </div>
    )
}

export default Note
