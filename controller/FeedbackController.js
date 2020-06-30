const Feedback = require('../models').Feedback;
const Teacher = require('../models').Teacher;
const Parent = require('../models').Parent;

var PdfPrinter = require('pdfmake');
var fs = require('fs');
const { array } = require('../uploader');

exports.create = async (req, res) => {
    try {
        const createdFeedback = await Feedback.create({
            description: req.body.description,
            teacherId: req.body.teacherId,
            parentId: req.body.parentId
        });
        res.status(200).json({ createdFeedback, msg: 'Feedback has been created successfully', success: true })
    } catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
};


exports.findOne = async (req, res) => {
    try {
        const feedback = await Feedback.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Teacher,
                },
                {
                    model: Parent
                }
            ]
        });
        res.status(200).json({ feedback, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}


exports.findFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: Teacher,
                },
                {
                    model: Parent
                }
            ]
        });
        res.status(200).json({ feedbacks, success: true });
    }
    catch (err) {
        res.status(400).json({ err, success: false })
    }
}

exports.delete = async (req, res) => {
    try {
        await Feedback.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: 'Feedback has been deleted succesfully', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}


exports.generateReport = async (req, res) => {
    try {

        let feedbacksReportsBody = [['ID', 'Description', 'Created By', 'Made For']]
        req.body.forEach(feedback => {
            feedbacksReportsBody.push([
                feedback.id,
                feedback.description,
                `${feedback.Parent.name} ${feedback.Parent.surname}`,
                `${feedback.Teacher.name} ${feedback.Teacher.surname}`])
        });

        console.log(feedbacksReportsBody);
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
                    { text: 'Feedbacks Reports', alignment: 'center', margin: [0, 12] }
                ]
            },
            content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 'auto', 100, '*'],
                        body: feedbacksReportsBody
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
        pdfDoc.pipe(fs.createWriteStream(`reports/${Date.now()}feedbackReports.pdf`));
        pdfDoc.end();
        res.status(200).json({ msg: 'Reports generated', success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err, success: false })
    }
}