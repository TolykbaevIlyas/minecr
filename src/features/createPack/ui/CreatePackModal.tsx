"use client";
import React, { useState } from "react";

type CreatePackModalProps = {
  onClose: () => void;
  onCreate: (data: { name: string; description: string; imageUrl: string }) => void;
};

const CreatePackModal: React.FC<CreatePackModalProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleSubmit = () => {
    if (name && description && image) {
      const reader = new FileReader();
      reader.onload = () => {
        onCreate({
          name,
          description,
          imageUrl: reader.result as string,
        });
        onClose();
      };
      reader.readAsDataURL(image);
    } else {
      alert("Пожалуйста, заполните все поля");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-[10px] w-[400px] flex flex-col gap-[10px] text-black">
        <h2 className="text-[20px] font-bold mb-2">Создать сборку</h2>

        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Описание"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button onClick={handleSubmit} className="bg-accent text-white p-2 rounded mt-2">
          Создать
        </button>

        <button onClick={onClose} className="text-red-600 text-sm underline mt-1">
          Отмена
        </button>
      </div>
    </div>
  );
};

export default CreatePackModal;
