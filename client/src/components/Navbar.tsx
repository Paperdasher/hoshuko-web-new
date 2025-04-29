import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 



  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout.');
      console.error("Failed to logout:", error);
    }
  };
  

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="font-bold text-lg hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/posts" className="hover:underline">Posts</Link>
        <Link to="/minutes" className="hover:underline">Minutes</Link>
        {user?.position && (
          <Link to="/student-gov-portal" className="hover:underline">
            Gov Portal
          </Link>
        )}
        <Link to="/elections" className="hover:underline">Elections</Link>
      </div>

      <div className="flex space-x-4">
        {user ? (
          <>
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
