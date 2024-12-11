import './AdminDashboard.css'
import AdminBulletin from './bulletinBoard'

import AccountList from './accountList'
import AccountActive from './accountActive'

function AdminDashboard_Panel(){
    return (
        <div class="adminDashboard-panel">
            <div class="adminDashboard-leftside">
                <AdminBulletin />
                <AccountActive />
            </div>
            <div class="adminDashboard-rightside">
                <AccountList />
            </div>
        </div>
    )
}

export default AdminDashboard_Panel