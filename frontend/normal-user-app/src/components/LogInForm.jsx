import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const { user, setUser } = useContext(UserContext);

  const [logInFormState, setLogInFormState] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  function onChange(e) {
    setLogInFormState({ ...logInFormState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3000/login', logInFormState, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .then((res) => {
        localStorage.setItem('token', 'Bearer ' + res.data.token);
        setUser(res.data.user);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return user ? (
    navigate('/')
  ) : (
    <>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          placeholder="input your username here"
          value={logInFormState.username}
          onChange={onChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          placeholder="input your password here"
          value={logInFormState.password}
          onChange={onChange}
        />
        <button type="Submit">Submit</button>
      </form>
    </>
  );
};

export default LogInForm;
