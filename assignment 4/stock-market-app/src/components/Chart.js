import React, { useContext, useState } from 'react'
import { mockHistoricalData } from '../constants/mock'
import { convertDateToUnixTimestamp, convertUnixTimestampToDate } from '../helpers/date-helper';
import Card from './Card';
import {
    Area, 
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import ThemeContext from '../context/ThemeContext';

const Chart = () => {
  const { darkMode } = useContext(ThemeContext);
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W");

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  return (
    <Card>
        <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default Chart

