require('express-async-errors')
require('dotenv').config()

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const connectDB = require('./db/connect');
const AuthorizeMiddleware = require('./middleware/AuthorizeMiddleware');
const notFound = require('./middleware/notFound');
const errorHandlingMiddleware = require('./middleware/errorHandler');
const authRouter = require('./routes/authRoutes');
const jobsRouter = require('./routes/jobsRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', 1)
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
app.use(express.json());

app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs', AuthorizeMiddleware,jobsRouter);
app.use(notFound);
app.use(errorHandlingMiddleware)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>console.log(`server listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();