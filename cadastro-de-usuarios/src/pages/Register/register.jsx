import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import './register.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState(''); const [showPassword, setShowPassword] = useState(false);

  const inputName = useRef()
  const inputEmail = useRef()
  const inputPassword = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value
    })

    getUsers()
  }

  async function deleteUsers(_id) {
    await api.delete(`/users/${_id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

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
      <form>
        <h1>Cadastro</h1>
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

      {users.map((user) => (
        <div key={user._id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
            <p>Senha: <span>{user.password}</span></p>
          </div>
          <button onClick={() => deleteUsers(user._id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Register
