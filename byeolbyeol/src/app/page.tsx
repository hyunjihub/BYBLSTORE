'use client';

import '@/app/globals.css';

import MainCarousel from './(components)/_landing/MainCarousel';
import RecommendCarousel from './(components)/_landing/RecommendCarousel';
import RecommendCategories from './(components)/_landing/RecommendCategories';

export default function Home() {
  return (
    <main>
      <MainCarousel />
      <RecommendCategories />
      <RecommendCarousel />
    </main>
  );
}
