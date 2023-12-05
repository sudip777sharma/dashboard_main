import Image from "next/image";
import React, { useState, useEffect } from "react";

interface SliderItem {
  title: string;
  details: { [key: string]: string };
  imageSrc?: string;
}

const sliderData: SliderItem[] = [
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

const ImageSlider: React.FC = () => {
  const [items, setItems] = useState(sliderData);
  const [currentItem, setCurrentItem] = useState(0);

  const nextItem = () => {
    setCurrentItem((prevItem) => (prevItem + 1) % items.length);
  };

  const moveToItem = (index: number) => {
    setCurrentItem(index % items.length);
  };
  useEffect(() => {
    const interval = setInterval(nextItem, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`relative flex w-full gap-10 overflow-x-hidden rounded-lg bg-[#7367F0] text-white`}
    >
      <div
        style={{
          transform: `translateX(-${currentItem * 100}%)`,
        }}
        className={`flex w-full gap-10 p-6 transition duration-500 ease-out`}
      >
        {items.map((item, index) => (
          <div
            key={item.title}
            className="flex min-w-[35.5rem] items-center justify-between "
          >
            <div className="flex-col gap-6">
              <div>
                <h1 className="text-2xl font-semibold">Website Analytics</h1>
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
            <div>
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={190}
                height={190}
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-4 top-4 flex gap-2 ">
        {items.map((item, index) => (
          <div
            onClick={() => moveToItem(index)}
            key={item.title}
            className={`h-2 w-2 rounded-full ${
              currentItem == index ? "bg-white" : "bg-[#ABA4F6]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
