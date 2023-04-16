import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CreatePdf({ tableData }) {

  function generatePDF() {
    const myObject = {
        John: { age: 30, email: 'john@example.com' },
        Jane: { age: 25, email: 'jane@example.com' },
        Bob: { age: 50, email: 'bob@example.com' },
      };
      
      // Extract the keys and values from the object
      const keys = Object.keys(myObject);
      const values = Object.values(myObject);
      
      // Combine the keys and values into an array of arrays
      const tableData = values.map((value, index) => {
        return [keys[index], value.age, value.email];
      });
    // Define the table headers
    const headers = ['Name', 'Age', 'Email'];

    // Define the table styles
    const styles = {
      fontSize: 12,
      fontStyle: 'bold',
      cellPadding: 5,
      overflow: 'linebreak',
      halign: 'center',
      valign: 'middle',
      fillColor: [255, 150, 136],
      textColor: [0, 0, 0],
    };

    // Create a new PDF document
    const doc = new jsPDF();

    // Add the table to the document
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 20,
      styles: styles,
      didDrawPage: function (data) {
        // Add a header to the PDF document
        doc.setFontSize(18);
        doc.setTextColor(20);
       
        doc.text('My Table PDF', data.settings.margin.left, 10);
      },
      margin: { top: 50 },
    });

    // Save the document
    doc.save('table.pdf');
  }

  return (
    <div>
      <h1>Table to PDF</h1>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default CreatePdf;