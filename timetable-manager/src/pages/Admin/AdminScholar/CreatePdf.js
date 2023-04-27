import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import classes from './CreatePdf.module.css'


function CreatePdf({tableData,head}) {

  function generatePDF() {
   
    // Define the table headers
    const headers = head;

    // Define the table styles
    const styles = {
      fontSize: 5,
      fontStyle: 'bold',
      cellPadding: 2,
      // overflow: 'linebreak',
      // halign: 'center',
      // valign: 'middle',
      fillColor: [255, 150, 136],
      textColor: [0, 0, 0],
    };

    // Create a new PDF document
    const doc = new jsPDF();

    // Add the table to the document
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 10,
      styles: styles,
      didDrawPage: function (data) {
        // Add a header to the PDF document
        doc.setFontSize(18);
        doc.setTextColor(20);
       
        doc.text('Scholar Data', data.settings.margin.bottom, 10);
      },
      margin: { top: 50 },
    });

    // Save the document
    doc.save('table.pdf');
  }

  return (
    <div>
   
      <button className={classes.btn} onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default CreatePdf;