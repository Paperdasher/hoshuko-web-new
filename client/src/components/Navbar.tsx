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
        <Link to="/" className="font-bold text-lg hover:underline">ホーム　</Link>
        <Link to="/about" className="hover:underline">生徒会とは　</Link>
        <Link to="/posts" className="hover:underline">ニュース　</Link>
        <Link to="/minutes" className="hover:underline">議事録　</Link>
        {user?.position && (
          <Link to="/student-gov-portal" className="hover:underline">
            生徒会ポータル
          </Link>
        )}
        <Link to="/elections" className="hover:underline">選挙</Link>
      </div>

      <div className="flex space-x-4">
        {user ? (
          <>
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              ログアウト
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            ログイン
          </Link>
        )}
      </div>
    </nav>
  );
}
