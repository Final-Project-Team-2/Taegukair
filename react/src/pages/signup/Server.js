const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

let verificationCode = '';

app.post('/send-code', async (req, res) => {
    const { phone } = req.body;
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await axios.post('https://kakaoapi.url/send', {
        // 여기에 카카오톡 비즈메시지 API 호출 정보를 입력합니다.
        // 예: apiKey, sender, receiver, message 등
        apiKey: '5a5421ef8c264566efa354a7f4380943',
        sender: '010-7330-8274',
        receiver: phone,
        message: `Your verification code is ${verificationCode}`
        });

        res.status(200).send('Verification code sent');
    } catch (error) {
        res.status(500).send('Failed to send verification code');
    }
    });

    app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (code === verificationCode) {
        res.status(200).send('Verification successful');
    } else {
        res.status(400).send('Invalid verification code');
    }
    });

    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });
