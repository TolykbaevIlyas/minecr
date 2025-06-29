import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between py-[20px]">
      <h1 className="text-accent">Logo</h1>
      <nav className="flex gap-[20px]">
        <Link href="/">Главная</Link>
        <Link href="/Modpacs">Модпаки</Link>
        <Link href="/servers">Сервера</Link>
      </nav>
      <button className="max-w-[147px] w-full h-[48px] bg-accent rounded-[10px]">
        Создать
      </button>
    </header>
  );
};

export default Header;
