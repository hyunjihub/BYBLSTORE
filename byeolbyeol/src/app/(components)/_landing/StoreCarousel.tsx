'use client';

import '@/app/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

import { IStore } from '@/app/util/types';
import MainStore from './MainStore';
import Slider from 'react-slick';
import { appFirestore } from '@/firebase/config';
import useStore from '@/store/useStore';

export default function StoreCarousel() {
  const [stores, setStores] = useState<IStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { nickname } = useStore();
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const storeQuery = query(collection(appFirestore, 'store'), where('storeId', 'in', [1, 2, 3, 4, 5, 6, 7, 8]));
        const querySnapshot = await getDocs(storeQuery);
        const store = querySnapshot.docs.map((doc) => doc.data() as IStore);
        setStores(store);
      } catch {
        alert('스토어 정보를 불러올 수 없습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
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
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <section className="mx-auto mt-14 flex items-center justify-center mb-32">
          {stores.length > 0 && (
            <>
              <IoIosArrowBack className="text-4xl mr-4" onClick={() => handleArrowClick('prev')} />
              <div className="w-[1020px]">
                <h2 className="font-extrabold text-xl flex">
                  {nickname && (
                    <p>
                      <span className="text-primary">{nickname}</span>
                      님,&nbsp;
                    </p>
                  )}
                  별별스토어의 다양한<p className="text-primary">&nbsp;소품샵</p>들을 소개합니다!
                </h2>
                <Slider ref={sliderRef} className="w-full mt-3" {...settings}>
                  <MainStore stores={stores.slice(0, 4)} />
                  <MainStore stores={stores.slice(4)} />
                </Slider>
              </div>
              <IoIosArrowForward className="text-4xl ml-4" onClick={() => handleArrowClick('next')} />
            </>
          )}
        </section>
      )}
    </>
  );
}
