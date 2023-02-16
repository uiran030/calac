import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashboardChart = () => {
  const data = [
    {
      name: "식비",
      "이번달": 25,
      "저번달": 20,
    },
    {
      name: "통신비",
      "이번달": 15,
      "저번달": 15,
    },
    {
      name: "쇼핑",
      "이번달": 10,
      "저번달": 30,
    },
    {
      name: "보험비",
      "이번달": 20,
      "저번달": 20,
    },
    {
      name: "병원/약국",
      "이번달": 2.5,
      "저번달": 0,
    },
    {
      name: "간식비",
      "이번달": 5,
      "저번달": 3,
    },
    {
      name: "반료묘/견",
      "이번달": 10,
      "저번달": 7,
    },
  ];
  return (
    <div>
      <h4>전월 비교 사용내역 (단위:만원)</h4>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='이번달' stackId='a' fill='#82ca9d' />
          <Bar dataKey='저번달' fill='#ffc658' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
