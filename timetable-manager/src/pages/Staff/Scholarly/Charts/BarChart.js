import React from "react";
import { CChart } from '@coreui/react-chartjs'
const BarChart=()=>{
return(
    
    <CChart
  type="bar"
  width={500}
  height={200}
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Citation:',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
      },
    ],
  }}
  labels="months"
/>
)
}

export default BarChart;