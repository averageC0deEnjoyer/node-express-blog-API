import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import UserLoggedIn from './UserLoggedIn';

import { Button, Form, Row } from 'react-bootstrap';

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
      .post(
        'https://simple-bloglist-example-ace.onrender.com/login',
        logInFormState,
        {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        }
      )
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
    <Row className="ml-auto mr-auto d-flex justify-content-center align-items-center flex-grow-1">
      <Form
        className="bg-dark rounded d-flex flex-column align-items-center justify-content-center py-3 gap-3"
        style={{ width: '20rem' }}
      >
        <Form.Group className="text-center">
          <Form.Label className="text-white">Username:</Form.Label>
          <Form.Control
            type="string"
            name="username"
            value={logInFormState.username}
            onChange={onChange}
            placeholder="enter username"
            style={{ width: '17rem' }}
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label className="text-white">Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={logInFormState.password}
            onChange={onChange}
            placeholder="enter password"
            style={{ width: '17rem' }}
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="bg-primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Row>
  );
};

export default LogInForm;
