import React from 'react';
import { Page, Text, View, Image } from '@react-pdf/renderer';
import { CChart } from '@coreui/react-chartjs';
import Chart from 'chart.js/auto';
const PDFDocument = ({ data }) => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 10],
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    title: {
      display: true,
      text: 'Sales Report',
    },
    legend: {
      display: false,
    },
  };

  // use useRef to store the chart ref
  const chartRef = React.useRef(null);

  // use useEffect to get the canvas element from the ref and initialize the chart
  React.useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current.getCanvas();
      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });
    }
  }, [chartRef, chartData, chartOptions]);

  return (
    <Page>
      <View>
        <Text>{data.title}</Text>
        <Image src={data.imageUrl} />
        <CChart type="line" datasets={chartData.datasets} labels={chartData.labels} data={chartData} ref={chartRef} />
      </View>
    </Page>
  );
};

export default PDFDocument;