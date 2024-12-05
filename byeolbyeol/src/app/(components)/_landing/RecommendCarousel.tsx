'use client';

import '@/app/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

import { IProduct } from '@/app/util/types';
import MainProduct from './MainProduct';
import Slider from 'react-slick';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function RecommendCarousel() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { nickname } = useStore();
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const randomArr = Array.from({ length: 8 }, (_, index) => index + 1)
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
        const productQuery = query(collection(appFirestore, 'product'), where('productId', 'in', randomArr));
        const querySnapshot = await getDocs(productQuery);
        const products = querySnapshot.docs.map((doc) => doc.data() as IProduct);
        console.log(products);
        setProducts(products);
      } catch {
        alert('상품 정보를 불러올 수 없습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleArrowClick = (direction: string) => {
    if (sliderRef.current) {
      if (direction === 'next') sliderRef.current.slickNext();
      else sliderRef.current.slickPrev();
    }
  };

  return (
    <section className="mx-auto mt-14 flex items-center justify-center">
      <IoIosArrowBack className="text-4xl mr-4" onClick={() => handleArrowClick('prev')} />
      <div className="w-[1020px]">
        <h2 className="font-extrabold text-xl flex">
          {nickname && (
            <p>
              <span className="text-primary">{nickname}</span>
              님,&nbsp;
            </p>
          )}
          이런 상품은 어떠세요?
        </h2>
        <Slider ref={sliderRef} className="w-full mt-3" {...settings}>
          <MainProduct products={products.slice(0, 4)} />
          <MainProduct products={products.slice(4)} />
        </Slider>
      </div>
      <IoIosArrowForward className="text-4xl ml-4" onClick={() => handleArrowClick('next')} />
    </section>
  );
}
