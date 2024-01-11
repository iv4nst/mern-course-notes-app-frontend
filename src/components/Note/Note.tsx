import { FC, FocusEvent } from 'react'
import INote from '../../interfaces/note.interface'
import './Note.css'

type Props = {
    note: INote
    onNoteUpdate: Function
}

// FC - functional component
const Note: FC<Props> = ({ note, onNoteUpdate }) => {
    const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
        console.log('Note text changed')
        let textContent = event.currentTarget.textContent
        console.log(textContent)
        onNoteUpdate(textContent)
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
