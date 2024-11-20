import axios from 'axios';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const redirectUri = 'http://localhost:5000/oauth/kakao';
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API;
const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;

app.prepare().then(() => {
  const server = express();

  // 카카오 로그인 처리
  server.get('/api/oauth/kakao', async (req, res) => {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      res.status(400).send('Authorization code not provided');
      return;
    }

    try {
      const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
        params: {
          grant_type: 'authorization_code',
          client_id: KAKAO_CLIENT_ID,
          client_secret: KAKAO_CLIENT_SECRET,
          redirect_uri: redirectUri,
          code: code,
        },
      });

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResponse.data;
      console.log(user);
      res.send('카카오 로그인 성공');
    } catch (error) {
      const axiosError = error;
      console.error(axiosError.message);
      res.status(500).send('카카오 로그인 중 오류 발생');
    }
  });

  // Next.js의 클라이언트 요청 처리
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(5000, (err) => {
    if (err) {
      console.error('Error occurred while starting server:', err);
      throw err;
    }
    console.log('> Ready on http://localhost:5000');
  });
});
