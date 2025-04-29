import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function WriteMinutesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [minutesText, setMinutesText] = useState('');

  useEffect(() => {
    if (!user || user.position !== 'Secretary') {
      toast.error('Access restricted to Secretary.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/minutes', { content: minutesText });
      toast.success('Minutes posted!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to post minutes.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Write Meeting Minutes</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea value={minutesText} onChange={(e) => setMinutesText(e.target.value)} rows={10} className="w-full p-2 border rounded" placeholder="Enter minutes text..." required></textarea>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Submit</button>
      </form>
    </div>
  );
}
