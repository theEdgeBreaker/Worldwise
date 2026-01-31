import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    
    const navigate = useNavigate();
    useEffect(function () {
        if (!isAuthenticated ) navigate("/")
    }, [navigate, isAuthenticated])
    return  isAuthenticated && children;
}

export default ProtectedRoute
