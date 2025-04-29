import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CreatePostPage() {
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('text', text);
    if (image) formData.append('image', image);

    try {
      await axios.post('/api/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Post created!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to create post.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={heading} onChange={(e) => setHeading(e.target.value)} type="text" placeholder="Heading" className="w-full p-2 border rounded" required />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Body Text" rows={8} className="w-full p-2 border rounded" required></textarea>
        <input type="file" onChange={(e) => e.target.files && setImage(e.target.files[0])} accept="image/*" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Publish</button>
      </form>
    </div>
  );
}
