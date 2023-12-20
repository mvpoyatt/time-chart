import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from './utils/Types';
import './App.css'

function App() {
  const [data, setData] = useState<Array<DataPoint>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      const newPoint: DataPoint = {
        name: String(Date.now()),
        uv: randomNumber
      }
      setData((prev) => {
        const newData = [...prev, newPoint];
        if (newData.length > 60) {
          newData.shift();
        }
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-2/3 w-[1000px] mb-2'>
      <h1>Current Data:</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default App
