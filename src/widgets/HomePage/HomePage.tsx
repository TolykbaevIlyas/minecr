import Link from "next/link";
import React from "react";

const videos = [
  {
    title: "Как установить моды",
    image: "https://i.ytimg.com/vi_webp/y0O_MhBFEWw/maxresdefault.webp",
  },
  {
    title: "Ферма мобов",
    image: "https://i.ytimg.com/vi_webp/p2fU8W6r8fE/maxresdefault.webp",
  },
  {
    title: "Домик выживания",
    image: "https://i.ytimg.com/vi_webp/FpXDQUnNoU0/maxresdefault.webp",
  },
];

const mods = [
  {
    id: 1,
    title: "Better Minecraft",
    version: "1.20",
    rating: 5,
    image: "https://i.ytimg.com/vi/oo_-PzRx8VU/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "Fabulously Optimized",
    version: "1.20.1",
    rating: 4,
    image: "https://i.ytimg.com/vi/KHDZ6Xlg8E4/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "RLCraft",
    version: "1.12.2",
    rating: 5,
    image: "https://i.ytimg.com/vi/JEJcBHBKcxc/maxresdefault.jpg",
  },
  {
    id: 4,
    title: "SkyFactory 4",
    version: "1.12.2",
    rating: 4,
    image: "https://i.ytimg.com/vi/rN20PMqR2_M/maxresdefault.jpg",
  },
  {
    id: 5,
    title: "Hexxit",
    version: "1.5.2",
    rating: 3,
    image: "https://i.ytimg.com/vi/V8Cvoa_GhZY/maxresdefault.jpg",
  },
  {
    id: 6,
    title: "All The Mods 8",
    version: "1.20",
    rating: 5,
    image: "https://i.ytimg.com/vi/k9V1RM6xck8/maxresdefault.jpg",
  },
  {
    id: 7,
    title: "Origins Mod",
    version: "1.18.1",
    rating: 4,
    image: "https://i.ytimg.com/vi/WTkF1g9or6s/maxresdefault.jpg",
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-[40px]">
      <div className="bg-[#D9D9D9] w-full h-[500px]"></div>
      <div className="text-white font-minecraft">
        <h3 className="text-xl mb-4">Моды</h3>
        <div className="w-full flex flex-wrap justify-between gap-y-6 pt-[30px]">
          {mods.map(mod => (
            <div
              key={mod.id}
              className="max-w-[160px] w-full h-[200px] border-[3px] border-[#8a6e4d] flex flex-col overflow-hidden shadow-md bg-[#2e2b25] text-xs rounded-sm"
            >
              <div className="flex-1 w-full">
                <img src={mod.image} alt={mod.title} className="w-full h-full object-cover" />
              </div>
              <div className="h-[80px] bg-[#48372F] w-full p-[10px] text-white flex flex-col justify-between">
                <h5 className="text-[11px] leading-tight">{mod.title}</h5>
                <div className="flex justify-between items-center text-[10px] text-yellow-300">
                  <span>{mod.version}</span>
                  <span>{"★".repeat(mod.rating)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link className="flex justify-center mt-[20px] text-green-400 hover:underline text-sm" href="/Mods">
          Показать больше
        </Link>
      </div>
      <div className="text-white font-minecraft">
        <h3 className="text-xl mb-4">Сборки</h3>
        <div className="w-full flex flex-wrap justify-between gap-y-6 pt-[30px]">
          {mods.map(mod => (
            <div
              key={mod.id}
              className="max-w-[160px] w-full h-[200px] border-[3px] border-[#8a6e4d] flex flex-col overflow-hidden shadow-md bg-[#2e2b25] text-xs rounded-sm"
            >
              <div className="flex-1 w-full">
                <img src={mod.image} alt={mod.title} className="w-full h-full object-cover" />
              </div>
              <div className="h-[80px] bg-[#48372F] w-full p-[10px] text-white flex flex-col justify-between">
                <h5 className="text-[11px] leading-tight">{mod.title}</h5>
                <div className="flex justify-between items-center text-[10px] text-yellow-300">
                  <span>{mod.version}</span>
                  <span>{"★".repeat(mod.rating)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link className="flex justify-center mt-[20px] text-green-400 hover:underline text-sm" href="/Mods">
          Показать больше
        </Link>
      </div>
      {/* <div>
        <h3>Руководство</h3>
        <div className="flex gap-[20px] mt-[20px]">
          {[1, 2, 3].map(id => (
            <div key={id} className="bg-[#2B2B26] p-[20px] max-w-[430px] w-full h-[300px]">
              <div className="border-[4px] max-w-[380px] h-[209px] border-solid border-[#796437]"></div>
              <h5 className="mt-[20px]">Как установить моды</h5>
            </div>
          ))}
        </div>
      </div> */}
      <div className="bg-[#1b1b1b] text-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Руководство</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video, idx) => (
            <div key={idx} className="bg-[#2b2b2b] rounded border border-[#555] overflow-hidden shadow-md">
              <div className="relative">
                <img src={video.image} alt={video.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white bg-opacity-70 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm py-2 font-minecraft">{video.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between bg-[#1b1b1b] p-6 rounded-md">
        <div className="bg-[#2b2b2b] text-white w-full max-w-xs rounded-md shadow-md">
          <h2 className="text-2xl font-bold px-4 py-3 border-b border-[#3c3c3c]">Поддержка</h2>
          <ul className="text-sm divide-y divide-[#3c3c3c]">
            <li className="px-4 py-3 flex justify-between items-center hover:bg-[#3a3a3a] cursor-pointer">
              Где скачать Minecraft? <span className="text-green-500">+</span>
            </li>
            <li className="px-4 py-3 flex justify-between items-center hover:bg-[#3a3a3a] cursor-pointer">
              Какие есть моды? <span className="text-red-400">−</span>
            </li>
            <li className="px-4 py-3 hover:bg-[#3a3a3a] cursor-pointer">Почему вылетает игра</li>
            <li className="px-4 py-3 bg-[#a38a5f] text-black font-semibold hover:bg-[#b29a6d] cursor-pointer">
              Как улучшить производительность
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md">
            Написать в поддержку
          </button>
          <div className="flex gap-4">
            <img src="/discord-icon.png" alt="Discord" className="w-10 h-10" />
            <img src="/email-icon.png" alt="Email" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
