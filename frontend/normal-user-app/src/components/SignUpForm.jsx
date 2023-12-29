import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import UserLoggedIn from './UserLoggedIn';
import { Form, Button, Container } from 'react-bootstrap';

const SignUpForm = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [signUpFormState, setSignUpFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });

  console.log(signUpFormState);

  useEffect(() => {
    if (user.username !== '') {
      setTimeout(() => navigate('/'), 3000);
    }
  }, []);

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
      .then((res) => {
        localStorage.setItem('token', 'Bearer ' + res.data.token);
        setUser(res.data.user);
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return user.username !== '' ? (
    <UserLoggedIn />
  ) : (
    <>
      {/* for wrapper */}
      <Container className="ml-auto mr-auto d-flex justify-content-center align-items-center">
        <Form
          className="bg-dark rounded d-flex flex-column align-items-center justify-content-center py-3 gap-3"
          style={{ width: '20rem' }}
        >
          <Form.Group className="text-center">
            <Form.Label className="text-white">Firstname:</Form.Label>
            <Form.Control
              type="string"
              name="firstName"
              value={signUpFormState.firstname}
              onChange={onChange}
              placeholder="enter firstname"
              style={{ width: '17rem' }}
            />
          </Form.Group>

          <Form.Group className="text-center">
            <Form.Label className="text-white">Lastname:</Form.Label>
            <Form.Control
              type="string"
              name="lastName"
              value={signUpFormState.lastname}
              onChange={onChange}
              placeholder="enter lastname"
              style={{ width: '17rem' }}
            />
          </Form.Group>

          <Form.Group className="text-center">
            <Form.Label className="text-white">Username:</Form.Label>
            <Form.Control
              type="string"
              name="username"
              value={signUpFormState.username}
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
              value={signUpFormState.password}
              onChange={onChange}
              placeholder="enter password"
              style={{ width: '17rem' }}
            />
          </Form.Group>

          <Form.Group className="text-center">
            <Button
              variant="primary"
              className="bg-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default SignUpForm;
