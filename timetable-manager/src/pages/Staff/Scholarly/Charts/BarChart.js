import React from "react";
import { CChart } from '@coreui/react-chartjs'
const BarChart=(props)=>{
  let barData=props.bardata;
  console.log(barData);
  let k=[];
  const keys = Object.keys(barData);

keys.forEach(key => {
  k.push(key);
});
let v=[]
const values = Object.values(barData);
values.forEach(value=> {
  v.push(value);
});
console.log(k);
console.log(v);

return(
    
    <CChart
  type="bar"
  width={500}
  height={200}
  data={{
    labels: k,
    datasets: [
      {
        label: 'Citation:',
        backgroundColor: '#f87979',
        data: v,
      },
    ],
  }}
  labels="months"
/>
)
}

export default BarChart;