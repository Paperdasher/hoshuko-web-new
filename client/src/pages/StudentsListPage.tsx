import { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  grade: string;
  email: string;
}

export default function StudentsListPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    axios.get('/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to load students', err));
  }, []);

  const grouped = students.reduce((acc: { [key: string]: Student[] }, student) => {
    (acc[student.grade] = acc[student.grade] || []).push(student);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Directory</h1>
      {Object.entries(grouped).sort().map(([grade, students]) => (
        <div key={grade} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{grade}</h2>
          <ul className="space-y-1">
            {students.sort((a, b) => a.name.localeCompare(b.name)).map(student => (
              <li key={student._id}>
                {student.name} — {student.email}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
