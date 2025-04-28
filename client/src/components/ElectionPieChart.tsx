import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Candidate A', value: 400 },
  { name: 'Candidate B', value: 300 },
  { name: 'Candidate C', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function ElectionPieChart() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={150}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
