import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (elementId, filename = 'Teklif_Formu.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // We use onclone to modify the cloned document used for capture.
    // This allows us to capture the element even if it's transformed/scaled or tricky on mobile.
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Reset transform/scale on the clone so it captures at original size
          clonedElement.style.transform = 'scale(1)';
          clonedElement.style.margin = '0';
          clonedElement.style.position = 'relative';
          clonedElement.style.left = '0';
          clonedElement.style.top = '0';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.display = 'flex'; // Ensure it's not hidden
          
          // Force container to fit content if necessary
          const parent = clonedElement.parentElement;
          if (parent) {
            parent.style.display = 'block';
            parent.style.width = 'auto';
            parent.style.height = 'auto';
            parent.style.overflow = 'visible';
          }
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');
    
    // A4 size in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;
    
    let finalWidth = pdfWidth;
    let finalHeight = finalWidth / imgRatio;

    // Correct if it exceeds page height
    if (finalHeight > pdfHeight) {
      finalHeight = pdfHeight;
      finalWidth = finalHeight * imgRatio;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight, undefined, 'FAST');
    pdf.save(filename);
    
    return true;
  } catch (err) {
    console.error("PDF generation failed", err);
    return false;
  }
};
