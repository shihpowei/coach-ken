import type { Metadata } from "next";
import { SeoServicePage } from "../components/SeoServicePage";

const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";

export const metadata: Metadata = {
  title: "屏東私人健身教練｜阿Ken教練｜新手與一對一肌力訓練",
  description:
    "阿Ken教練提供屏東私人健身教練課，適合新手、上班族與想改善體能的人，依地點與時段安排一對一肌力訓練。",
  alternates: {
    canonical: "https://coach-ken.vercel.app/pingtung-personal-trainer",
  },
};

export default function PingtungPersonalTrainerPage() {
  return (
    <SeoServicePage
      title="屏東私人健身教練"
      subtitle="在屏東也能用清楚、安全的方式開始一對一訓練"
      description="想在屏東找私人教練，最常遇到的問題是地點、時間和課程是否適合自己。阿Ken教練會先了解你的需求，再依你的生活圈、訓練經驗與目標，安排能長期執行的訓練方式。"
      primaryKeyword="屏東私人健身教練"
      serviceArea="服務地區：屏東市與周邊區域可討論安排，也可搭配高雄課程時段"
      audience={[
        "住在屏東，想找一對一私人健身教練的人",
        "想開始運動，但不知道該去健身房做什麼的新手",
        "工作忙碌，想用固定課程建立訓練習慣的人",
        "想改善體力、肌力與日常活動能力的人",
      ]}
      benefits={[
        "依屏東可安排的地點與時段，討論實際可執行的上課方式。",
        "訓練內容會依你的狀況調整，不用擔心跟不上團課節奏。",
        "從基礎肌力、動作品質與日常體能開始，讓運動更容易持續。",
      ]}
      process={[
        "先填表單留下屏東地區、可上課時間與訓練目標。",
        "確認交通、場地與課程形式是否適合。",
        "第一次課程以評估、基礎動作與安全訓練為主。",
        "後續依目標安排肌力、體能與動作控制訓練。",
      ]}
      faqs={[
        {
          question: "屏東可以到府或到指定健身房上課嗎？",
          answer:
            "可以先討論地點與時段。實際安排會依交通距離、場地規範與器材條件確認，找到比較適合的上課方式。",
        },
        {
          question: "屏東私人教練課適合新手嗎？",
          answer:
            "適合。課程會先從動作理解、基礎肌力與安全訓練開始，不會直接安排超出你能力太多的內容。",
        },
        {
          question: "如果我只想先諮詢，不確定要不要上課可以嗎？",
          answer:
            "可以。你可以先填表單說明狀況，我會依你的目標、地點與時間，回覆適合的建議與安排。",
        },
      ]}
      bookingUrl={bookingUrl}
    />
  );
}
