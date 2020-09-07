const Student = require('../models').Student;
const Grade = require('../models/Grade');


var PdfPrinter = require('pdfmake');
var fs = require('fs');
var path = require('path');

exports.create = async (req, res) => {
    try {
        console.log(req.body.studentId);
        const student = await Student.findOne({ where: { id: req.body.studentId } });
        const grade = new Grade({
            student: student.dataValues,
            grade: req.body.grade,
            course: req.body.course,
            points: req.body.points
        });
        const createdGrade = await grade.save();
        res.status(200).json({ createdGrade, msg: 'Grade has been added successfully', success: true })
    } catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
};


exports.findOne = async (req, res) => {
    try {
        const grade = await Grade.findOne({ _id: req.params.id }).populate('course');
        res.status(200).json({ grade, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findGrades = async (req, res) => {
    try {
        const grades = await Grade.find().populate('course');
        res.status(200).json({ grades, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        await Grade.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: 'Grade has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}

exports.generateTranscript = async (req, res) => {
    try {
        let transcriptBody = [['Course name', 'Grade']];

        req.body.forEach(element => {
            transcriptBody.push([element.course.name, element.grade])
        });


        console.log(transcriptBody);

        // Define font files
        var fonts = {
            Courier: {
                normal: 'Courier',
                bold: 'Courier-Bold',
                italics: 'Courier-Oblique',
                bolditalics: 'Courier-BoldOblique'
            },
        };

        var printer = new PdfPrinter(fonts);


        var docDefinition = {
            // ...

            header: {
                columns: [
                    { text: 'Grades transcript', alignment: 'center', margin: [0, 12] }
                ]
            },
            content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', '*'],
                        body: transcriptBody
                    }
                }
            ],
            footer: {
                columns: [
                    { text: `Date: ${new Date().toUTCString()}`, alignment: 'left', margin: [10, 0] },
                    { text: 'Copyright 2020', alignment: 'right', margin: [10, 0] },
                ]
            },
            defaultStyle: {
                font: 'Courier',
                fontSize: 16
            }
        };

        var options = {
            // ...
        }


        var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        var chunks = []
        var result;

        pdfDoc.on('data', function (chunk) {
            chunks.push(chunk)
        });
        pdfDoc.on('end', function () {
            result = Buffer.concat(chunks)
            res.json(result.toString('base64'));
        });
        pdfDoc.end()



        // doc.getBase64(data => {
        //     res.writeHead(200, {
        //         'Content-Type': "application/pdf",
        //         "Content-Disposition": 'attachment; filename="filename.pdf"'
        //     })

        //     const download = Buffer.from(data.toString('utf-8'), 'base64');
        //     res.end(download);
        // })


        // res.status(200).json({ msg: 'Grades transcript is generated succesfully', success: true });
    } catch (error) {
        res.status(400).json({ error });
    }
}