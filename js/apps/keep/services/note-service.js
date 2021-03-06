import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const notesService = {
    query,
    deleteNote,
    toggleNotePin,
    duplicateNote,
    createNote,
    editNote
};

const NOTES_KEY = "notesDB";
const gNotes = storageService.loadFromStorage(NOTES_KEY) || [
    {
        id: utilService.makeId(5),
        type: "note-txt",
        isPinned: true,
        info: { txt: "Buy milk on my way back from work" },
        style: { backgroundColor: "rgb(128 150 212)" }
    },
    {
        id: utilService.makeId(5),
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fix the fence" },
        style: { backgroundColor: "rgb(218, 182, 5)" }
    },
    {
        id: utilService.makeId(5),
        type: "note-img",
        isPinned: false,
        info: { url: "./assets/img/cat.jpg", title: "Found this funny picture of a cat" },
        style: { backgroundColor: "rgb(51 150 80)" }
    },
    {
        id: utilService.makeId(5),
        type: "note-todos",
        isPinned: true,
        info: {
            label: "Must finish this week",
            todos: [
                { txt: "Driving licence", doneAt: null },
                { txt: "Master react", doneAt: 187111111 },
                { txt: "Finish my big project", doneAt: null },
                { txt: "Get some hair cut", doneAt: null },
                { txt: "Run 5km under 25 minutes", doneAt: null },
            ],
        },
        style: { backgroundColor: "rgb(104, 140, 252)" }
    },
    {
        id: utilService.makeId(5),
        type: "note-video",
        isPinned: false,
        info: { url: "https://www.youtube.com/watch?v=3OF7ikaSfcc", title: "funny vid" },
        style: { backgroundColor: "rgb(255 212 212)" }
    },
    {
        id: utilService.makeId(5),
        type: "note-video",
        isPinned: false,
        info: { url: "https://www.youtube.com/watch?v=pHruXWEasqQ", title: "Now that's something I'll want to do some day" },
        style: { backgroundColor: "rgb(150 12 50)" }
    },
];
_saveNotesToStorage()

function query() {

    return Promise.resolve(gNotes);
}

// Crud
function editNote(noteId, info) {
    const editIdx = _getNoteIdx(noteId)

    if (editIdx !== -1) {

        if (Object.keys(info)[0] === 'backgroundColor') {
            gNotes[editIdx].style = info
        } else {
            gNotes[editIdx].info = info
        }
        _saveNotesToStorage()
    }
}


function createNote(info, type) {
    const newNote = {
        id: utilService.makeId(5),
        type,
        isPinned: false,
        info,
        style: { backgroundColor: "rgb(255 212 212)" }
    }

    gNotes.push(newNote);
    _saveNotesToStorage();
}

function deleteNote(noteId) {
    const deleteIdx = _getNoteIdx(noteId);
    if (deleteIdx !== -1) {
        gNotes.splice(deleteIdx, 1);
        _saveNotesToStorage();
    }
}

function toggleNotePin(noteId) {
    const toggleIdx = _getNoteIdx(noteId);
    if (toggleIdx !== -1) {
        gNotes[toggleIdx].isPinned = !gNotes[toggleIdx].isPinned;
        _saveNotesToStorage();
    }
}

function duplicateNote(noteId) {
    const duplicateIdx = _getNoteIdx(noteId);
    if (duplicateIdx !== -1) {
        const newCopy = JSON.parse(JSON.stringify(gNotes[duplicateIdx]));
        newCopy.id = utilService.makeId()
        gNotes.push(newCopy);
        _saveNotesToStorage();
    }
}

function _saveNotesToStorage() {
    storageService.saveToStorage(NOTES_KEY, gNotes);
}

function _getNoteIdx(noteId) {
    const idx = gNotes.findIndex(note => noteId === note.id);
    return idx;
}

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return note

}

function addTouchListner() {
    onTouchStart()
}