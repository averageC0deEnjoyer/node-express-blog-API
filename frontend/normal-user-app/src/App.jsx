import './App.css';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import UserLoggedIn from './components/UserLoggedIn';
import Logout from './components/Logout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';

//for bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  //to fetch data
  //later can implement pagination

  //to check if user is loggin in or not
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:3000/blogs', {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setBlogs(res.data.data);
          setLoading(false);
          setError('');
          setUser(res.data.user);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      axios
        .get('http://localhost:3000/blogs')
        .then((res) => {
          setBlogs(res.data.data);
          setLoading(false);
          setError('');
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
              <Navbar.Brand as={NavLink} to="/">
                Blog? List!{' '}
                {user.username !== ''
                  ? `Hello ${user.username}`
                  : 'Hello Anon!'}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={NavLink} to="/">
                    Home
                  </Nav.Link>
                  {user.username !== '' ? (
                    <Nav.Link as={NavLink} to="logout">
                      Log Out{' '}
                    </Nav.Link>
                  ) : (
                    <>
                      <Nav.Link as={NavLink} to="signup">
                        Sign Up{' '}
                      </Nav.Link>
                      <Nav.Link as={NavLink} to="login">
                        Log In{' '}
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <main>
            <Container className="p-3 mt-5">
              <Routes>
                <Route index element={<BlogList blogs={blogs} />} />
                <Route path="signup" element={<SignUpForm />} />
                <Route path="login" element={<LogInForm />} />
                <Route path="already-log-in" element={<UserLoggedIn />} />
                <Route path="logout" element={<Logout />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="*" element={<div>Not Available</div>} />
              </Routes>
            </Container>
          </main>
          <footer>
            <Container fixed="bottom">
              <p>test</p>
            </Container>
          </footer>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
