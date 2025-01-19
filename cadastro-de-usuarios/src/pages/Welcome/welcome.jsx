import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './welcome.css'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Toupeira from '../../assets/toupeira.png'


function Welcome() {
    const { name } = useParams();
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => { 
        setDropdownVisible(!isDropdownVisible); 
    };

    return (
        <div>
            <header>
                <Link className='logo-link' to={`/welcome/${name}`}>
                    <img src={Toupeira} />
                    Toup
                </Link>
                <div className='avatar-container'>
                    <div>
                        <FaUserCircle className='avatar' onClick={toggleDropdown} />
                        <FaCaretDown className='arrow' onClick={toggleDropdown} />
                        {isDropdownVisible && (
                            <div className='dropdown-menu'>
                                <ul>
                                    <li>Perfil</li>
                                    <li>Configurações</li>
                                    <li>
                                        <Link className='li-link' to={"/login"}>Sair</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className='welcome-container'>
                <h1>Bem-vindo(a), {name}!</h1>
            </div>
        </div>
    );
}

export default Welcome;