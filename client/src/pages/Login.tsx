import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  // Shared states
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // Extra signup fields
  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [romajiName, setRomajiName] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(id, password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to login.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.endsWith('@nyhoshuko.org')) {
      toast.error('Email must end with @nyhoshuko.org');
      return;
    }

    try {
      await axios.post('/api/auth/register', {
        id,
        password,
        name,
        furigana,
        romajiName,
        grade,
        email,
      });
      toast.success('Account created successfully! You can now login.');
      setIsCreatingAccount(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create account.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isCreatingAccount ? 'Create Account' : 'Login'}
        </h2>

        <form onSubmit={isCreatingAccount ? handleSignup : handleLogin} className="space-y-4">
          {/* ID */}
          <input
            type="text"
            placeholder="6-digit ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-2 border rounded"
            maxLength={6}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          {/* Only show extra fields for creating account */}
          {isCreatingAccount && (
            <>
              <input
                type="text"
                placeholder="Name (漢字)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Furigana (ふりがな)"
                value={furigana}
                onChange={(e) => setFurigana(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Romaji Name"
                value={romajiName}
                onChange={(e) => setRomajiName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />

              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Grade</option>
                <option value="中1">中1</option>
                <option value="中2">中2</option>
                <option value="中3">中3</option>
                <option value="高1">高1</option>
                <option value="高2">高2</option>
              </select>

              <input
                type="email"
                placeholder="Email (@nyhoshuko.org)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isCreatingAccount ? 'Create Account' : 'Login'}
          </button>
        </form>

        <button
          onClick={() => setIsCreatingAccount(!isCreatingAccount)}
          className="mt-4 w-full text-blue-600 hover:underline"
        >
          {isCreatingAccount ? 'Already have an account? Login' : 'Need an account? Create one'}
        </button>
      </div>
    </div>
  );
}
