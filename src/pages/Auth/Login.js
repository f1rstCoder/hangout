import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../assets/styles/Login.css'
import { getAxios } from '../../lib/DefineAxiosGet';
import SubmitButton from '../../components/ui/Buttons/SubmitButton';
import Input from '../../components/form/Input';

const Login = ({ user, redirectPath = '/home' }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const checkCredentials = e => {
    e.preventDefault()
    setUsername('')
    setPassword('')
    getAxios('http://localhost:3030/users', {
      username: username,
      password: password,
    })
      .then(res => {
        if (res.length === 0) {
          setError(true)
          return
        } else {
          localStorage.setItem('id', res[0].id)
          window.location.reload()
        }
      })
      .catch(err => console.error(err))
  }

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className='login'>
      <div className="title">
        <div className="titleContent">
          hangout
        </div>
      </div>
      <div className="LoginForm">

        {error &&
          < div className="error">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#204922" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            <p className='errMsg'>
              Oops... Seems like you entered the incorrect credentials!
            </p>
          </div>
        }
        <form onSubmit={checkCredentials}>
          {/* <input
            type="text"
            autoComplete='off'
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='usernameInput'
            id='username'
            placeholder='Got a Username???'
          /> */}

          <Input
            receivedValue={username}
            receivedOnChange={e => setUsername(e.target.value)}
            receivedPlaceholder='Got a Username???'
          />

          {/* <input
            type="password"
            autoComplete='off'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='passwordInput'
            id='password'
            placeholder='Have a Password???'
          /> */}

          <Input
            receivedValue={password}
            receivedOnChange={e => setPassword(e.target.value)}
            receivedPlaceholder='Have a Password???'
          />

          <SubmitButton
            submitButtonText={"Let's Hangout"}
            disablingCondition={!username || !password}
          />

        </form>
      </div>
    </div >
  )
}

export default Login
