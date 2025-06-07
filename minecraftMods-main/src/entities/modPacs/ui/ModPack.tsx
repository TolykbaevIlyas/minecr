"use client";
import { useModsStore } from "@/shared/store/modsStore";
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";

const ModPack = ({ packId }) => {
  const router = useRouter();

  const pack = useModsStore((state) =>
    state.packs.find((p) => p.id === packId)
  );
  const getModsByPack = useModsStore((state) => state.getModsByPack);
  const mods = pack ? getModsByPack(pack.id) : [];

  if (!pack) return null;

  const handleClick = () => {
    router.push(`/pack/${pack.id}`);
  };

  const averageStars =
    mods.reduce((sum, mod) => sum + parseFloat(mod.stars), 0) /
    (mods.length || 1);
  const types = Array.from(new Set(mods.flatMap((mod) => mod.type))).join("/");
  const genres = Array.from(new Set(mods.flatMap((mod) => mod.genre))).join(
    ","
  );

  const handleDownloadZip = async (e) => {
    e.preventDefault(); // чтобы не сработал переход по <Link>
    if (!mods.length) return;

    const zip = new JSZip();
    const folder = zip.folder("mods");

    await Promise.all(
      mods.map(async (mod) => {
        try {
          const response = await fetch(mod.downloadUrl);
          const blob = await response.blob();
          const filename = mod.downloadUrl.split("/").pop();
          folder?.file(filename || `${mod.name}.jar`, blob);
        } catch (error) {
          console.error(`Ошибка при скачивании мода ${mod.name}`, error);
        }
      })
    );

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${pack.name.replace(/\s+/g, "_")}_mods.zip`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-[15px] bg-blockbg max-w-[600px] h-[200px] rounded-[10px] p-[20px] w-full border-border border-[3px] border-solid"
    >
      <div className="flex gap-[180px]">
        <div className="flex gap-[10px]">
          <img
            src={pack.imageUrl}
            alt={pack.name}
            className="w-[100px] h-[100px] object-cover rounded-[10px]"
          />
          <div>
            <h4 className="text-accent">{pack.name}</h4>
            <p>{pack.description}</p>
          </div>
        </div>
        <div className="flex items-start justify-start gap-[10px]">
          <img
            src="/images/icons/plus.svg"
            alt="Добавить"
            className="w-[14px] h-[14px] cursor-pointer"
          />
          <img
            src="/images/icons/download.svg"
            alt="Скачать"
            className="w-[18px] h-[18px] cursor-pointer"
            onClick={handleDownloadZip}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="flex gap-[5px] items-center">
            <img
              src="/images/icons/star.svg"
              alt=""
              className="w-[18px] h-[18px]"
            />
            <p className="text-starring">{averageStars.toFixed(1)}</p>
          </div>
          <div>
            <p>version: {pack.version}</p>
          </div>
        </div>
        <div className="text-right">
          <p>{types}</p>
          <p>{genres}</p>
        </div>
      </div>
    </div>
  );
};

export default ModPack;
