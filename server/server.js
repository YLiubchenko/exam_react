
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root123',
    port: '5432'
});

const client = pool.connect();

app.put('/tests-pages/:id', async (req, res) => {
    await updateTestData(req, res);
    return res.send('update data');
})

app.post('/registration', async (req, res) => {
    await createUser(req, res);
    return res.send('ok');
});

app.post('/login', async (req, res) => {
    await getUser(req, res);
    return res.send("ok");
});

app.get('/tests-page/:id', async (req, res) => {
    await getTestData(req, res);
    return res.send("ok");
});

app.get('/results-page/:id', async (req, res) => {
    await getAllResultTest(req, res);
    return res.send("ok");
});

const createUser = async (request, response) => {
    const {fullName, email, password} = request.body;
    const result = await pool.query('SELECT * from users where email = $1', [email]);
    if (!result.rows.length) {
        await pool.query('INSERT INTO users (email, full_name, password) VALUES ($1, $2, $3)', [email, fullName, password]);
        const resultIn = await pool.query('SELECT * from users where email = $1', [email]);
        await pool.query('INSERT INTO tests (user_id) VALUES ($1)', [resultIn.rows[0].id]);

        return await response.status(200).json({id: resultIn.rows[0].id, fullName: resultIn.rows[0].full_name});

    } else {
        return await response.status(201).json({message: 'You already registered, please login'})
    }
}

const getUser = async (request, response) => {
    const {email} = request.body;
    let result = await pool.query('SELECT * from users where email = $1', [email]);

    if (result.rows[0].password === request.body.password) {
        return await response.status(200).json({id: result.rows[0].id, fullName: result.rows[0].full_name});
    } else {
        return await response.status(201).json({message: 'password not the same'});
    }
}

const getTestData = async (req, res) => {
    const {id} = req.params;

    let result = await pool.query('SELECT * from tests where user_id = $1', [id]);
    return await res.status(200).json({test: result.rows[0].all_tests, allTests: result.rows[0].all_results});
}

const updateTestData = async (req, res) => {
    const {id} = req.params;

    await pool.query('UPDATE tests SET all_tests = $1, all_results = $2 WHERE user_id = $3', [req.body.test, req.body.allTests, id]);
    return await res.status(200).json(req.body);
}

const getAllResultTest = async (req, res) => {
    const {id} = req.params;

    const result = await pool.query('SELECT all_results from tests where user_id = $1', [id]);
    return await res.status(200).json({allTests: result.rows[0].all_results});

}

app.listen(3333, () => console.log('started'));

