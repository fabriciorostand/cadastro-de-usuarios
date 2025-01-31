import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import api from '../../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/users');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    try {
      await api.post('/users', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        password: inputPassword.current.value
      });
      setSuccessMessage('Cadastro realizado com sucesso!');
      setErrorMessage('');
      getUsers();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Este e-mail já está utilizado para cadastrar uma conta. Tente outro.');
      } else {
        setErrorMessage('Erro ao cadastrar usuário. Tente novamente.');
      }
      setSuccessMessage('');
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

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
      <form>
        <h1>Cadastro</h1>
        {successMessage && <p className="success">{successMessage}</p>}
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
        <button type='button' onClick={createUsers}>Cadastrar</button>
        <p>Tem uma conta?
          <Link className='link' to={"/login"}> Conecte-se</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
