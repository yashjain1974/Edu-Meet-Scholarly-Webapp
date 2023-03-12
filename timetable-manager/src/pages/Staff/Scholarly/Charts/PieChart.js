
import React from "react";
import { CChart } from '@coreui/react-chartjs'
const PieChart=()=>{
    return(
        
<CChart
  type="doughnut"
  
 circumference="20"
  data={{
    labels: ['Sensors', 'Web development', 'Machine learning', 'Data science'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10],
      },
    ],
  }}
/>

    )
}
export default PieChart;