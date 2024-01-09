import { FC } from 'react'
import INote from '../../interfaces/note.interface'
import './Note.css'

type Props = {
    note: INote
}

// FC - functional component
const Note: FC<Props> = ({ note }) => {
    return (
        <div className="note">
            {/* show details of the first element */}
            <div className="note__text">{note.text}</div>
            <div className="note__link">
                <a href={note.link}>{note.link}</a>
            </div>
        </div>
    )
}

export default Note
