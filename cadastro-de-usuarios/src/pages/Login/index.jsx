import { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import api from '../../services/api'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validateLogin = () => {
        if (!email || !password) {
            setError('E-mail e senha são obrigatórios.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('E-mail inválido.');
            return false;
        }

        if (password.length < 8) {
            setError('A senha deve ter pelo menos 8 caracteres.');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateLogin()) {
            try {
                const response = await api.post('/login', { email, password });
                if (response.data.success) {
                    navigate(`/welcome/${response.data.name}`);
                } else {
                    setError('Credenciais inválidas. Tente novamente.');
                }
            } catch (error) {
                setError('Erro no servidor. Tente novamente mais tarde.');
            }
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value === "") {
            setShowPassword(false);
        }
    }

    const toggleShowPassword = () => {
        if (password) {
            setShowPassword(!showPassword); 
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="email" 
                    name='email' 
                    placeholder='E-mail' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="form-group">
                <input 
                    type={showPassword ? 'text' : 'password'}
                    name='senha' 
                    placeholder='Senha' 
                    value={password} 
                    onChange={handlePasswordChange} 
                    className="input-field"
                />
                {password && (
                <span
                    onClick={toggleShowPassword}
                    className="toggle-password"
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                )}
                </div>
                <button type='submit'>Entrar</button>
                <p>Não tem uma conta?
                    <Link className='link' to={"/register"}> Cadastre-se</Link>
                </p>
            </form>
        </div>
    )
}

export default Login