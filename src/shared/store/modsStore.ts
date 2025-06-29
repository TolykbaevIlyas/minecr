// /src/shared/store/useModsStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mod = {
  id: number;
  name: string;
  description: string;
  stars: string;
  version: string;
  type: string[];
  genre: string[];
  downloadUrl: string;
  pageUrl: string;
  imageUrl: string;
};

export type ModPack = {
  id: number;
  name: string;
  description: string;
  version: string;
  imageUrl: string;
  isMine: boolean;
  modIds: number[];
};
type ModsState = {
  mods: Mod[];
  packs: ModPack[];
  addPack: (pack: Omit<ModPack, "id" | "modIds">) => void;
  addModToPack: (packId: number, modId: number) => void;
  getModsByPack: (packId: number) => Mod[];
};

export const useModsStore = create(
  persist<ModsState>(
    (set, get) => ({
      mods: [
        {
          id: 1,
          name: "Just Enough Items (JEI)",
          description: "Показывает рецепты крафта и использования предметов.",
          stars: "4.9",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Utility"],
          downloadUrl: "/mods/jei-1.21.5-neoforge-21.3.2.22.jar",
          pageUrl: "",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/710/256/256/637999999999999999.png",
        },
        {
          id: 2,
          name: "JourneyMap",
          description:
            "Карта, которая открывается в браузере и показывает, где вы были.",
          stars: "4.7",
          version: "1.20.1",
          type: ["Forge", "Fabric"],
          genre: ["Map"],
          downloadUrl: "/mods/journeymap-1.20.1-5.9.17-fabric.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/journeymap",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/711/256/256/637999999999999999.png",
        },
        {
          id: 3,
          name: "AppleSkin",
          description:
            "Показывает точное количество восстановления голода и насыщения.",
          stars: "4.5",
          version: "1.20.1",
          type: ["Forge", "Fabric"],
          genre: ["UI", "Utility"],
          downloadUrl: "/mods/appleskin-forge-mc1.20.1-2.5.0.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/appleskin",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/712/256/256/637999999999999999.png",
        },
        {
          id: 4,
          name: "Biomes O' Plenty",
          description: "Добавляет десятки новых биомов.",
          stars: "4.6",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["World Gen"],
          downloadUrl: "/mods/BiomesOPlenty-fabric-1.21.4-21.4.0.22.jar",
          pageUrl:
            "https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/713/256/256/637999999999999999.png",
        },
        {
          id: 5,
          name: "Iron Chests",
          description: "Добавляет улучшенные сундуки: золотые, алмазные и др.",
          stars: "4.4",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Storage"],
          downloadUrl: "/mods/ironchest-1.21.5-neoforge-16.3.3.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/iron-chests",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/714/256/256/637999999999999999.png",
        },
        {
          id: 6,
          name: "Quark",
          description: "Куча маленьких улучшений и новых механик.",
          stars: "4.8",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Tweaks", "Utility"],
          downloadUrl: "/mods/Quark-4.0-462.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/quark",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/715/256/256/637999999999999999.png",
        },
        {
          id: 7,
          name: "The Twilight Forest",
          description:
            "Добавляет новое измерение с боссами, подземельями и лутом.",
          stars: "4.9",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Adventure", "Magic"],
          downloadUrl: "/mods/twilightforest-1.21.1-4.7.3196-universal.jar",
          pageUrl:
            "https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/716/256/256/637999999999999999.png",
        },
        {
          id: 8,
          name: "Tinkers' Construct",
          description: "Углублённая система создания и улучшения инструментов.",
          stars: "4.9",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Tech", "Tool"],
          downloadUrl: "/mods/TConstruct-1.20.1-3.10.0.67.jar",
          pageUrl:
            "https://www.curseforge.com/minecraft/mc-mods/tinkers-construct",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/717/256/256/637999999999999999.png",
        },
        {
          id: 9,
          name: "Create",
          description: "Механика, шестерёнки, конвейеры и автоматизация.",
          stars: "5.0",
          version: "1.20.1",
          type: ["Forge", "Fabric"],
          genre: ["Tech", "Automation"],
          downloadUrl: "/mods/create-1.20.1-6.0.5.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/create",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/718/256/256/637999999999999999.png",
        },
        {
          id: 10,
          name: "Waystones",
          description: "Телепорт между метками Waystone.",
          stars: "4.5",
          version: "1.20.1",
          type: ["Forge", "Fabric"],
          genre: ["Travel"],
          downloadUrl: "/mods/waystones-neoforge-1.21.5-21.5.7.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/waystones",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/719/256/256/637999999999999999.png",
        },
        {
          id: 11,
          name: "Botania",
          description: "Магия через растения и ману.",
          stars: "4.6",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Magic", "Tech"],
          downloadUrl: "/mods/Botania-1.20.1-448-FORGE.jar",
          pageUrl: "https://www.curseforge.com/minecraft/mc-mods/botania",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/720/256/256/637999999999999999.png",
        },
        {
          id: 12,
          name: "Xaero's Minimap",
          description: "Мини-карта в углу экрана.",
          stars: "4.8",
          version: "1.20.1",
          type: ["Forge", "Fabric"],
          genre: ["UI", "Map"],
          downloadUrl: "/mods/Xaeros_Minimap_25.2.6_NeoForge_1.21.5.jar",
          pageUrl:
            "https://www.curseforge.com/minecraft/mc-mods/xaeros-minimap",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/721/256/256/637999999999999999.png",
        },
        {
          id: 13,
          name: "Storage Drawers",
          description: "Компактное хранение ресурсов в виде ящиков.",
          stars: "4.4",
          version: "1.20.1",
          type: ["Forge", "Fabric"],
          genre: ["Storage"],
          downloadUrl: "/mods/Storage Drawers-neoforge-1.21-13.8.6.jar",
          pageUrl:
            "https://www.curseforge.com/minecraft/mc-mods/storage-drawers",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/722/256/256/637999999999999999.png",
        },
        {
          id: 14,
          name: "Immersive Engineering",
          description: "Технологии в стиле стимпанк.",
          stars: "4.7",
          version: "1.20.1",
          type: ["Forge"],
          genre: ["Tech"],
          downloadUrl: "/mods/ImmersiveEngineering-1.21.1-12.3.1-189.jar",
          pageUrl:
            "https://www.curseforge.com/minecraft/mc-mods/immersive-engineering",
          imageUrl:
            "https://media.forgecdn.net/avatars/thumbnails/647/723/256/256/637999999999999999.png",
        },
      ],
      packs: [
        {
          id: 101,
          name: "Магический пак",
          description: "Сборка с фокусом на магические моды.",
          version: "Fabric 1.21",
          imageUrl: "/images/packs/magic-pack.png", // Можно сохранить локально в public
          isMine: true,
          modIds: [1, 3, 12], // JEI, AppleSkin, Botania
        },
        {
          id: 102,
          name: "Техно-автоматизация",
          description: "Все для автоматизации и технических построек.",
          version: "Forge 1.20.1",
          imageUrl: "/images/packs/tech-pack.png",
          isMine: false,
          modIds: [9, 10, 15], // Tinkers' Construct, Create, Immersive Engineering
        },
        {
          id: 103,
          name: "Карта и UI",
          description: "Пользовательские интерфейсы и карта в одном паке.",
          version: "Fabric 1.20.1",
          imageUrl: "/images/packs/ui-map-pack.png",
          isMine: false,
          modIds: [2, 13], // JourneyMap, Xaero’s Minimap
        },
      ],

      addPack: (pack) =>
        set((state) => ({
          packs: [
            ...state.packs,
            {
              id: Date.now(),
              ...pack,
              modIds: [], // правильно пустой массив
            },
          ],
        })),

      addModToPack: (packId, modId) => {
        console.log("addModToPack called", { packId, modId });
        set((state) => {
          console.log("Current packs before add:", state.packs);
          const newPacks = state.packs.map((pack) =>
            pack.id === packId && !pack.modIds.includes(modId)
              ? { ...pack, modIds: [...pack.modIds, modId] }
              : pack
          );
          console.log("Packs after add:", newPacks);
          return { packs: newPacks };
        });
      },

      getModsByPack: (packId) => {
        const { packs, mods } = get();
        const pack = packs.find((p) => p.id === packId);
        if (!pack) return [];
        return mods.filter((mod) => pack.modIds.includes(mod.id));
      },
    }),
    {
      name: "mods-storage", // ключ в localStorage
    }
  )
);
