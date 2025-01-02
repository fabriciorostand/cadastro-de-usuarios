import { useEffect, useState, useRef } from 'react'
import './register.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Register() {
  const [users, setUsers] = useState([])

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

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name='nome' placeholder='Nome' ref={inputName} />
        <input type="email" name='email' placeholder='E-mail' ref={inputEmail} />
        <input type="password" name='senha' placeholder='Senha' ref={inputPassword} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
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
