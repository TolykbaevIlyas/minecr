// /src/app/mod/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useModsStore, Mod } from "@/shared/store/modsStore";

const ModPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { mods } = useModsStore();
  const [mod, setMod] = useState<Mod | null>(null);

  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      router.replace("/"); // если id не число — вернём на главную
      return;
    }
    const found = mods.find((m) => m.id === id) || null;
    if (!found) {
      router.replace("/"); // мод не найден
      return;
    }
    setMod(found);
  }, [params.id, mods, router]);

  if (!mod) {
    return <div className="p-6 text-center">Загрузка или мод не найден...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-accent text-3xl mb-4">{mod.name}</h1>
      <div className="flex gap-8">
        {/* Изображение */}
        <div className="w-[172px] h-[156px] relative rounded-[10px] overflow-hidden bg-gray-50">
          <Image
            src={mod.imageUrl}
            alt={mod.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Детали */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl text-accent mb-2">Детали</h2>
            <ul className="text-sm space-y-1">
              <li>
                <strong>Тип:</strong> {mod.type.join(", ")}
              </li>
              <li>
                <strong>Жанр:</strong> {mod.genre.join(", ")}
              </li>
              <li>
                <strong>Версия:</strong> {mod.version}
              </li>
            </ul>
          </div>

          {/* Описание */}
          <div>
            <h2 className="text-xl text-accent mb-2">Описание</h2>
            <p className="text-sm text-gray-300">{mod.description}</p>
          </div>
        </div>
      </div>

      {/* Кнопка скачать */}
      <button
        onClick={() => window.open(mod.downloadUrl, "_blank")}
        className="mt-6 bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark transition"
      >
        Скачать мод
      </button>
    </div>
  );
};

export default ModPage;
