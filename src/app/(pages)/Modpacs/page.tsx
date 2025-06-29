"use client";
import React, { useState, useMemo } from "react";
import { ModPack } from "@/entities/modPacs";
import { useModsStore } from "@/shared/store/modsStore";
import { CreatePackModal } from "@/features/createPack";

const Modpacs = () => {
  const packs = useModsStore((state) => state.packs);
  const addPack = useModsStore((state) => state.addPack); // ✅ ensure this action exists
  const getModsByPack = useModsStore((state) => state.getModsByPack);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("All");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const types = useMemo(() => {
    const setTypes = new Set<string>();
    packs.forEach((pack) => {
      getModsByPack(pack.id).forEach((mod) => {
        mod.type.forEach((t) => setTypes.add(t));
      });
    });
    return Array.from(setTypes);
  }, [packs, getModsByPack]);

  const genres = useMemo(() => {
    const setGenres = new Set<string>();
    packs.forEach((pack) => {
      getModsByPack(pack.id).forEach((mod) => {
        mod.genre.forEach((g) => setGenres.add(g));
      });
    });
    return Array.from(setGenres);
  }, [packs, getModsByPack]);

  const filtered = useMemo(() => {
    return packs
      .filter((pack) => {
        if (view === "My" && !pack.isMine) return false;
        if (view === "Uploaded" && pack.isMine) return false;
        return true;
      })
      .filter((pack) => pack.name.toLowerCase().includes(search.toLowerCase()))
      .filter((pack) => {
        if (!typeFilter) return true;
        return getModsByPack(pack.id).some((mod) =>
          mod.type.includes(typeFilter)
        );
      })
      .filter((pack) => {
        if (!genreFilter) return true;
        return getModsByPack(pack.id).some((mod) =>
          mod.genre.includes(genreFilter)
        );
      })
      .sort((a, b) => {
        const cmp = a.name.localeCompare(b.name, "ru");
        return sortOrder === "asc" ? cmp : -cmp;
      });
  }, [packs, view, search, typeFilter, genreFilter, sortOrder, getModsByPack]);

  type Create = {
    name: string;
    description: string;
    imageUrl: string;
  }

  const handleCreatePack = (newPack: Create) => {
    addPack({
      // id: crypto.randomUUID(),
      ...newPack,
      // mods: [],
      isMine: true,
      // pageUrl: `/packs/${newPack.name.toLowerCase().replace(/\s+/g, "-")}`,
      version: "1.0",
    });
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Tabs */}
      <div className="flex gap-[10px]">
        {["All", "My", "Uploaded"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`max-w-[120px] w-full h-[32px] rounded-[5px] ${
              view === v ? "bg-accent" : ""
            }`}
          >
            {v === "All" ? "Все" : v === "My" ? "Мои" : "Загруженные"}
          </button>
        ))}
      </div>

      {/* Поиск */}
      <div className="flex">
        <input
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full focus:outline-none px-2 rounded-l-[5px] bg-inputfill border-border border-y-[3px] border-l-[3px]"
        />
        <button className="max-w-[233px] w-full h-[32px] bg-accent rounded-r-[5px]">
          Поиск
        </button>
      </div>

      {/* Фильтры */}
      <div className="flex gap-[10px]">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-inputfill text-white py-[5px] px-[12px] rounded-[6px]"
        >
          <option value="">Тип</option>
          {types.map((t) => (
            <option key={t} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>

        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="bg-inputfill text-white py-[5px] px-[12px] rounded-[6px]"
        >
          <option value="">Жанр</option>
          {genres.map((g) => (
            <option key={g} value={g} className="text-black">
              {g}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-inputfill text-white py-[5px] px-[12px] rounded-[6px]"
        >
          <option value="asc">А–Я</option>
          <option value="desc">Я–А</option>
        </select>
      </div>

      {/* Сборки */}
      <div className="grid grid-cols-2 gap-[20px]">
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center bg-download rounded-[10px] text-[24px] text-center items-center cursor-pointer"
        >
          Создать сборку
        </div>

        {filtered.map((pack) => (
          <ModPack key={pack.id} packId={pack.id} />
        ))}
      </div>

      {isModalOpen && (
        <CreatePackModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreatePack}
        />
      )}
    </div>
  );
};

export default Modpacs;
