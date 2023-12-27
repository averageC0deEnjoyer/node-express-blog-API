import './App.css';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import BlogList from './components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/blogs')
      .then((res) => {
        setBlogs(res.data.data);
        setLoading(false);
        setError('');
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div>Hello world</div>
      <div>Hello world</div>
      {/* <SignUpForm /> */}
      <SignUpForm />
      <BlogList blogs={blogs} />
    </>
  );
}

export default App;
