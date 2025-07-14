"use client";
import { Modblock } from "@/entities/modBlock";
import { useModsStore } from "@/shared/store/modsStore";
import { useState } from "react";

const ModPage = () => {
  const { mods } = useModsStore();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  const types = ["Forge", "Fabric"];
  const genres = ["Tech", "Magic", "Adventure", "Map", "Utility", "Storage", "UI"];

  const filteredMods = mods
    .filter(mod => mod.name.toLowerCase().includes(search.toLowerCase()))
    .filter(mod => (typeFilter ? mod.type.includes(typeFilter) : true))
    .filter(mod => (genreFilter ? mod.genre.includes(genreFilter) : true))
    .sort((a, b) => {
      const compare = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? compare : -compare;
    });

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Поиск */}
      <div className="flex">
        <input
          placeholder="Поиск модов..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full focus:outline-none px-2 rounded-l-[5px] bg-inputfill border-border border-y-[3px] border-l-[3px]"
        />
        <button className="max-w-[233px] w-full h-[32px] bg-accent rounded-r-[5px]">Поиск</button>
      </div>

      {/* Фильтры */}
      <div className="flex gap-[10px]">
        <select
          className="bg-inputfill text-white py-[5px] px-[12px] rounded-[6px]"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="">Тип</option>
          {types.map(t => (
            <option key={t} value={t} className="text-black">
              {t}
            </option>
          ))}
        </select>
        <select
          className="bg-inputfill text-white py-[5px] px-[12px] rounded-[6px]"
          value={genreFilter}
          onChange={e => setGenreFilter(e.target.value)}
        >
          <option value="">Жанр</option>
          {genres.map(g => (
            <option key={g} value={g} className="text-black">
              {g}
            </option>
          ))}
        </select>
        <select
          className="bg-inputfill text-white py-[5px] px-[12px] rounded-[6px]"
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">А–Я</option>
          <option value="desc">Я–А</option>
        </select>
      </div>

      {/* Моды */}
      <div className="grid grid-cols-2 gap-[20px]">
        {filteredMods.map(mod => (
          <Modblock key={mod.id} mod={mod} />
        ))}
      </div>
    </div>
  );
};

export default ModPage;
