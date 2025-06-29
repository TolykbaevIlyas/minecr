// /src/entities/modBlock/Modblock.tsx
"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { useRouter } from "next/navigation"; // Next 13+ App Router
import { Mod } from "@/shared/store/modsStore";
import { AddToPackModal } from "@/features/addToPack";

type Props = {
  mod: Mod;
};

export const Modblock: FC<Props> = ({ mod }) => {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    // Переход на страницу /mod/[id]
    router.push(`/mod/${mod.id}`);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // чтобы не срабатывал handleCardClick
    // Открываем downloadUrl в новой вкладке
    window.open(mod.downloadUrl, "_blank");
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`
        cursor-pointer 
        flex flex-col justify-between 
        bg-blockbg border-border border-[3px] border-solid 
        rounded-[10px] p-[20px] 
        max-w-[600px] w-full h-[200px]
        hover:shadow-lg transition-shadow
      `}
      >
        {/* Верхняя часть: картинка + название/описание + кнопки */}
        <div className="flex justify-between">
          {/* Боковой блок: картинка + текст */}
          <div className="flex gap-[10px]">
            <div className="relative w-[100px] h-[100px] flex-shrink-0">
              <Image
                src={mod.imageUrl}
                alt={`Обложка ${mod.name}`}
                fill
                className="rounded-[10px] object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="text-accent text-lg font-semibold">{mod.name}</h4>
              <p className="text-sm text-gray-300 line-clamp-3">
                {mod.description}
              </p>
            </div>
          </div>

          {/* Иконки «плюс» и «скачать» */}
          <div className="flex flex-col items-end gap-[10px]">
            {/* Кнопка «добавить в сборку» */}
            <button
              type="button"
              onClick={handleAddClick}
              className="p-[4px] hover:bg-gray-700 rounded"
              aria-label="Добавить в сборку"
            >
              <Image
                src="/images/icons/plus.svg"
                alt="Добавить"
                width={14}
                height={14}
              />
            </button>

            {/* Кнопка «скачать» */}
            <button
              type="button"
              onClick={handleDownloadClick}
              className="p-[4px] hover:bg-gray-700 rounded"
              aria-label="Скачать мод"
            >
              <Image
                src="/images/icons/download.svg"
                alt="Скачать"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>

        {/* Нижняя часть: рейтинг, версия, тип/жанр */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-[5px]">
              <Image
                src="/images/icons/star.svg"
                alt="Рейтинг"
                width={18}
                height={18}
              />
              <span className="text-starring text-sm">{mod.stars}</span>
            </div>
            <p className="mt-[4px] text-xs text-gray-400">
              version: {mod.version}
            </p>
          </div>

          <div className="text-right text-xs">
            <p>{mod.type.join(", ")}</p>
            <p>{mod.genre.join(", ")}</p>
          </div>
        </div>
      </div>
      <AddToPackModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        modId={mod.id}
      />
    </>
  );
};
