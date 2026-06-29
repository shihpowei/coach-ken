import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle } from "lucide-react";

type SeoServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  serviceArea: string;
  highlights: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
};

const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";

export default function SeoServicePage({
  eyebrow,
  title,
  description,
  serviceArea,
  highlights,
  sections,
}: SeoServicePageProps) {
  return (
    <main className="bg-white text-zinc-900">
      <section className="border-b bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-orange-200">
              <MapPin className="h-4 w-4" />
              {eyebrow}
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-200">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:bg-orange-700"
              >
                填寫表單預約課程
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                回首頁看服務
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white p-6 text-zinc-900 shadow-2xl">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              適合想找教練的你
            </div>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold text-orange-600">{serviceArea}</p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            訓練不是硬撐，而是找到適合自己的開始方式
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="mb-3 text-xl font-bold">{section.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-zinc-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">想先聊聊你的狀況嗎？</h2>
            <p className="mt-2 text-zinc-600">
              可以先填寫表單，簡單說明你的目標、地點與可訓練時間。
            </p>
          </div>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3.5 font-bold text-white transition hover:bg-zinc-700"
          >
            <MessageCircle className="h-4 w-4" />
            立即預約諮詢
          </a>
        </div>
      </section>
    </main>
  );
}
