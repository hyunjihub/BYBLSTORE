'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import Slider from 'react-slick';

export default function ProductImageCarousel({
  productImg,
  productName,
}: {
  productImg: Array<string>;
  productName: string;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="relative w-[450px] h-[450px]">
      {productImg.length > 1 ? (
        <Slider {...settings}>
          {productImg.map((img, key) => (
            <div className="relative w-[450px] h-[450px]" key={key}>
              <Image className="object-cover" src={img} alt={productName} fill priority />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="relative w-[450px] h-[450px]">
          <Image className="object-cover" src={productImg[0]} alt={productName} fill priority />
        </div>
      )}
    </div>
  );
}
