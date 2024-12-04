const express = require('express')
var bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const path = require('path')
const fs = require('fs'); // เพิ่ม fs เพื่อใช้ในการลบไฟล์
const port = 7000
const multer = require("multer");
const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456';

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/"); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    console.log('file =', file)
    cb(null, Date.now() + "-" + (file.originalname) + path.extname(file.originalname));
    console.log('filename =', file.originalname)
  },
});
const upload = multer({ storage: storage }); // Ensure this is defined before route declarations


const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "stdactivity_25677",
  },
});
app.use(bodyParser.json())
app.use(cors());

app.use('/uploads/profile', express.static(path.join(__dirname, 'uploads/profile')));

// API สำหรับการลบสมาชิก
app.post('/deleteMember', async (req, res) => {
  const { student_id } = req.body; // รับ `student_id` จาก body

  try {
    // ค้นหาข้อมูลของสมาชิกที่ต้องการลบ
    const student = await knex('student').where({ student_id }).first();

    if (!student) {
      return res.status(404).send({ message: 'ไม่พบข้อมูลสมาชิก' });
    }

    // หากมีรูปโปรไฟล์ ให้ลบไฟล์รูปโปรไฟล์ด้วย
    if (student.picture) {
      const filePath = path.join(__dirname, 'uploads/profile', student.picture);
      // ลบไฟล์จากระบบ
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    }

    // ลบข้อมูลจากฐานข้อมูล
    await knex('student').where({ student_id }).del();

    res.send({
      message: 'ลบสมาชิกสำเร็จ',
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดขณะลบสมาชิก:', error);
    res.status(500).send({
      status: 0,
      error: error.message || 'มีบางอย่างผิดพลาด',
    });
  }
});

app.post('/updateMember', upload.single('picture'), async (req, res) => {
  try {
    const { student_id, fullname, username, password } = req.body;

    const updatedData = {
      fullname,
      username,
      password,
    };

    // ถ้ามีการอัปโหลดไฟล์รูปภาพ
    if (req.file) {
      updatedData.picture = req.file.filename; // เก็บชื่อไฟล์ที่อัปโหลด
    }

    // อัปเดตข้อมูลในฐานข้อมูล
    await knex('student')
      .where({ student_id })
      .update(updatedData);

    res.send({
      status: 1,
      message: 'อัปเดตข้อมูลสำเร็จ',
      data: updatedData,
    });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).send({
      status: 0,
      error: error.message || 'มีบางอย่างผิดพลาด',
    });
  }
});


app.post('/insertMember', upload.single('picture'), async (req, res) => {
  try {
    console.log('file=', req.file);
    console.log('username=', req.body.username);
    console.log('password=', req.body.password);
    console.log('fullname=', req.body.fullname);
    console.log('student_id=', req.body.student_id);

    // แทรกข้อมูลใหม่ในฐานข้อมูล
    let insert = await knex('student')
      .insert({
        picture: req.file.filename,
        username: req.body.username,
        password: req.body.password,
        student_id: req.body.student_id,
        fullname: req.body.fullname,
      });

    res.send({
      message: 'อัปโหลดไฟล์สำเร็จ',
      file: req.file
    });
  } catch (error) {
    res.status(500).send({
      status: 0,
      error: error.message // แก้ไขจาก .messege เป็น .message
    });
  }
});




// API สำหรับอัปโหลดหลายไฟล์
app.post('/upload-multiple', upload.array('pictures'), (req, res) => {
  console.log('data =', req.files)
  console.log('Date.now()', Date.now())
  res.send({
    message: 'อัปโหลดหลายไฟล์สำเร็จ',
    files: req.files
  });
});

// Route สำหรับการอัพโหลดโปรไฟล์
app.post('/upprofile', upload.array('pictures'), async (req, res) => {
  try {
    const { name, email } = req.body
    const pictures = req.files // รับหลายไฟล์จาก `req.files`

    // ตรวจสอบว่ามีไฟล์แนบมาหรือไม่
    if (!pictures || pictures.length === 0) {
      return res.status(400).json({ error: 'At least one picture file is required' })
    }

    // สร้าง URL ของแต่ละไฟล์
    const pictureUrls = pictures.map(file => `/uploads/${file.filename}`)

    // สามารถทำการประมวลผลข้อมูลได้ที่นี่
    res.json({
      message: 'Profile updated successfully',
      data: {
        name,
        email,
        pictureUrls // ส่ง array ของ URL กลับ
      }
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/check', async (req, res) => {
  console.log('payload =', req.body.payload)
  const activities = req.body.payload;
  try {
    // ใช้ for loop เพื่อทำการ insert ทีละรายการ
    for (const activity of activities) {
      await knex('sttendance').insert({
        student_id: activity.student_id,
        status_id: activity.attendance || 3, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 0
      });
      
    }

    // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
    res.status(200).json({ message: 'Data inserted successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.post("/check1", async (req, res) => {
  console.log("data=", req.body.payload);
  const activities = req.body.payload;
  try {
    //insert
    // ใช้ Promise.all เพื่อทำการ insert ข้อมูลทั้งหมดพร้อมกัน
    await Promise.all(
      activities.map((activity) => {
        if (activity.student_id && activity.studentName) {
          // ตรวจสอบว่ามี student_id และ studentName
          return knex("sttendance").insert({
            student_id: activity.student_id,
            status_id: activity.attendance || 3, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 0
          });
        }
      })
    );
    console.log("res=", res);
    res.status(200).json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ message: "Error inserting data" });
  }
});

app.post("/check2", async (req, res) => {
  console.log("data=", req.body.payload);
  const activities = req.body.payload;
  //insert
  try {
    // ใช้ bulk insert สำหรับการ insert ข้อมูลทั้งหมดในครั้งเดียว
    await knex('sttendance').insert(activities.map(activity => ({
      student_id: activity.student_id,
      status_id: activity.attendance || 3, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 1
    })));
    console.log('res=', res)
    // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
    res.status(200).json({ message: "Data inserted successfully insert2" });
    // res.send('ok');
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
});

app.post('/upload-single', upload.single('picture'), async (req, res) => {
  try {
  
    // อัปเดตรูปภาพในฐานข้อมูล
    const result = await knex('student')
      .where({ username: req.body.username })
      .update({ picture: req.file.filename });

    // ตรวจสอบว่าการอัปเดตสำเร็จหรือไม่
    if (result === 0) {
      return res.status(404).send({ message: 'ไม่พบข้อมูลของผู้ใช้ในฐานข้อมูล' });
    }

    // ส่งข้อความยืนยันเมื่อสำเร็จ
    res.send({
      message: 'อัปโหลดไฟล์สำเร็จ',
      file: req.file
    });
  } catch (error) {
    // จัดการข้อผิดพลาด
    console.error('Error uploading file:', error);
    res.status(500).send({ message: 'เกิดข้อผิดพลาดในระบบ', error: error.message });
  }
});

app.post('/insertStudent', async (req, res) => {
  //req.body   =>  post
  console.log('insert => ', req.body)
  try {
    let row = await knex('student')
      .insert({
        student_id: req.body.student_id,
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        picture: req.body.picture,
      })
    res.send({
      insert: 'ok',
      status: row
    })
  } catch (e) {
    res.send({ ok: 0, error: e.message });
  }
})
app.post('/deleteStudent', async (req, res) => {
  try {
    let del = await knex('student')
      .where({
        student_id: req.body.student_id
      })
      .del();
    res.send({
      del: 'ok',
      status: row
    })
  } catch (e) {
    res.send({ ok: 0, error: e.message });
  }
})
app.get('/listStudent', async (req, res) => {
  try {
    console.log('user = ', req.query)
    let row = await knex('student');
    res.send({
      'status': 'ok', 
      datas: row, 
    })
  } catch (error) {
    res.send({ ok: 0, error: error.messege });
  }
})

// http://localhost:7000/login
app.get('/login', async (req, res) => {
  console.log("username & password", req.query);
  
  try {
    let row = await knex("student").where({username: req.body.username})
    console.log("row", row);
    res.send("row", row)
  } catch (error) {
    res.send({ ok: 0, error: e.messege });
  }
})

// Route สำหรับการเข้าสู่ระบบ
app.post('/login', async (req, res) => {
  console.log('user=', req.body);

  const { username, password } = req.body;

  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await knex('student').where({ username, password }).first();

    if (user) {
      // สร้าง JWT Token
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      // ส่งข้อมูลผู้ใช้และ Token กลับไป
      res.json({ 
        token, 
        user: { id: user.id, username: user.username }
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // ดึง Header
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided or invalid format" });
  }

  // แยกคำว่า 'Bearer ' ออกจาก Token
  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  // ตรวจสอบความถูกต้องของ Token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(403).json({ message: "Invalid token" ,status: 0});
    }
    req.user = decoded; // เก็บข้อมูลผู้ใช้ใน req.user
    next();
  });
}

// Route ที่ต้องมีการยืนยันตัวตน (Protected Route)
app.get("/checktoken", authenticateToken, (req, res) => {
  const message = `Welcome ${req.user.username} to the dashboard!`;
  console.log("checktoken endpoint accessed:", message);
  res.json({ message });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
