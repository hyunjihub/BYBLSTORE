'use client';

import '@/app/globals.css';

import Image from 'next/image';
import main1 from '/public/images/main2.png';

export default function MainCarousel() {
  return (
    <section className="mt-5 flex gap-5 justify-center items-center">
      <div className="w-5/12 border-2 border-gray-300 rounded-lg">
        <div className="flex justify-center items-center">
          <div className="ml-10">
            <h2 className="text-2xl font-bold">어른들의 놀이터</h2>
            <h1 className="text-6xl font-black flex">
              <p className="text-yellow-400">별별</p>
              스토어
            </h1>
            <p className="mt-2 text-sm">전국의 귀여운 소품샵, 한 곳에서 모두 만나보세요!</p>
          </div>

          <div className="relative w-[340px] h-[340px] object-cover">
            <Image src={main1} alt="main-carousel" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
