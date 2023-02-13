import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const AccountBookChart = () => {
  const data = [
    {
      name: '식비',
      'This Month': 25,
      'Last Month': 20,
    },
    {
      name: '통신비',
      'This Month': 15,
      'Last Month': 15,
    },
    {
      name: '쇼핑',
      'This Month': 10,
      'Last Month': 30,
    },
    {
      name: '보험비',
      'This Month': 20,
      'Last Month': 20,
    },
    {
      name: '병원/약국',
      'This Month': 2.5,
      'Last Month': 0,
    },
    {
      name: '간식비',
      'This Month': 5,
      'Last Month': 3,
    },
    {
      name: '반료묘/견',
      'This Month': 10,
      'Last Month': 7,
    }
  ];
  return (
    <div>
      <h3>전월 비교 사용내역 (단위:만원)asdfasdfasdf asdf</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="This Month" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Last Month" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AccountBookChart