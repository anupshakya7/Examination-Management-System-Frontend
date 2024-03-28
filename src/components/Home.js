import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');
        if (!userInfo) {
            navigate('/login');
        }
    },[navigate]);
    
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
