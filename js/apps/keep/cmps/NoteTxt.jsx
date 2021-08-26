export function NoteTxt({ info, isEditMode }) {

    if (!isEditMode) {

        return (

            <div className="note-txt">
                {info.txt}
            </div>
        )
    } else {
        return (

            <div>edit mode!</div>
        )

    }
}