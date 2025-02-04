const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

server.use(cors(corsOptions));
server.use(jsonServer.bodyParser);
server.use(middlewares);

// 프리플라이트 요청 처리
server.options('*', cors());

const SECRET_KEY = '9f3$Zf2x2dTg5Qw!8pV8RsaXq2zI@PdoT3H7jHw5Vp';
const expiresIn = '1h';

// 유저 데이터 로드 함수
const getUsers = () => {
    const db = JSON.parse(fs.readFileSync('db.json', 'UTF-8'));
    return db.join || [];
};

// 로그인 엔드포인트
server.post('/login', (req, res) => {
    const { joinID, joinPW } = req.body;
    const users = getUsers();
    const user = users.find(u => u.joinID === joinID);

    if (!user) {
        return res.status(401).json({ message: '아이디가 존재하지 않습니다.' });
    }

    bcrypt.compare(joinPW, user.joinPW, (err, isMatch) => {
        if (err) return res.status(500).json({ message: '서버 오류' });

        if (!isMatch) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        const token = jwt.sign({ joinID: user.joinID }, SECRET_KEY, { expiresIn });
        const { joinPW, ...userWithoutPassword } = user;
        res.json({ token, user: userWithoutPassword });
    });
});

server.use(router);

server.use((req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: '토큰이 없습니다.' });
    }

    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
        }

        req.user = decoded;
        next();
    });
});

server.get('/date', (req, res) => {
    res.json({ message: '인증이 완료되었습니다.' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server with JWT is running on port ${PORT}`);
});
