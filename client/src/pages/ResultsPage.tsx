import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import ElectionPieChart from '../components/ElectionPieChart';

const ResultsPage = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // 5 seconds of confetti 🎉
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl font-bold mb-6">Election Results</h1>

      <ElectionPieChart /> {/* Pie chart component for votes */}
    </div>
  );
};

export default ResultsPage;
