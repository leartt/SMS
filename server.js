const express = require('express');
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const passport = require('passport');

const app = express();

require('./mongoDB');

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/reports', express.static('reports'));
app.use('/exams', express.static('exams'));


app.use(passport.initialize());
require('./passport')(passport);


const auth = require('./verifyAuth');

// Route middlewares
const userRoute = require('./routes/user');
app.use('/user', userRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', auth, adminRoute);

const parentRoute = require('./routes/parent');
app.use('/parent', auth, parentRoute);

const studentRoute = require('./routes/student');
app.use('/student', auth, studentRoute);

const teacherRoute = require('./routes/teacher');
app.use('/teacher', auth, teacherRoute);

const feedbackRoute = require('./routes/feedback');
app.use('/feedback', auth, feedbackRoute);

const classroomRoute = require('./routes/classroom');
app.use('/classroom', auth, classroomRoute);

const courseRoute = require('./routes/course');
app.use('/course', courseRoute);

const examRoute = require('./routes/exam');
app.use('/exam', examRoute);

const examResultRoute = require('./routes/examResult');
app.use('/exam/results', examResultRoute);

const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));