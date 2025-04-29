import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function StudentGovPortal() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in!');
      navigate('/login');
    } else if (!user.position) {
      toast.error('Access denied. Student Gov members only.');
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.position) return null; // don't render until checked

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Government Portal</h1>
      <p className="mb-6">Welcome, {user.name}! ({user.position})</p>

      {/* add links/buttons for gov-specific actions */}
      <div className="grid gap-4">
        <button onClick={() => navigate('/post-announcement')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Post an Announcement
        </button>
        <button onClick={() => navigate('/create-post')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create a New Post
        </button>
        {user.position === 'Secretary' && (
          <button onClick={() => navigate('/write-minutes')} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Write Meeting Minutes
          </button>
        )}
      </div>
    </div>
  );
}
