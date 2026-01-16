import PDFDocument from 'pdfkit'; // PDF banane ke liye use hoti hai & Text, font size, alignment sab control kar sakte ho
import fs from "fs";// file system module for file operations & File create / write / read karne ke kaam aati hai

//nput me complaint object aata hai (name, title, description, location, etc.

export const generateComplaintPDF = (complaint) => {
    return new Promise((resolve, reject) => {
        // Ensure tmp folder exists
    const dir = "./tmp";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }


        const doc =new PDFDocument(); //Ek naya blank PDF create ho gaya
        const filePath =`./tmp/complaint_${Date.now()}.pdf`; //tmp folder me PDF save hogi
        const stream=fs.createWriteStream(filePath); // PDF ka data file me likhne ke liye stream
        doc.pipe(stream); // PDFDocument → file stream → PDF file

        // heading
        doc.fontSize(18).text("Complaints Application", {align: 'center'});
        doc.moveDown();
        // department
        doc.fontSize(12).text(`To:${complaint.department} Lucknow`);
        doc.moveDown();
        // Subject
        doc.text(`Subject:${complaint.title}`);
        doc.moveDown();
        // body
        doc.text(`Respected Sir/Madam,`);
        doc.text(`I,${complaint.name}, would like to bring to your attention the following issue:`);
        doc.moveDown();
        doc.text(complaint.description);
        doc.moveDown();
        // Contact info
        doc.text(`Contact:${complaint.mobile}, Email: ${complaint.email}`);
        if(complaint.address){
            doc.text(`Address: ${complaint.address}`);
            doc.moveDown();
        }
        // location( Longitude & Latitude)
        if(complaint.location){
            doc.text(`Location Details: Lat ${complaint.location.lat}, Lng: ${complaint.location.lng}`);
            doc.moveDown();
        }
        // closing
        doc.text(`Sincerely, ${complaint.name}`);
        doc.end(); // PDF generation complete

        stream.on('finish', () => 
            resolve(filePath)); // PDF file ka path return kar rahe hain
            stream.on('error', reject);

        });
    };

