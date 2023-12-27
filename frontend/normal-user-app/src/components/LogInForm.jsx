import React from 'react';
import axios from 'axios';

const LogInForm = () => {
  const [logInFormState, setLogInFormState] = React.useState({
    username: '',
    password: '',
  });

  function onChange(e) {
    setLogInFormState({ ...logInFormState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3000/login', logInFormState, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .then((res) => localStorage.setItem('token', 'Bearer ' + res.data.token));
  }

  return (
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
  );
};

export default LogInForm;
