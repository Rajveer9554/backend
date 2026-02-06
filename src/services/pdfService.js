// import PDFDocument from 'pdfkit'; // PDF banane ke liye use hoti hai & Text, font size, alignment sab control kar sakte ho
// import fs from "fs";// file system module for file operations & File create / write / read karne ke kaam aati hai

// //nput me complaint object aata hai (name, title, description, location, etc.

// export const generateComplaintPDF = (complaint) => {
//     return new Promise((resolve, reject) => {
//         // Ensure tmp folder exists
//     const dir = "./tmp";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }


//         const doc =new PDFDocument(); //Ek naya blank PDF create ho gaya
//         const filePath =`./tmp/complaint_${Date.now()}.pdf`; //tmp folder me PDF save hogi
//         const stream=fs.createWriteStream(filePath); // PDF ka data file me likhne ke liye stream
//         doc.pipe(stream); // PDFDocument → file stream → PDF file

//         // heading
//         doc.fontSize(18).text("Complaints Application", {align: 'center'});
//         doc.moveDown();
//         // department
//         doc.fontSize(12).text(`To:${complaint.department} Lucknow`);
//         doc.moveDown();
//         // Subject
//         doc.text(`Subject:${complaint.title}`);
//         doc.moveDown();
//         // body
//         doc.text(`Respected Sir/Madam,`);
//         doc.text(`I,${complaint.name}, would like to bring to your attention the following issue:`);
//         doc.moveDown();
//         doc.text(complaint.description);
//         doc.moveDown();
//         // Contact info
//         doc.text(`Contact:${complaint.mobile}, Email: ${complaint.email}`);
//         if(complaint.address){
//             doc.text(`Address: ${complaint.address}`);
//             doc.moveDown();
//         }
//         // location( Longitude & Latitude)
//         if(complaint.location){
//             doc.text(`Location Details: Lat ${complaint.location.lat}, Lng: ${complaint.location.lng}`);
//             doc.moveDown();
//         }
//         // closing
//         doc.text(`Sincerely, ${complaint.name}`);
//         doc.end(); // PDF generation complete

//         stream.on('finish', () => 
//             resolve(filePath)); // PDF file ka path return kar rahe hain
//             stream.on('error', reject);

//         });
//     };
import PDFDocument from "pdfkit";
import fs from "fs";

export const generateComplaintPDF = (complaint) => {
  return new Promise((resolve, reject) => {
    // Ensure tmp folder exists
    const dir = "./tmp";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const filePath = `./tmp/complaint_${Date.now()}.pdf`;
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    /* ---------------- HEADER ---------------- */
    doc
      .fontSize(18)
      .font("Times-Bold")
      .text("Complaint Application", { align: "center" });

    doc.moveDown(2);

    /* ---------------- DATE ---------------- */
    doc
      .fontSize(11)
      .font("Times-Roman")
      .text(`Date: ${new Date().toLocaleDateString()}`, {
        align: "right",
      });

    doc.moveDown(1.5);

    /* ---------------- TO ADDRESS ---------------- */
    doc
      .font("Times-Bold")
      .text("To,");

    doc
      .font("Times-Roman")
      .text(`The ${complaint.department}`)
      .text("Lucknow");

    doc.moveDown(1.5);

    /* ---------------- SUBJECT ---------------- */
    doc
      .font("Times-Bold")
      .text(`Subject: ${complaint.title}`, {
        underline: true,
      });

    doc.moveDown(2);

    /* ---------------- BODY ---------------- */
    doc.font("Times-Roman").fontSize(12);

    doc.text("Respected Sir/Madam,", {
      align: "left",
    });

    doc.moveDown(1);

    doc.text(
      `I, ${complaint.name}, respectfully submit this application to bring the following issue to your kind attention:`,
      {
        align: "justify",
      }
    );

    doc.moveDown(1);

    doc.text(complaint.description, {
      align: "justify",
    });

    doc.moveDown(2);

    /* ---------------- CONTACT DETAILS ---------------- */
    doc.font("Times-Bold").text("Contact Details:");

    doc.font("Times-Roman");
    doc.text(`Mobile: ${complaint.mobile}`);
    doc.text(`Email: ${complaint.email}`);

    if (complaint.address) {
      doc.text(`Address: ${complaint.address}`);
    }

    if (complaint.location) {
      doc.text(
        `Location: Latitude ${complaint.location.lat}, Longitude ${complaint.location.lng}`
      );
    }

    doc.moveDown(2);

    /* ---------------- CLOSING ---------------- */
    doc.text(
      "I kindly request you to look into this matter at the earliest and take the necessary action.",
      {
        align: "justify",
      }
    );

    doc.moveDown(2);

    doc.text("Thanking you,", {
      align: "left",
    });

    doc.moveDown(2);

    doc.text(`Yours sincerely,`);
    doc.text(complaint.name);

    /* ---------------- END ---------------- */
    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

