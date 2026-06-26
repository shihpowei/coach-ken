import type { Metadata } from "next";
import { SeoServicePage } from "../components/SeoServicePage";

const bookingUrl = "https://forms.gle/MQ3cZCcbwwv6RPXF8";

export const metadata: Metadata = {
  title: "高雄私人健身教練｜阿Ken教練｜一對一肌力訓練",
  description:
    "阿Ken教練提供高雄一對一私人健身教練課，適合新手、久坐上班族與想建立規律運動習慣的人，從動作評估到安全訓練循序安排。",
  alternates: {
    canonical: "https://coach-ken.vercel.app/kaohsiung-personal-trainer",
  },
};

export default function KaohsiungPersonalTrainerPage() {
  return (
    <SeoServicePage
      title="高雄私人健身教練"
      subtitle="一對一陪你把動作練穩，把運動變成生活習慣"
      description="如果你住在高雄，想開始健身卻不知道怎麼安排課表、怕動作做錯或曾經練一練就中斷，阿Ken教練會先從你的身體狀況、生活作息與目標開始，安排安全、有效、能持續的一對一訓練。"
      primaryKeyword="高雄私人健身教練"
      serviceArea="服務地區：高雄市區、鳳山、三民、左營、鼓山等區域可討論安排"
      audience={[
        "住在高雄，想找一對一私人教練的新手",
        "久坐、肩頸腰背常不舒服，想建立肌力的人",
        "曾經運動過，但想重新找回規律訓練節奏的人",
        "希望有人協助評估動作、安排課表與追蹤進度的人",
      ]}
      benefits={[
        "先確認你的動作品質與身體限制，不急著堆重量。",
        "依你的時間、體能與目標安排循序漸進的訓練。",
        "協助你理解每個動作為什麼要做，降低自己亂練的風險。",
      ]}
      process={[
        "填寫表單，簡單說明你的目標、地點與可上課時段。",
        "初步了解運動經驗、傷痛史、生活作息與期待。",
        "第一次課程進行動作觀察與基礎訓練安排。",
        "依照進度調整課表，讓訓練穩定累積。",
      ]}
      faqs={[
        {
          question: "高雄哪些區域可以安排私人教練課？",
          answer:
            "目前以高雄市區、鳳山、三民、左營、鼓山等區域為主，實際地點會依你的交通、時段與可配合場地討論安排。",
        },
        {
          question: "完全沒有健身經驗也可以上課嗎？",
          answer:
            "可以。課程會從基礎動作、呼吸、核心控制與安全訓練開始，不會要求你一開始就做到很高強度。",
        },
        {
          question: "需要自己先加入健身房嗎？",
          answer:
            "不一定。可以討論合作場地、可場租的工作室或你方便的訓練地點，再依實際情況安排。",
        },
      ]}
      bookingUrl={bookingUrl}
    />
  );
}
