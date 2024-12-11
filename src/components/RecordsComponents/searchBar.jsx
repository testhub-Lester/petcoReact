import './searchBar-Records.css'

export default function Searchbar_Records(){
    return (
        <div class="searchBarPanel-records">
            <div class="searchBar-records">
                <input type="text" name="search" />
                <button> SEARCH</button>
            </div>
                <div class="quick-filter-records">
                    <h4> Quick Filter:</h4>
                    <button name="/" onClick=""> TODAY </button>
                    <button name="/" onClick=""> BY WEEK </button>
                    <button name="/" onClick=""> BY MONTH</button>
                    <button name="/" onClick="">
                    OTHERS
                    <span class="material-symbols-sharp"> keyboard_arrow_down </span>
                    </button>
                </div>
        </div>
    )
}