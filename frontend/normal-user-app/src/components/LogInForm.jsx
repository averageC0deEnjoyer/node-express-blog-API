import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import UserLoggedIn from './UserLoggedIn';

import { Button, Form } from 'react-bootstrap';

const LogInForm = () => {
  //use userContext
  const { user, setUser } = useContext(UserContext);

  const [logInFormState, setLogInFormState] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user.username !== '') {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, []);

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
  // i use like this so it wont render the form even for 0.something seconds (before i just navigate('/already-log-in') in the useEffect and show the form)
  return user.username !== '' ? (
    <UserLoggedIn />
  ) : (
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="string"
          name="username"
          value={logInFormState.username}
          onChange={onChange}
          placeholder="enter username"
          style={{ width: '15rem' }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={logInFormState.password}
          onChange={onChange}
          placeholder="enter password"
          style={{ width: '15rem' }}
        />
      </Form.Group>

      <Form.Group>
        <Button variant="primary" type="submt" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LogInForm;
