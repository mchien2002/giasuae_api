const classRouter = require('./src/routes/class_routes');
const express = require('express');
const app = express();
const { createLogger } = require('winston');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const newClassRoutes = require('./src/routes/newclass_routes');
const categoryRoutes = require('./src/routes/category_routes');
const subjectRoutes = require('./src/routes/subject_routes');
const postRoutes = require('./src/routes/post_routes');
const salRoutes = require('./src/routes/salaryinfo_routes');
const transRoutes = require('./src/routes/transaction_routes');
const tutorRoutes = require('./src/routes/tutor_routes');
const adminRoutes = require('./src/routes/login_routes');
const logger = createLogger();
dotenv.config();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));
app.use((req, res, next) => {
    console.log("------------REQUEST------------");
    console.log("url: ", req.url);
    console.log("body: ", req.body);
    console.log("params: ", req.params);
    console.log("query: ", req.query);
    console.log("headers: ", req.headers);
    console.log("------------RESPONSE------------");
    console.log("url: ", req.url);
    let oldSend = res.send;
    res.send = function (data) {
        console.log("body: ", data);
        oldSend.apply(res, arguments);
    }
    next();
});
app.get('/', (req, res) => res.send('WELCOME TO GIASUANHEM!'));

// INIT ROUTES
app.use(BASE_URL, classRouter);
app.use(BASE_URL, newClassRoutes);
app.use(BASE_URL, categoryRoutes);
app.use(BASE_URL, subjectRoutes);
app.use(BASE_URL, postRoutes);
app.use(BASE_URL, salRoutes);
app.use(BASE_URL, transRoutes);
app.use(BASE_URL, tutorRoutes);
app.use(BASE_URL, adminRoutes);

app.listen((PORT), () => {
    console.log("######  SERVER IS RUNNING  ######");
});
