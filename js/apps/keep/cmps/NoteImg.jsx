export function NoteImg({ noteId, info, selectedNote, onSaveEdit, onGoBack }) {

    const urlRef = React.createRef()
    const urlTitle = React.createRef()

    const handleRef = () => {
        const setInfo = {
            url: urlRef.current.value,
            title: urlTitle.current.value
        }
        onSaveEdit(noteId, setInfo)
    }

    if (!selectedNote || selectedNote != noteId) {
        return (
            <div className="note-card">
                <img className="img-Note" src={`${info.url}`} />
                <h3>{info.title}</h3>
            </div>
        )

    } else {
        return (

            <div className="edit-note">
                <img className="img-Note" src={`${info.url}`} />
                <div className="edit-inputs">
                    <p>enter new url and title </p>
                    <input type="text" defaultValue={info.url} ref={urlRef} />
                    <input type="text" defaultValue={info.title} ref={urlTitle} />
                    <div className="edit-buttons">
                        <button className="btn edit-save" onClick={() => handleRef()}> save! </button>
                        <button className="btn edit-goback fas fa-times" onClick={() => onGoBack()}></button>

                    </div>
                </div>
            </div>
        )

    }
}