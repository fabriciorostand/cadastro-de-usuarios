import React from 'react';
import { useParams } from 'react-router-dom';

function Welcome() {
    const { name } = useParams();
    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Seja Bem-vindo, {name}!</h1>
        </div>
    );
}

export default Welcome;