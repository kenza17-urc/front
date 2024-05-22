import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../slider.css';
import { Pagination } from 'swiper';
import CameraImg from '../img/IMG_6301.jpg';
import CameraImg1 from '../img/16.jpg';
import CameraImg2 from '../img/9.jpg';

const sliderData = [
  {
    img: CameraImg,
    pretitle: 'Special offre',
    titlePart1: 'economise 20%',
    titlePart2: 'avec ta',
    titlePart3: 'premiere commande',
    btnText: 'Achete maintenant',
  },
  {
    img: CameraImg1,
    pretitle: 'Special offre',
    titlePart1: 'economise 20%',
    titlePart2: 'avec ta',
    titlePart3: 'premiere commande',
    btnText: 'Achete maintenant',
  },
  {
    img: CameraImg2,
    pretitle: 'Special offre',
    titlePart1: 'economise 20%',
    titlePart2: 'avec ta',
    titlePart3: 'premiere commande',
    btnText: 'Achete maintenant',
  },
];

const MainSlider = () => {
  return (
    <Swiper
      modules={[Pagination]}
      loop={true}
      pagination={{
        clickable: true,
      }}
      className='mainSlider h-full bg-primary xl:bg-mainSlider xl:bg-no-repeat max-w-lg lg:max-w-none rounded-[8px] overflow-hidden drop-shadow-2xl'
    >
      <>
        {sliderData.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className='slideContainer flex flex-col lg:flex-row h-full p-[20px] md:p-[60px]'
                style={{ backgroundImage: `url(${slide.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {/* text */}
                <div className='w-full lg:flex-1'>
                  <div className='uppercase mb-1 text-center lg:text-left text-black'>
                    {slide.pretitle}
                  </div>
                  <div className='text-3xl md:text-[46px] font-semibold uppercase leading-none text-center lg:text-left mb-8 xl:mb-20 text-black' style={{color: '#f6cd46'}}>
                    {slide.titlePart1} <br />
                    {slide.titlePart2} <br />
                    {slide.titlePart3}
                  </div>
                  {/* <button className='btn btn-accent mx-auto lg:mx-0'>
                    Achete maintenant
                  </button> */}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </>
    </Swiper>
  );
};

export default MainSlider;

