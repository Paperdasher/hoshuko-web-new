import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function PostAnnouncementPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user || !user.position || user.position === 'Treasurer') {
      toast.error('Access denied.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) formData.append('file', file);

    try {
      await axios.post('/api/announcements', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Announcement posted!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to post.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Post an Announcement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="w-full p-2 border rounded" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={6} className="w-full p-2 border rounded" required></textarea>
        <input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} accept="application/pdf" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post</button>
      </form>
    </div>
  );
}
