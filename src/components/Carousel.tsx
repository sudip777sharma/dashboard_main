import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
const items = [
  {
    title: "Traffic",
    details: {
      Sessions: "28%",
      Leads: "1.2k",
      "Page Views": "3.1k",
      Conversions: "12%",
    },
    imageSrc: "/card-website-analytics-1.png",
  },
  {
    title: "Spending",
    details: {
      Spend: "12h",
      Orders: "127",
      "Order Size": "18",
      Items: "2.3k",
    },
    imageSrc: "/card-website-analytics-2.png",
  },
  {
    title: "Revenue Sources",
    details: {
      Direct: "268",
      Referral: "62",
      Organic: "890",
      Campaign: "1.2k",
    },
    imageSrc: "/card-website-analytics-3.png",
  },
];
const Carousel = () => {
  return (
    <div className="rounded-lg bg-[#7367F0] text-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 1500 }}
        loop={true}
        effect="fade"
        speed={800}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {items.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full flex-col items-center justify-between p-6 md:flex-row">
                <div className="flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Website Analytics
                    </h1>
                    <p className="">Total 28.5% Conversion Rate</p>
                  </div>
                  <div className="py-4">
                    <h2 className="py-2 text-xl font-semibold">{item.title}</h2>
                    <div className="grid grid-cols-2 gap-6 font-semibold">
                      {Object.entries(item.details).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="rounded-lg bg-[#6258cc] px-3 py-1">
                            {value}
                          </span>
                          <span className="">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    width={160}
                    height={160}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default Carousel;

// import React from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Carousel = () => {
//   const items = [
//     {
//       title: "Traffic",
//       details: {
//         Sessions: "28%",
//         Leads: "1.2k",
//         "Page Views": "3.1k",
//         Conversions: "12%",
//       },
//       imageSrc: "/card-website-analytics-1.png",
//     },
//     {
//       title: "Spending",
//       details: {
//         Spend: "12h",
//         Orders: "127",
//         "Order Size": "18",
//         Items: "2.3k",
//       },
//       imageSrc: "/card-website-analytics-2.png",
//     },
//     {
//       title: "Revenue Sources",
//       details: {
//         Direct: "268",
//         Referral: "62",
//         Organic: "890",
//         Campaign: "1.2k",
//       },
//       imageSrc: "/card-website-analytics-3.png",
//     },
//   ];

//   const settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     appendDots: (dots: React.ReactNode) => (
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           right: 10,
//           width: "fit-content",
//         }}
//       >
//         <ul style={{ listStyle: "none", padding: 0 }}>{dots}</ul>
//       </div>
//     ),
//   };

//   return (
//     <div className="rounded-lg bg-[#7367F0] text-white">
//       <Slider {...settings}>
//         {items.map((item) => (
//           <div key={item.title} className="flex items-center justify-between">
//             <div className="flex flex-col items-center justify-between p-6 md:flex-row">
//               <div className="flex-col gap-6">
//                 <div>
//                   <h1 className="text-2xl font-semibold">Website Analytics</h1>
//                   <p className="">Total 28.5% Conversion Rate</p>
//                 </div>
//                 <div className="py-4">
//                   <h2 className="py-2 text-xl font-semibold">{item.title}</h2>
//                   <div className="grid grid-cols-2 gap-6 font-semibold">
//                     {Object.entries(item.details).map(([key, value]) => (
//                       <div key={key} className="flex items-center gap-2">
//                         <span className="rounded-lg bg-[#6258cc] px-3 py-1">
//                           {value}
//                         </span>
//                         <span className="">{key}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <Image
//                   src={item.imageSrc}
//                   alt={item.title}
//                   width={160}
//                   height={160}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Carousel;
