import React from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [signUpFormState, setSignUpFormState] = React.useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  function onChange(event) {
    setSignUpFormState({
      ...signUpFormState,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:3000/signup', signUpFormState, {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
      .then((res) => console.log(res));
  }

  return (
    <>
      <div>Hello worlds</div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="firstName">Firstname: </label>
        <input
          name="firstName"
          placeholder="John"
          id="firstName"
          type="text"
          onChange={onChange}
          value={signUpFormState.firstName}
        />
        <label htmlFor="lastName">Lastname: </label>
        <input
          name="lastName"
          placeholder="Doe"
          id="lastName"
          type="text"
          onChange={onChange}
          value={signUpFormState.lastName}
        />
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          id="username"
          type="text"
          onChange={onChange}
          value={signUpFormState.username}
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={onChange}
          value={signUpFormState.password}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUpForm;
