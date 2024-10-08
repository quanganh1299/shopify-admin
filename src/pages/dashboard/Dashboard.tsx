import { FC, useCallback, useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';
import styles from './style.module.scss';
import { Button, DatePicker } from "@shopify/polaris";
import { CalendarIcon } from '@shopify/polaris-icons';

const DashBoard: FC = () => {
  const today = new Date();
  const sixDaysAgo = new Date();
  sixDaysAgo.setDate(today.getDate() - 6);

  const [{ month, year }, setDate] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState({
    start: new Date(sixDaysAgo.toDateString()),
    end: new Date(today.toDateString()),
  });
  const [lineChartData, setLineChartData] = useState<number[]>([]);
  const [barChartData, setBarChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    [],
  );

  const generateFakeData = (start: Date, end: Date) => {
    const data: number[] = [];
    const labels: string[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      labels.push(`${day} / ${month}`);
      data.push(Math.floor(Math.random() * 100));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { data, labels };
  };

  useEffect(() => {
    const { data, labels } = generateFakeData(selectedDates.start, selectedDates.end);
    setLineChartData(data);
    setBarChartData(data.map(value => value * 5));
    setChartLabels(labels);
  }, [selectedDates]);

  const optionLineChart = {
    tooltip: {
      trigger: 'axis',
      textStyle: { fontFamily: "sans-serif" },
    },
    title: { text: 'Subscription', left: 'left' },
    xAxis: {
      type: 'category',
      data: chartLabels,
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: lineChartData,
        type: 'line',
        lineStyle: { color: '#ff69b4' },
        itemStyle: { color: '#ff69b4' },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  };

  const optionBarChart = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { fontFamily: "sans-serif" },
    },
    title: { text: 'Revenue', left: 'left' },
    xAxis: {
      type: 'category',
      data: chartLabels,
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: barChartData,
        type: 'bar',
        itemStyle: { color: '#ff69b4' },
      },
    ],
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.btn}>
          <Button
            icon={CalendarIcon}
            onClick={() => setIsShowCalendar(!isShowCalendar)}
          >
            Calendar
          </Button>
        </div>
        {isShowCalendar && (
          <DatePicker
            month={month}
            year={year}
            onChange={setSelectedDates}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            allowRange
            disableDatesAfter={today}
          />
        )}
        <div className={styles.chartContainer}>
          <ReactECharts
            option={optionLineChart}
            style={{ width: '100%', height: '321px' }}
          />
          <ReactECharts
            option={optionBarChart}
            style={{ width: '100%', height: '321px' }}
          />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
