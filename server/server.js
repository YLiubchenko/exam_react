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

///////////// PUT /////////////////////

app.put('/tests-pages/:id', async (req, res) => {
    await updateTestData(req, res);
    return res.send('update data');
})

app.put('/create-test/:id', async (req, res) => {
    await updateTestsTeacher(req, res);
    return res.send('update tests');
})

app.put('/created-tests/:test/:id', async (req, res) => {
    await updateTestsUsers(req, res);
    return res.send('update student in test');
})

/////////////// POST //////////////////////////

app.post('/registration', async (req, res) => {
    await createUser(req, res);
    return res.send('ok');
});

app.post('/login', async (req, res) => {
    await getUser(req, res);
    return res.send("ok");
});

//////// GET ///////////////
app.get('/tests-page/:id', async (req, res) => {
    await getTestData(req, res);
    return res.send("ok");
});

app.get('/results-page/:id', async (req, res) => {
    await getAllResultTest(req, res);
    return res.send("ok");
});

app.get('/created-tests/:id', async (req, res) => {
    await getTests(req, res);

    return res.send("ok");
});

app.get('/created-tests/:test/:id', async (req, res) => {
    console.log(req.params)

    await getStudentsInTests(req, res);

    return res.send("ok");
});

app.get('/created-tests/:test/:faculty/:course', async (req, res) => {
    await getStudents(req, res);

    return res.send("ok");
});


//////////////////////////////////////////////////

const createUser = async (request, response) => {
    const {fullName, email, password, isTeacher, course, faculty} = request.body;
    let isTeach_Course = 'course';
    let table = 'students';
    let idName = 'student_id';
    let testsTable = 'students_test_info';
    let param = [email, fullName, password, faculty];

    if (isTeacher) {
        table = 'teachers';
        idName = 'teacher_id';
        param.push(isTeacher);
        isTeach_Course = 'is_teacher';
        testsTable = 'teacher_tests';
    } else {
        param.push(course);
    }

    let result = await pool.query(`SELECT * FROM students FULL OUTER JOIN teachers USING (email) where email = $1`, [email]);

    if (!result.rows.length) {
        await pool.query(`INSERT INTO ${table} (email, full_name, password, faculty, ${isTeach_Course}) VALUES ($1, $2, $3, $4, $5)`, param);

        const resultIn = await pool.query(`SELECT * from ${table} where email = $1`, [email]);
        const {id, full_name, is_teacher} = resultIn.rows[0];

        await pool.query(`INSERT INTO ${testsTable} (${idName}) VALUES ($1)`, [id]);

        return await response.status(200).json({id: id, fullName: full_name, isTeacher: is_teacher});

    } else {
        return await response.status(201).json({message: 'You already registered, please login'})
    }
}

const getUser = async (request, response) => {
    const {email, password} = request.body;

    let result = await pool.query(`select * FROM students FULL OUTER JOIN teachers 
        USING (id, email, full_name, password, faculty) where email= $1`, [email]);

    if (result.rows[0].password === password) {
        const {id, full_name, is_teacher} = result.rows[0];

        return await response.status(200).json({id: id, fullName: full_name, isTeacher: is_teacher});
    } else {
        return await response.status(201).json({message: 'password not the same'});
    }
}

const getTestData = async (req, res) => {
    const {id} = req.params;

    const result = await pool.query('SELECT * from students_test_info where student_id = $1', [id]);
    const {all_tests, all_results} = result.rows[0];

    return await res.status(200).json({test: all_tests, allTests: all_results});
}

////// UPDATE /////////////////////

const updateTestData = async (req, res) => {
    const {id} = req.params;
    const {test, allTests} = req.body;

    await pool.query('UPDATE students_test_info SET all_tests = $1, all_results = $2 WHERE student_id = $3', [test, allTests, id]);
    return await res.status(200).json(req.body);
}

const updateTestsTeacher = async (req, res) => {
    const {id} = req.params;

    await pool.query('UPDATE teacher_tests SET tests = $1 WHERE teacher_id = $2', [req.body, id]);
    return await res.status(200).json(req.body);
}

const updateTestsUsers = async (req, res) => {
    const {id} = req.params;

    await pool.query('UPDATE teacher_tests SET invited_students = $1 WHERE teacher_id = $2', [req.body, id]);
    return await res.status(200).json(req.body);
}

/////////////////////////////

const getAllResultTest = async (req, res) => {
    const {id} = req.params;

    const result = await pool.query('SELECT all_results from students_test_info where student_id = $1', [id]);
    return await res.status(200).json({allTests: result.rows[0].all_results});
}

const getTests = async (req, res) => {
    const {id} = req.params;
    const result = await pool.query('SELECT tests from teacher_tests where teacher_id = $1', [id]);
    return await res.status(200).json({tests: result.rows[0].tests});
}

const getStudentsInTests = async (req, res) => {
    const {id} = req.params;

    const result = await pool.query('SELECT invited_students from teacher_tests where teacher_id = $1', [id]);
    return await res.status(200).json({students: result.rows[0].invited_students});
}

const getStudents = async (req, res) => {
    const {faculty, course} = req.params;

    const result = await pool.query('SELECT email from students where faculty = $1 AND course = $2', [faculty, course]);
    return await res.status(200).json({students: result.rows});
}

app.listen(3333, () => console.log('started'));

