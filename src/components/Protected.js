import React from 'react'
import { Redirect } from 'react-router-dom'
export default function Protected({ children }) {
    const isAuthenticated = localStorage.getItem('manager');
    return isAuthenticated ? (
        children) : (
        <Redirect to={{ pathname: '/login' }} />
    );
}

 