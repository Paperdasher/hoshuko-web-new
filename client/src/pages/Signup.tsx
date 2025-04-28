import { useState } from 'react';
import { signup } from '../api/auth';

export default function Signup() {
  const [form, setForm] = useState({
    studentId: '',
    password: '',
    name: '',
    furigana: '',
    romajiName: '',
    grade: '中1',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signup(form);
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="studentId" placeholder="6 digit ID" value={form.studentId} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="furigana" placeholder="フリガナ" value={form.furigana} onChange={handleChange} />
      <input name="romajiName" placeholder="Name in ローマ字" value={form.romajiName} onChange={handleChange} />
      <select name="grade" value={form.grade} onChange={handleChange}>
        {['中1', '中2', '中3', '高1', '高2'].map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <input name="email" placeholder="Email (@nyhoshuko.org)" value={form.email} onChange={handleChange} />
      <button type="submit">Create Account</button>
    </form>
  );
}
