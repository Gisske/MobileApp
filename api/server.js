const express = require('express')
var bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const port = 7000
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "stdactivity_2567",
    },
});

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.post('/insert', async(req, res) => {
    console.log('data= ', req.body.activities);
    const activities = req.body.activities
        //insert
    try {
        // ใช้ for loop เพื่อทำการ insert ทีละรายการ
        for (const activity of activities) {
            await knex('sttendance').insert({
                student_id: activity.student_id,
                status_id: activity.attendance || 1, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 0

            });
        }

        // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
        res.status(200).json({ message: 'Data inserted successfully' });
        // res.send('ok');
    } catch (e) {
        res.send({ status: 0, error: e.message })
    }
})

app.post('/insertStudent', async(req, res) => {
    //req.body   =>  post
    console.log('insert=', req.body)
    try {
        let row = await knex('student')
            .insert({
                fullname: req.body.fullname,
                student_id: req.body.studentID,
                email: req.body.email,
                password: req.body.password,
            })
        res.send({
            insert: 'ok',
            status: row
        })
    } catch (e) {
        res.send({ ok: 0, error: e.message });
    }
})
app.get('/listStudent', async(req, res) => {

        try {
            console.log('user=', req.query)
            let row = await knex('student');
            res.send({
                'status': "ok",
                datas: row
            })
        } catch (e) {
            res.send({ ok: 0, error: e.message });
        }
    })
    // http://localhost:7000/login
app.get('/login', (req, res) => {
    //req.query  =>  get
    //req.body   =>  post
    try {
        console.log('username & password=', req.query)
        res.send('login  ok')
    } catch (e) {
        res.send({ ok: 0, error: e.message });
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post("/insert2", async(req, res) => {
    console.log("data=", req.body.activities);
    const activities = req.body.activities;
    //insert
    try {
        // ใช้ bulk insert สำหรับการ insert ข้อมูลทั้งหมดในครั้งเดียว
        await knex('sttendance').insert(activities.map(activity => ({
            student_id: activity.studentId,
            status_id: activity.attendance || 1, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 1
        })));
        console.log('res=', res)
            // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
        res.status(200).json({ message: "Data inserted successfully insert2" });
        // res.send('ok');
    } catch (e) {
        res.send({ status: 0, error: e.message });
    }
});