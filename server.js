import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// models
import User from './models/user.model';


const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'API is LIVE!!'
    });
});


app.post('/signup', async (req, res) => {
    try {
        const {
            firstname, surname, email, password
        } = req.body;

        const user = await User.create(req.body);

        return res.json({
            status: 'success',
            data: user
        });
    } catch(error) {
        return res.json({
            status: 'error',
            message: error.message
        });
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log('error');
        return false;
    }
    console.log(`APP is running on port ${port}`);
});
