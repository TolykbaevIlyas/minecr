// /src/app/pack/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Modblock } from "@/entities/modBlock";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  useModsStore,
  ModPack as PackType,
  Mod as ModType,
} from "@/shared/store/modsStore";

const PackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { packs, getModsByPack, mods: allMods, addModToPack } = useModsStore();
  const [pack, setPack] = useState<PackType | null>(null);
  const [mods, setMods] = useState<ModType[]>([]);

  // Filter for mods in pack
  const [inPackSearch, setInPackSearch] = useState("");

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    if (!id) return router.replace("/");
    const found = packs.find((p) => p.id.toString() === id) || null;
    if (!found) return router.replace("/");
    setPack(found);
    setMods(getModsByPack(found.id));
  }, [id, packs, getModsByPack, router]);

  // Filter mods inside pack by name or tags
  const filteredMods = mods
    .filter((m) => m.name.toLowerCase().includes(inPackSearch.toLowerCase()))
    .filter((m) =>
      inPackSearch === ""
        ? true
        : m.genre
            .concat(m.type)
            .some((t) => t.toLowerCase().includes(inPackSearch.toLowerCase()))
    );

  const handleDownloadPack = async () => {
    if (!pack || mods.length === 0) return;
    const zip = new JSZip();
    const folder = zip.folder("mods");
    await Promise.all(
      mods.map(async (mod) => {
        const res = await fetch(mod.downloadUrl);
        const blob = await res.blob();
        const filename = mod.downloadUrl.split("/").pop() || `${mod.name}.jar`;
        folder?.file(filename, blob);
      })
    );
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${pack.name.replace(/\s+/g, "_")}_mods.zip`);
  };

  const availableMods = allMods
    .filter((m) => !mods.some((e) => e.id === m.id))
    .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(
      (m) =>
        tagFilter === "" ||
        m.genre.includes(tagFilter) ||
        m.type.includes(tagFilter)
    );

  if (!pack) return <div className="p-6">Загрузка...</div>;

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Header */}
      <div className="flex gap-5 h-50 bg-blockbg border-border border-3 rounded-lg p-5">
        <div className="w-44 h-40 relative">
          <Image
            src={pack.imageUrl}
            alt={pack.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-accent text-2xl">{pack.name}</h3>
          <p className="mt-2 text-base">{pack.description}</p>
          <p className="mt-1 text-sm">Версия: {pack.version}</p>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <button
            onClick={handleDownloadPack}
            className="bg-download w-64 h-10 rounded-lg"
          >
            Скачать сборку
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-64 h-10 border-border border-3 rounded-lg"
          >
            Настройки
          </button>
        </div>
      </div>

      {/* In-pack search and Add button */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Поиск в сборке"
          value={inPackSearch}
          onChange={(e) => setInPackSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-inputfill text-white focus:outline-none"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-accent text-white px-4 py-2 rounded"
        >
          Добавить мод
        </button>
      </div>

      {/* Mods grid */}
      <div className="grid grid-cols-2 gap-5">
        {filteredMods.map((mod) => (
          <Modblock key={mod.id} mod={mod} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blockbg p-6 rounded-lg w-11/12 max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">Добавить мод</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>
            {/* Modal search inputs */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="По названию"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-inputfill text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="По тегам"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-inputfill text-white focus:outline-none"
              />
            </div>
            {/* List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableMods.map((m) => (
                <div
                  key={m.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-800 rounded cursor-pointer"
                  onClick={() => {
                    if (pack) {
                      addModToPack(pack.id, m.id);
                      setMods(getModsByPack(pack.id));
                    }
                  }}
                >
                  <span className="text-white">{m.name}</span>
                  <span className="text-gray-400 text-sm">
                    {[...m.type, ...m.genre].join(", ")}
                  </span>
                </div>
              ))}
              {availableMods.length === 0 && (
                <p className="text-gray-400 text-center">Ничего не найдено</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackPage;
