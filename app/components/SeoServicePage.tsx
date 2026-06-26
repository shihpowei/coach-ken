import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  HelpCircle,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import { BookingLink } from "./BookingLink";

type FaqItem = {
  question: string;
  answer: string;
};

type ServicePageProps = {
  title: string;
  subtitle: string;
  description: string;
  primaryKeyword: string;
  serviceArea: string;
  audience: string[];
  benefits: string[];
  process: string[];
  faqs: FaqItem[];
  bookingUrl: string;
};

export function SeoServicePage({
  title,
  subtitle,
  description,
  primaryKeyword,
  serviceArea,
  audience,
  benefits,
  process,
  faqs,
  bookingUrl,
}: ServicePageProps) {
  const siteUrl = "https://coach-ken.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: title,
        description,
        areaServed: serviceArea,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#localbusiness`,
          name: "阿Ken教練｜高雄・屏東專業健身教練",
          url: siteUrl,
        },
        serviceType: primaryKeyword,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Dumbbell className="h-6 w-6" />
            阿Ken教練
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex">
            <Link className="hover:text-zinc-900 transition-colors" href="/#about">
              關於我
            </Link>
            <Link className="hover:text-zinc-900 transition-colors" href="/#services">
              服務
            </Link>
            <Link className="hover:text-zinc-900 transition-colors" href="/#media">
              影片與社群
            </Link>
          </nav>
          <BookingLink
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-zinc-700"
            href={bookingUrl}
            eventLabel={`${primaryKeyword}_header`}
            target="_blank"
            rel="noopener"
          >
            預約
          </BookingLink>
        </div>
      </header>

      <section className="border-b bg-zinc-50">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm font-medium text-zinc-600">
              <MapPin className="h-4 w-4" />
              {serviceArea}
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="text-xl font-semibold text-zinc-700">{subtitle}</p>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookingLink
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-zinc-700"
                href={bookingUrl}
                eventLabel={`${primaryKeyword}_hero`}
                target="_blank"
                rel="noopener"
              >
                填寫表單預約課程 <ArrowRight className="h-4 w-4" />
              </BookingLink>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3.5 text-base font-bold text-zinc-900 transition-colors hover:bg-zinc-100"
                href="/"
              >
                回首頁看完整介紹
              </Link>
            </div>
          </div>

          <aside className="border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              這頁適合誰？
            </div>
            <ul className="space-y-3">
              {audience.map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 max-w-2xl">
          <div className="text-sm font-bold uppercase tracking-wider text-zinc-500">
            {primaryKeyword}
          </div>
          <h2 className="mt-2 text-3xl font-bold">你可以期待的訓練方式</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((item) => (
            <div key={item} className="border border-zinc-200 bg-white p-5">
              <CheckCircle2 className="mb-4 h-6 w-6 text-green-600" />
              <p className="font-medium leading-relaxed text-zinc-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold">第一次上課會怎麼進行？</h2>
            <p className="mt-3 leading-relaxed text-zinc-300">
              先了解你的生活型態、運動經驗與身體狀況，再安排適合的訓練內容。不需要一開始就很強，重點是安全、穩定、能持續。
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-4">
            {process.map((item, index) => (
              <li key={item} className="border border-white/15 bg-white/5 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-900">
                  {index + 1}
                </div>
                <p className="leading-relaxed text-zinc-100">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="mb-3 flex items-center gap-2 font-bold text-zinc-600">
              <HelpCircle className="h-5 w-5" />
              FAQ
            </div>
            <h2 className="text-3xl font-bold">常見問題</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="border border-zinc-200 bg-white p-5">
                <summary className="cursor-pointer font-bold text-zinc-900">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-relaxed text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-zinc-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Users className="h-5 w-5" />
              想先聊聊你的狀況？
            </div>
            <p className="mt-2 text-zinc-600">
              可以先填表單，我會依你的目標、地點與時間，回覆適合的課程安排。
            </p>
          </div>
          <BookingLink
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-3.5 font-bold text-white transition-colors hover:bg-zinc-700"
            href={bookingUrl}
            eventLabel={`${primaryKeyword}_footer`}
            target="_blank"
            rel="noopener"
          >
            <MessageCircle className="h-4 w-4" />
            填寫表單預約課程
          </BookingLink>
        </div>
      </section>
    </main>
  );
}
