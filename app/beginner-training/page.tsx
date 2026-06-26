import type { Metadata } from "next";
import { SeoServicePage } from "../components/SeoServicePage";

const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";

export const metadata: Metadata = {
  title: "新手健身教練課｜阿Ken教練｜高雄屏東一對一入門訓練",
  description:
    "第一次健身不知道怎麼開始？阿Ken教練提供高雄、屏東新手健身入門課，從動作評估、基礎肌力到規律運動習慣循序建立。",
  alternates: {
    canonical: "https://coach-ken.vercel.app/beginner-training",
  },
};

export default function BeginnerTrainingPage() {
  return (
    <SeoServicePage
      title="新手健身教練課"
      subtitle="從零開始也可以，先把安全和習慣建立起來"
      description="很多人不是不想運動，而是不知道第一步怎麼開始。新手健身教練課會先幫你釐清目標、評估動作與體能，再用你能理解、能做到的方式，慢慢建立訓練節奏。"
      primaryKeyword="新手健身教練課"
      serviceArea="服務地區：高雄、屏東可討論安排，也提供線上諮詢與課表建議"
      audience={[
        "完全沒有健身經驗，不知道要從哪些動作開始的人",
        "曾經辦過健身房會員，但去了不知道要練什麼的人",
        "怕受傷、怕動作做錯，想有人在旁邊協助的人",
        "想改善體態、體力與生活精神，但不想走極端方式的人",
      ]}
      benefits={[
        "用簡單清楚的方式理解訓練，不需要先懂很多健身術語。",
        "先建立穩定動作和基礎肌力，再逐步增加強度。",
        "課程會配合生活作息，讓訓練不是短期衝刺，而是能持續的習慣。",
      ]}
      process={[
        "了解你的目標、運動經驗、作息與擔心的問題。",
        "觀察基礎動作，例如深蹲、髖關節、推拉與核心控制。",
        "安排適合新手的訓練內容，建立動作信心。",
        "逐步調整課表，讓你知道自己進步在哪裡。",
      ]}
      faqs={[
        {
          question: "我體力很差，可以上新手健身教練課嗎？",
          answer:
            "可以。新手課程會依你的體力和動作品質安排，不會用高強度訓練硬逼你跟上。",
        },
        {
          question: "第一次上課需要準備什麼？",
          answer:
            "穿著方便活動的衣服和運動鞋，帶水和毛巾即可。若有舊傷或特殊身體狀況，可以在預約時先說明。",
        },
        {
          question: "新手多久會看到改變？",
          answer:
            "每個人的起點不同，但通常先感受到的是動作比較穩、比較知道怎麼練、日常體力慢慢變好。體態或力量改變則需要穩定訓練累積。",
        },
      ]}
      bookingUrl={bookingUrl}
    />
  );
}
