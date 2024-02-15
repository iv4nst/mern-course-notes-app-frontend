import { FC, FocusEvent, useState } from 'react'
import INote from '../../interfaces/note.interface'
import './Note.css'

type Props = {
    note: INote
    onNoteUpdate: (note: INote) => void // Function that takes note as argument, and returns nothing
    onNoteDelete: (note: INote) => void
}

// FC - functional component
const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {
    const [isFocused, setIsFocused] = useState(false) // default value is false

    const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
        setIsFocused(false)

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
        <div className={isFocused ? 'note note--focused' : 'note'}>
            <button
                onClick={() => {
                    onNoteDelete(note)
                }}
                type="button"
                className="btn-close"
                aria-label='"Close'
            ></button>

            {/* show details of the first element */}
            <div
                onBlur={noteTextUpdated}
                onFocus={() => {
                    setIsFocused(true)
                }}
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
