import './searchBar-Cashier.css'

function SearchBar_Cashier(){
    return (
        <div class="searchBarPanel-cashier">
            <div class="searchBar-cashier">
                <input type="text" name="search" />
                <button onClick="/"> SEARCH</button>
            </div>
                <div class="quick-filter-cashier">
                    <h4> Quick Filter:</h4>
                    <button name="/">ALL</button>
                    <button name="/">CATEGORY01</button>
                    <button name="/">CATEGORY02</button>
                    <select name="others" id="others">
                        <option value="category01"> CATEGORY </option>
                    </select>
                </div>
        </div>
    )
}

export default SearchBar_Cashier;