import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { registerUser } from '../../services/api'; // Importa a função de registro
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const navigate = useNavigate();

  const validateRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(inputEmail.current.value)) {
      setErrorMessage('O e-mail fornecido é inválido.');
      return false;
    }

    if (inputPassword.current.value.length < 8) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateRegister()) {
      try {
        const { user, token } = await registerUser({
          name: inputName.current.value,
          email: inputEmail.current.value,
          password: inputPassword.current.value,
        });
        // Armazene o token JWT e o userId no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('username', user.name);
        navigate(`/welcome/${user.name}`); // Passe o nome do usuário na navegação
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrorMessage('O e-mail já foi utilizado para cadastrar uma conta.');
        } else {
          setErrorMessage('Erro ao cadastrar usuário. Tente novamente.');
        }
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setShowPassword(false);
    }
  };

  const toggleShowPassword = () => {
    if (password) {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Cadastro</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <input
          type="text"
          name='nome'
          placeholder='Nome'
          ref={inputName}
        />
        <input
          type="email"
          name='email'
          placeholder='E-mail'
          ref={inputEmail}
        />
        <div className="form-group">
          <input
            type={showPassword ? 'text' : 'password'}
            name='senha'
            placeholder='Senha'
            ref={inputPassword}
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
        <button type='submit'>Cadastrar</button>
        <p>Tem uma conta?
          <Link className='link' to={"/login"}> Conecte-se</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;