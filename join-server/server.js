const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');  // 기존 json-server 데이터 파일
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(cors());

const SECRET_KEY = '9f3$Zf2x2dTg5Qw!8pV8RsaXq2zI@PdoT3H7jHw5Vp'; // JWT 시크릿 키 -> 이건jwt서명할라고 서버측에 설정한 고정값(=임의로 생성산 긴 랜덤문자열임)

const expiresIn = '1h'; // 토큰 유효기간

// 유저 데이터 로드 함수
const getUsers = () => {
    const db = JSON.parse(fs.readFileSync('db.json', 'UTF-8'));
    return db.join || [];
};

// 로그인 엔드포인트 (JWT 발급)
server.post('/login', (req, res) => {
    const { joinID, joinPW } = req.body;
    const users = getUsers();
    const user = users.find(u => u.joinID === joinID);

    if (!user) {
        return res.status(401).json({ message: '아이디가 존재하지 않습니다.' });
    }

    // 비밀번호 비교
    bcrypt.compare(joinPW, user.joinPW, (err, isMatch) => {
        if (err) return res.status(500).json({ message: '서버 오류' });

        if (!isMatch) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // JWT 발급 (비밀번호는 제외함 안그러면, 네트워크>헤더>페이로드 비번 다나옴)
        const token = jwt.sign({ joinID: user.joinID }, SECRET_KEY, { expiresIn });
// console.log(`token = ${JSON.stringify(token)}`);
        // 비밀번호를 제외하고 필요한 정보만 응답에 포함
        const { joinPW, ...userWithoutPassword } = user; // 비밀번호 제외
        // res.json({ token, user: {joinId: user.joinID, name: user.name} }); // 비번제외
        res.json({ token, user: userWithoutPassword }); // 비번제외한 정보만 응답
    });
// console.log('로그인 요청 데이터', req.body);
});

// 기존 json-server 라우터 연결
server.use(router);  // 반드시 마지막에 추가

server.use((req, res, next) => {
    const token = req.headers['authorization'];  // Authorization 헤더에서 토큰 가져오기

    if (!token) {
        return res.status(403).json({ message: '토큰이 없습니다.' });
    }

    // 'Bearer <token>' 형식이므로, 'Bearer '을 제거하고 실제 토큰만 추출
    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
        }
        
        // 토큰이 유효하면, 요청된 데이터와 함께 다음 미들웨어로 이동
        req.user = decoded;  // 디코딩된 사용자 정보를 요청에 추가
        next();
    });
});

// 이후 라우트에서 `req.user`를 사용해 인증된 사용자 정보에 접근 가능
server.get('/date', (req, res) => {
    console.log('인증된 사용자:', req.user);  // 인증된 사용자 정보 확인
    res.json({ message: '인증이 완료되었습니다.' });
});

// JWT 검증 미들웨어
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']; // 헤더에서 토큰을 받아옴

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // 토큰이 유효하지 않으면 403 (Forbidden)
            }
            req.user = user; // 인증된 사용자 정보를 요청 객체에 추가
            next(); // 다음 미들웨어로 진행
        });
    } else {
        res.sendStatus(401); // 토큰이 없으면 401 (Unauthorized)
    }
};

// 예시: 로그인 후 인증이 필요한 API에 미들웨어 적용
server.use('/protected', authenticateJWT, (req, res) => {
    res.json({ message: '인증된 사용자만 접근할 수 있습니다.', user: req.user });
});

// 서버 실행
server.listen(3000, () => {
    console.log('JSON Server with JWT is running on port 3000');
});
