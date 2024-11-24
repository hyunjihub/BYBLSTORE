'use client';

import '@/app/globals.css';

import Image from 'next/image';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

export default function ProductContent({ productInfo }: { productInfo: Array<string> }) {
  const [isMoreView, setIsMoreView] = useState(false);

  return (
    <article className="max-w-5xl mt-24 mb-40">
      <div className="w-[1020px] relative flex flex-col items-center">
        {!isMoreView ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent h-96 pointer-events-none">
              {/* 이미지 그라데이션 */}
            </div>
            <div className="w-5/6 h-96">
              <Image
                className="w-full h-96 overflow-hidden object-cover object-top"
                src={productInfo[0]}
                alt="info"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>
            <button
              className="w-5/6 py-2 border border-primary text-primary font-extrabold rounded-lg flex justify-center items-center"
              onClick={() => setIsMoreView(true)}
            >
              상품 상세정보 더보기
              <IoIosArrowDown className="text-lg ml-3" />
            </button>
          </>
        ) : (
          <div className={`w-5/6`}>
            {productInfo.map((img, key) => (
              <Image
                className="w-full h-auto object-contain"
                src={img}
                alt="info"
                width={0}
                height={0}
                sizes="100vw"
                key={key}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
