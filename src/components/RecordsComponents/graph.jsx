import './graph.css'

function Graph_Records(){
    return (
    <div class="record-graph">
        <div class="item-list">
            <h4> TODAY </h4>
            <div class="item">
                <span class="dot"></span>
                <p>PRODUCTS</p>
            </div>
            <div class="item">
                <span class="dot"></span>
                <p> GROOMING </p>
            </div>
            <div class="item">
                <span class="dot"></span>
                <p> OTHERS </p>
            </div>
        </div>
        <span class="graph-circle"></span>

        <div class="item-list">
            <h4> MONTH - [MMM] </h4>
            <div class="item">
                <span class="dot"></span>
                <p> PRODUCTS </p>
            </div>
            <div class="item">
                <span class="dot"></span>
                <p> GROOMING </p>
            </div>
            <div class="item">
                <span class="dot"></span>
                <p> OTHERS </p>
            </div>
        </div>
        <span class="graph-circle"></span>
    </div>
    )
}

export default Graph_Records;