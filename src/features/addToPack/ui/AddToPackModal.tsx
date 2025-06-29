// src/features/addToPack/ui/AddToPackModal.tsx
"use client";

import { FC } from "react";
import Image from "next/image";
import { useModsStore } from "@/shared/store/modsStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  modId: number;
};

export const AddToPackModal: FC<Props> = ({ isOpen, onClose, modId }) => {
  const { packs, addModToPack } = useModsStore();

  if (!isOpen) return null;

  const handleAdd = (packId: number) => {
    addModToPack(packId, modId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Выбери пак</h2>
          <button onClick={onClose}>
            <Image
              src="/images/icons/close.svg"
              alt="Закрыть"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {packs.map((pack) => (
            <button
              key={pack.id}
              onClick={() => handleAdd(pack.id)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-left px-4 py-2 rounded-lg flex gap-3 items-center"
            >
              <Image
                src={pack.imageUrl}
                alt={pack.name}
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <p className="text-white font-semibold">{pack.name}</p>
                <p className="text-sm text-gray-400">{pack.version}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
