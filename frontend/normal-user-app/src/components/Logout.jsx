import { useContext, useEffect } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const token = localStorage.getItem('token');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setTimeout(() => navigate('/'), 4000);
    }
  }, []);

  function handleClick(e) {
    if (token) {
      localStorage.removeItem('token');
      setUser();
      navigate('/');
    }
  }
  return token ? (
    <>
      <div>Are you sure you want to log out?</div>
      <button onClick={handleClick}>Log Out</button>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Back to Home
      </button>
    </>
  ) : (
    <div> You are anonymous </div>
  );
};

export default Logout;
