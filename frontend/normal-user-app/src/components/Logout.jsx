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
      setUser({ _id: '', firstName: '', lastName: '', username: '' });
      navigate('/');
    }
  }
  return token ? (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
      <h3 className="text-center">Are you sure you want to log out?</h3>
      <button
        onClick={handleClick}
        style={{ width: '10rem' }}
        className="btn bg-primary text-white"
      >
        Log Out
      </button>
      <button
        onClick={() => {
          navigate('/');
        }}
        style={{ width: '10rem' }}
        className="btn bg-primary text-white"
      >
        Back to Home
      </button>
    </div>
  ) : (
    <div> You are anonymous </div>
  );
};

export default Logout;
