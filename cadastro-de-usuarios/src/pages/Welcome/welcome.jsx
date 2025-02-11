import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './welcome.css';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Toupeira from '../../assets/toupeira.png';
import api from '../../services/api';

function Welcome() {
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState(null); // Adicionando estado para imagem de perfil
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const userId = localStorage.getItem('userId'); // Recuperar o userId do localStorage

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/users/${userId}`);
                setName(response.data.name);
                setProfilePic(response.data.profilePic || null); // Configurar a foto de perfil
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const toggleDropdown = () => { 
        setDropdownVisible(!isDropdownVisible); 
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div>
            <header>
                <Link className='logo-link' to={`/welcome/${userId}`}>
                    <img src={Toupeira} alt="Logo" />
                    Toup
                </Link>
                <div className='avatar-container'>
                    {profilePic ? (
                        <img src={`http://localhost:8080/uploads/${profilePic.split('\\').pop()}`} alt="Foto de Perfil" className='avatar' />
                    ) : (
                        <FaUserCircle className='avatar' onClick={toggleDropdown} />
                    )}
                    <FaCaretDown className='arrow' onClick={toggleDropdown} />
                    {isDropdownVisible && (
                        <div className='dropdown-menu'>
                            <ul>
                                <li>
                                    <Link className='li-link' to={`/profile/${userId}`}>Perfil</Link>
                                </li>
                                <li>Configurações</li>
                                <li>
                                    <Link className='li-link' to={"/login"} onClick={handleLogout}>Sair</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className='welcome-container'>
                <h1>Bem-vindo(a), {name}!</h1>
            </div>
        </div>
    );
}

export default Welcome;