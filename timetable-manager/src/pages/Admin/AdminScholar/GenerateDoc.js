import React, { useRef,useEffect,useState } from 'react';
import html2pdf from 'html2pdf.js';
import ScholarDetail from './ScholarDetail';
import styled from 'styled-components';
import BarChart from '../../Staff/Scholarly/Charts/BarChart';
import { Button } from '@mui/material';
import DataList from '../../../components/Layout/DataList';
import { position } from '@chakra-ui/react';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Picture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 30px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Citation = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const TotalPublications = styled.p`
  font-size: 18px;
`;

const CitesPerYearContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const CitesPerYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Year = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Count = styled.p`
  font-size: 20px;
`;

const CountsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const CountItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const CountYear = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const CountValue = styled.p`
  font-size: 20px;
`;

function MyComponent() {

  const componentRef = useRef(null);
  const [citationdata, setCitationData] = useState([]);
  useEffect(() => {
    fetch('/citation.json')
      .then(response => response.json())
      .then(data => {
        setCitationData(data)
        console.log(typeof data);
      })
      .catch(error => console.error(error));
  }, []);


const [query, setQuery] = useState('');
const [result, setResult] = useState(null);
 
   
  
    function searchName() {
      for (const key in citationdata) {
        const value = citationdata[key];
        if (value.name.toLowerCase() === query.toLowerCase()) {
          setResult(value);
          return;
        }
      }
      setResult(null);
    }
    

  const generatePdf = () => {
    
    const options = {
      filename: 'component.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
  
    html2pdf()
      .set(options)
      .from(componentRef.current)
      .save();
  
  }

  return (
    <div style={{
       
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position:"relative",
        right:'30%',
       
      }}>
      <Name>Search For scholar here</Name>
        <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} style={{
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          marginRight: '10px',
          width: '300px',
        }} />
      <button onClick={searchName} style={{
          background: '#007bff',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          minWidth: '50px',
        }}>Search</button>
      {result ? (
        <div>
          <h2>{result.name}</h2>
          <p>Citation count: {result.citation}</p>
          <p>Total publications: {result.total_pub}</p>
        </div>
      ) : (
        <p>Name not found</p>
      )}
    </div>
        
        {result && <Button onClick={generatePdf}>Generate PDF</Button>}
    {result && <div ref={componentRef}>
     
        <Container>
      <ProfileContainer>
        <Picture src={result.url_picture} alt={result.name} />
        <ProfileDetails>
          <Name>{result.name}</Name>
          <Citation>Citations: {result.citation}</Citation>
          <TotalPublications>Total Publications: {result.total_pub}</TotalPublications>
        </ProfileDetails>
      </ProfileContainer>
      <Name>Citation per year</Name>
      <CitesPerYearContainer>
        {/* {Object.entries(profile.cites_per_year).map(([year, count]) => (
          <CitesPerYear key={year}>
            <div>{year}</div>
            <div>{count}</div>
          </CitesPerYear>
        ))} */}
        
         <BarChart bardata={result.cites_per_year} title="citation" label="year" color="blue"></BarChart>
      </CitesPerYearContainer>
      <Name>Publication per year</Name>
      <CountsContainer>
        {/* {Object.entries(profile.counts).map(([year, count]) => (
          <CountItem key={year}>
            <CountYear>{year === "N/A" ? "Unknown" : year}   <CountValue>{count}</CountValue></CountYear>
          
          </CountItem>
        ))} */}
          
        <BarChart bardata={result.counts} title="Counts" label="month" color="brown"></BarChart>

      </CountsContainer>
    </Container>
      
      </div>
}
      
    </div>
  );
}

export default MyComponent;



