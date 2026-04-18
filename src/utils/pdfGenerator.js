import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId, filename = 'Teklif_Formu.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    // Add a class temporarily to fix any print-specific layouts if needed
    element.classList.add('pdf-rendering');

    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    element.classList.remove('pdf-rendering');

    const imgData = canvas.toDataURL('image/png');
    
    // A4 size in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;
    
    // Calculate the dimensions to fit the whole canvas into A4
    const printRatio = pdfWidth / pdfHeight;
    
    let finalWidth = pdfWidth;
    let finalHeight = finalWidth / imgRatio;

    // If the image is somehow very tall, adjust
    if (finalHeight > pdfHeight) {
      finalHeight = pdfHeight;
      finalWidth = finalHeight * imgRatio;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
    pdf.save(filename);
    
    return true;
  } catch (err) {
    console.error("PDF generation failed", err);
    return false;
  }
};
