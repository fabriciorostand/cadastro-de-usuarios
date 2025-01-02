import { useEffect, useState, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import api from '../../services/api'
import Register from '../Register'

function Login() {
    const [users, setUsers] = useState([])

    const inputEmail = useRef()
    const inputPassword = useRef()

    useEffect(() => {

    }, [])

    return (
        <div className='container'>
            <form>
                <h1>Login</h1>
                <input type="email" name='email' placeholder='E-mail' ref={inputEmail} />
                <input type="password" name='senha' placeholder='Senha' ref={inputPassword} />
                <button type='button'>Entrar</button>
                <p>Não tem uma conta?
                    <Link className='link' to={"/register"}> Cadastre-se</Link>
                </p>
            </form>
        </div>
    )
}

export default Login