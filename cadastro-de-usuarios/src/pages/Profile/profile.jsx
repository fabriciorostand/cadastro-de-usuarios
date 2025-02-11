import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { updateUser, deleteUser } from '../../services/api';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Toupeira from '../../assets/toupeira.png';
import ConfirmModal from './confirm-modal';
import './profile.css';

function Profile() {
    const userId = localStorage.getItem('userId'); // Recuperar o userId do localStorage
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null); // Estado para a foto de perfil
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false); // Estado do modal

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/users/${userId}`);
                setName(response.data.name);
                setEmail(response.data.email);
                // Transformar o caminho absoluto em relativo
                const relativeProfilePic = response.data.profilePic ? response.data.profilePic.replace(/\\/g, '/').split('uploads/')[1] : null;
                setProfilePic(relativeProfilePic);
            } catch (error) {
                setError('Erro ao carregar dados do usuário');
                console.error('Erro ao carregar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        try {
            const updatedUser = { name };
            if (newPassword) {
                updatedUser.password = newPassword;
            }
            await updateUser(userId, updatedUser);
            setSuccess('Informações atualizadas com sucesso!');
            setError('');
        } catch (error) {
            setError('Erro ao atualizar as informações. Tente novamente.');
            setSuccess('');
            console.error('Erro ao atualizar as informações:', error);
        }
    };

    const handleProfilePicUpload = async (e) => {
        const formData = new FormData();
        formData.append('profilePic', e.target.files[0]);

        try {
            const response = await api.post('/api/users/profile-pic', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const relativeProfilePic = response.data.profilePic ? response.data.profilePic.replace(/\\/g, '/').split('uploads/')[1] : null;
            setProfilePic(relativeProfilePic);
            setSuccess('Foto de perfil atualizada com sucesso!');
            setError('');
        } catch (error) {
            setError('Erro ao atualizar foto de perfil. Tente novamente.');
            setSuccess('');
            console.error('Erro ao atualizar foto de perfil:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
            navigate('/login');
        } catch (error) {
            setError('Erro ao excluir a conta. Tente novamente.');
            console.error('Erro ao excluir a conta:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const toggleDropdown = () => { 
        setDropdownVisible(!isDropdownVisible); 
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
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
                        <img src={`http://localhost:8080/uploads/${profilePic}`} alt="Foto de Perfil" />
                    ) : (
                        <FaUserCircle className='avatar' onClick={toggleDropdown} />
                    )}
                    <FaCaretDown className='arrow' onClick={toggleDropdown} />
                    {isDropdownVisible && (
                        <div className='dropdown-menu'>
                            <ul>
                                <li>
                                    <Link 
                                        className='li-link' 
                                        to={`/profile/${userId}`}
                                    >
                                        Perfil
                                    </Link>
                                </li>
                                <li>Configurações</li>
                                <li>
                                    <Link 
                                        className='li-link' 
                                        to="/login" 
                                        onClick={handleLogout}
                                    >
                                        Sair
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <div className='profile-container'>
                <h1>Perfil</h1>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePic">Foto de Perfil:</label>
                        <input
                            type="file"
                            id="profilePic"
                            onChange={handleProfilePicUpload}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">Nova Senha:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="update-button" type="submit">Atualizar Informações</button>
                </form>
                <button className="delete-button" onClick={openModal}>
                    Excluir Conta
                </button>
            </div>
            <ConfirmModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onConfirm={handleDelete} 
            />
        </div>
    );
}

export default Profile;