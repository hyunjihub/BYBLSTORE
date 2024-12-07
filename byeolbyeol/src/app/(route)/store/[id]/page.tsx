'use client';

import '@/app/globals.css';

import ContentLoader from 'react-content-loader';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const StoreInfo = dynamic(() => import('@/app/(components)/_store/StoreInfo'), {
  ssr: false,
  loading: () => (
    <ContentLoader
      speed={2}
      width={1020}
      height={234}
      viewBox="0 0 1020 294"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="20" rx="4" ry="4" width="384" height="200" />
      <rect x="420" y="40" rx="4" ry="4" width="120" height="20" />
      <rect x="420" y="70" rx="4" ry="4" width="200" height="40" />
      <rect x="870" y="70" rx="4" ry="4" width="144" height="40" />
      <rect x="420" y="120" rx="4" ry="4" width="110" height="20" />
      <rect x="450" y="120" rx="4" ry="4" width="150" height="14" />
      <rect x="450" y="170" rx="4" ry="4" width="300" height="24" />
    </ContentLoader>
  ),
});

const StoreProduct = dynamic(() => import('@/app/(components)/_store/StoreProducts'), {
  ssr: false,
  loading: () => (
    <ContentLoader
      speed={2}
      width={1020}
      height={294}
      viewBox="0 0 1020 294"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="238" height="160" />
      <rect x="0" y="165" rx="4" ry="4" width="120" height="20" />
      <rect x="0" y="190" rx="4" ry="4" width="200" height="48" />
      <rect x="0" y="245" rx="4" ry="4" width="100" height="24" />

      <rect x="260" y="0" rx="4" ry="4" width="238" height="160" />
      <rect x="260" y="165" rx="4" ry="4" width="120" height="20" />
      <rect x="260" y="190" rx="4" ry="4" width="200" height="48" />
      <rect x="260" y="245" rx="4" ry="4" width="100" height="24" />

      <rect x="520" y="0" rx="4" ry="4" width="238" height="160" />
      <rect x="520" y="165" rx="4" ry="4" width="120" height="20" />
      <rect x="520" y="190" rx="4" ry="4" width="200" height="48" />
      <rect x="520" y="245" rx="4" ry="4" width="100" height="24" />

      <rect x="770" y="0" rx="4" ry="4" width="238" height="160" />
      <rect x="770" y="165" rx="4" ry="4" width="120" height="20" />
      <rect x="770" y="190" rx="4" ry="4" width="200" height="48" />
      <rect x="770" y="245" rx="4" ry="4" width="100" height="24" />
    </ContentLoader>
  ),
});

export default function StoreDetail() {
  const { id } = useParams();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <article className="w-[1020px] mt-32 mx-auto flex flex-col items-center">
        <h2 className="font-black text-3xl">STORE</h2>
        <StoreInfo storeId={Number(id)} />
      </article>
      <article className="w-[1020px] mt-24 mb-40 mx-auto flex flex-col items-center">
        <h2 className="font-black text-3xl mb-8">PRODUCT</h2>
        <StoreProduct storeId={Number(id)} />
      </article>
    </section>
  );
}
