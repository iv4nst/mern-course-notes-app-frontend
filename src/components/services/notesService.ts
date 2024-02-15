// communicate with backend

import axios from 'axios'
import { NOTES_API_URL } from '../../constants/api'
import INote from '../../interfaces/note.interface'

export const getNotes = async () => {
    try {
        const response = await axios.get(NOTES_API_URL)
        return response.data.notes
    } catch (err) {
        console.error(err)
    }
}

// Partial<INote>   -receive an object which may not have all properties (because we don't set ID when creating)
export const createNote = async (newNote: Partial<INote>) => {
    try {
        const response = await axios.post(NOTES_API_URL, newNote)
        return response.data.note
    } catch (err) {
        console.error(err)
    }
}

export const updateNote = async (noteToUpdate: INote) => {
    try {
        const url = `${NOTES_API_URL}/${noteToUpdate._id}` // url/noteID
        const response = await axios.patch(url, noteToUpdate)
        return response.data.note
    } catch (err) {
        console.error(err)
    }
}

export const deleteNote = async (noteToDeleteID: string) => {
    try {
        const url = `${NOTES_API_URL}/${noteToDeleteID}` // url/noteID
        const response = await axios.delete(url)
        return response.data.msg
    } catch (err) {
        console.error(err)
    }
}
