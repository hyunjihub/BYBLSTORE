'use client';

import '@/app/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import chiikawa from '/public/images/chiikawa.jpg';
import sanrio from '/public/images/sanrio.jpg';
import shinchan from '/public/images/shinchan.png';

export default function RecommendCategories() {
  return (
    <div className="w-[1020px] mt-10 mx-auto flex justify-center gap-8">
      <Link className="text-xs font-bold text-center" href={'/search?word=먼작귀'}>
        <div className="w-16 h-16 relative rounded-full mb-2">
          <Image className="object-cover rounded-full" src={chiikawa} alt="먼작귀" fill />
        </div>
        먼작귀
      </Link>

      <Link className="text-xs font-bold text-center" href={'/search?word=산리오'}>
        <div className="w-16 h-16 relative rounded-full mb-2">
          <Image className="object-cover rounded-full" src={sanrio} alt="산리오" fill />
        </div>
        산리오
      </Link>

      <Link className="text-xs font-bold text-center" href={'/search?word=짱구'}>
        <div className="w-16 h-16 relative rounded-full mb-2">
          <Image className="object-cover rounded-full" src={shinchan} alt="짱구" fill />
        </div>
        짱구
      </Link>
    </div>
  );
}
