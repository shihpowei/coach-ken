// 檔案路徑：components/Navbar.tsx
"use client"; // 這一行一定要在最上面，因為選單需要互動

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // 控制手機選單開關

  // 點擊連結後自動關閉選單
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "關於我", href: "/#about" },
    { name: "服務課程", href: "/#services" },
    { name: "學員見證", href: "/#testimonials" }, 
    { name: "教練專欄", href: "/#blog" },
  ];

  const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter text-zinc-900" onClick={closeMenu}>
          <Dumbbell className="h-6 w-6 text-orange-600" />
          <span>Ken教練<span className="text-zinc-400 font-normal">.FIT</span></span>
        </Link>

        {/* 電腦版選單 (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-orange-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-zinc-700 transition-all shadow-md hover:shadow-lg"
          >
            立即預約
          </a>
        </nav>

        {/* 手機版漢堡按鈕 (Mobile Hamburger) */}
        <button 
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 手機版下拉選單 (Mobile Menu Overlay) */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-xl py-4 flex flex-col items-center space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-base font-medium text-zinc-600 hover:text-orange-600 py-2"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-3/4 text-center rounded-lg bg-orange-600 px-6 py-3 text-base font-bold text-white hover:bg-orange-700"
            onClick={closeMenu}
          >
            填寫表單預約
          </a>
        </div>
      )}
    </header>
  );
}