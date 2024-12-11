import './sideBubble.css'

function SideBubble_Analytics() {
    return (
        <div class="sideBubblePanel">
            <label> Recent Inventory Updates</label>
<div class="sideBubblePanelContent">


            <div class="bubbleItem">
                <label>1 Hours ago </label>
                <div class="bubbleItem-content">
                <span class="material-symbols-sharp"> inventory_2 </span>

                    <div class="bubbleItem-content-info">
                        <h3> INVENTORY - Supplies01</h3>
                        <h5> Cashier02 : ADDED ITEM </h5>
                    </div>
                </div>
            </div>

            <div class="bubbleItem">
                <label>1 Hours ago </label>
                <div class="bubbleItem-content">
                <span class="material-symbols-sharp"> inventory_2 </span>

                    <div class="bubbleItem-content-info">
                        <h3> INVENTORY - Food01</h3>
                        <h5> Cashier02 : ADDED ITEM </h5>
                    </div>
                </div>
            </div>


            </div>
        </div>
    )
}

export default SideBubble_Analytics;