const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const users = {};
let nextId = 1;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html')); //'users.html'붙이기기
});

app.use(express.static('public'));  //public 폴더 내의 정적 파일들을 제공하는 미들웨어

app.get('/users', (req, res) => {
    res.send(users); 
}); // 조회

app.post('/users', (req, res) => {
    console.log('사용자 추가', req.body);
    const name = req.body.name; //name 선언먼저 하기
    users[nextId++] = name;  // ID 하나씩 +
    res.send('사용자 추가');
});

app.put('/users/:id', (req, res) => {
    console.log('사용자 정보 수정');
    const id = req.params.id; //url에서 가져온 id
    users[id] = req.body.name;

    res.send('사용자 정보 수정');
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id; // 아이디 정의해야 삭제할 아이디 선택가능
    delete users[id];
    res.send('삭제 완료');
    console.log(`사용자삭제제`);
});

app.listen(port, () => {
    console.log(`서버 레디~${port}`);
});