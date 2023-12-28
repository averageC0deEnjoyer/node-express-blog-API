import './App.css';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import BlogList from './components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import BlogDetail from './components/BlogDetail';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';

//dont forget when logout , clear localStorage and clear user state
function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState();

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
          <header>
            <nav>
              <h1>Blog ? List !</h1>
              <h1>Hello {user?.firstName || `Anonymous!`}</h1>
              <Link to="/">Home </Link>
              {user ? (
                <NavLink to="logout">Log Out </NavLink>
              ) : (
                <>
                  <NavLink to="signup">Sign Up </NavLink>
                  <NavLink to="login">Log In </NavLink>
                </>
              )}
            </nav>
          </header>
          <main>
            <Routes>
              <Route index element={<BlogList blogs={blogs} />} />
              <Route path="signup" element={<SignUpForm />} />
              <Route path="login" element={<LogInForm />} />
            </Routes>
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
