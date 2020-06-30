// // Define font files
// var fonts = {
//     Courier: {
//         normal: 'Courier',
//         bold: 'Courier-Bold',
//         italics: 'Courier-Oblique',
//         bolditalics: 'Courier-BoldOblique'
//     },
// };

// var PdfPrinter = require('pdfmake');
// var printer = new PdfPrinter(fonts);
// var fs = require('fs');

// var docDefinition = {
//     // ...

//     header: {
//         columns: [
//             { text: 'Feedbacks Raports', alignment: 'center' }
//         ]
//     },
//     content: [
//         {
//             layout: 'lightHorizontalLines', // optional
//             table: {
//                 // headers are automatically repeated if the table spans over multiple pages
//                 // you can declare how many rows should be treated as headers
//                 headerRows: 1,
//                 widths: ['*', 'auto', 100, '*'],

//                 body: [
//                     ['ID', 'Description', 'Created By', 'For'],
//                     ['1', 'Very nice teacher', 'John Doe', 'Michael Jim'],
//                     ['2', 'Very nice teacher', 'John Doe', 'Michael Jim'],
//                 ]
//             }
//         }
//     ],
//     footer: {
//         columns: [
//             'Left part',
//             { text: 'Copyright Codeks', alignment: 'right' }
//         ]
//     },
//     defaultStyle: {
//         font: 'Courier'
//     }
// };

// var options = {
//     // ...
// }

// var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
// module.exports = pdfDoc;
// // pdfDoc.pipe(fs.createWriteStream(`reports/${Date.now()}feedbackReports.pdf`));
// // pdfDoc.end();