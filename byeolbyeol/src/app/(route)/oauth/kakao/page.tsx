'use client';

import '@/app/globals.css';

import { OAuthProvider, signInWithCredential } from 'firebase/auth';
import { appAuth, appFirestore } from '@/firebase/config';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { Suspense } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSaveCart from '@/app/hooks/useSaveCart';
import { useSearchParams } from 'next/navigation';
import useStore from '@/store/useStore';

const KakaoRedirectPage = () => {
  const params = useSearchParams();
  const code = params.get('code');
  const { setData, userId } = useStore();
  const router = useRouter();

  useSaveCart(userId);

  useEffect(() => {
    const handleKaKaoLogin = async () => {
      const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API,
          client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
          redirect_uri: 'https://byblstore.vercel.app/oauth/kakao',
          code: code,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      const accessToken = tokenResponse.data.access_token;
      const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const user = userResponse.data;

      const provider = new OAuthProvider('oidc.kakao');
      const credential = provider.credential({ idToken: tokenResponse.data.id_token });

      signInWithCredential(appAuth, credential)
        .then(async (result) => {
          OAuthProvider.credentialFromResult(result);
          const userQuery = query(collection(appFirestore, 'users'), where('email', '==', user.kakao_account.email));

          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const newData = {
              userId: querySnapshot.docs[0].data().userId,
              profileImg: querySnapshot.docs[0].data().profileImg,
              nickname: querySnapshot.docs[0].data().nickname,
              follow: querySnapshot.docs[0].data().follow,
            };
            setData(newData);
          } else {
            const userDoc = doc(collection(appFirestore, 'users'));
            await setDoc(userDoc, {
              userId: result.user.uid,
              email: user.kakao_account.email,
              nickname: user.properties.nickname,
              profileImg: '',
              type: 'kakao',
              follow: [],
              wish: [],
              createdAt: new Date().toISOString(),
            });
          }
          router.push('/');
        })
        .catch(() => alert('로그인 도중 오류가 발생했습니다.'));
    };
    if (code) handleKaKaoLogin();
  }, [code, router, setData]);

  return <div></div>;
};

const PageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <KakaoRedirectPage />
  </Suspense>
);

export default PageWithSuspense;
