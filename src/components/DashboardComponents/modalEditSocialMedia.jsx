import './modalEditSocialMedia.css'

function ModalEditSocialMedia_Dashboard({closeModal}) {
    return (
        <div class="editSocialMedia-container">
            <div class="editSocialMedia-panel">
            <div class="editSocialMedia-header">
                <h1>
                    <i class='bx bx-edit'></i>
                    SOCIAL MEDIA LINKS - EDIT
                </h1>
                <button onClick={() => {closeModal(false);}}>
                    <span class="material-symbols-sharp"> close </span>
                    </button>
            </div>
            <div class="editSocialMedia-content">
                <div class="socialMedia-dropdown">
                <label for="cars">Social Media List: </label>
                <select name="cars" id="cars">
                    <option value="facebook"> FACEBOOK </option>
                    <option value="instagram"> INSTAGRAM </option>
                    <option value="twitter"> TWITTER </option>
                    <option value="others"> OTHERS </option>
                </select>
                </div>
                <p> NOTE: ENTER LINK HERE <i class='bx bx-caret-down'></i></p>
                <input type='text' name="link" />
            </div>
            <div class="editSocialMedia-footer">
                <button class="cancel" onClick={() => {closeModal(false);}}>
                <span class="material-symbols-sharp"> cancel </span>
                CANCEL
                </button>
                <button class="save" onClick="/">
                <span class="material-symbols-sharp"> save </span>
                SAVE
                </button>
            </div>
            </div>
        </div>
    )
}

export default ModalEditSocialMedia_Dashboard;