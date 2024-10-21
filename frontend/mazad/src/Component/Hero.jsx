
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "https://i.ytimg.com/vi/rpJ0f1cuiuE/maxresdefault.jpg",
    "https://th.bing.com/th/id/R.16e965d445513dfcc5d95a0710f72c71?rik=0ZEW%2bTljPYk8Zg&pid=ImgRaw&r=0",
    "https://cs.copart.com/v1/AUTH_svc.pdoc00001/lpp/0324/dd6e5203815f4ab184e7b82f89396850_ful.jpg",
  ];

  return (
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <Slider {...settings} className="h-full">
          {images.map((image, index) => (
            <div key={index} className="h-full">
              <img
                src={image}
                alt={`slide-${index}`}
                className="object-cover object-center w-full h-full"
              />
            </div>
          ))}
        </Slider>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          ابحث عن سيارة أحلامك بأسعار لا تقبل المنافسة
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">
          انضم إلى مزادات السيارات الحصرية عبر الإنترنت لدينا واستمتع بالفخامة مقابل جزء بسيط من التكلفة.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/auctions"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            عرض المزادات
          </Link>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32"></div>
    </div>
  );
};

export default Hero;







