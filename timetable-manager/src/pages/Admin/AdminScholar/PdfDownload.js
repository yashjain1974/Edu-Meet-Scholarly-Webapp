import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './pdfDocGeanerate';

const PdfDownload = () => {
  const jsonData = {
    title: 'My Sales Report',
    imageUrl: 'https://example.com/image.jpg',
  };

  return (
    <div>
      <PDFDownloadLink document={<PDFDocument data={jsonData} />} fileName="sales_report.pdf">
        Download PDF
      </PDFDownloadLink>
    </div>
  );
};

export default PdfDownload;