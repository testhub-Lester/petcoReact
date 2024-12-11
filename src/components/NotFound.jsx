import '../assets/NotFound.css'
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return <div class="notfound-page">
        <h1>404 Not Found</h1>
        <p>The page you're looking for doesn't exist!</p>
        <button onClick={() => navigate(-1)}>Back</button>
    </div>
}

export default NotFound