import type { Metadata } from "next";
import SeoServicePage from "../components/SeoServicePage";

export const metadata: Metadata = {
  title: "新手健身教練課｜第一次健身的一對一入門訓練",
  description:
    "第一次健身不知道怎麼開始？阿Ken教練 施柏瑋提供新手健身入門課，從動作評估、基礎肌力到運動習慣建立循序安排。",
  alternates: {
    canonical: "/beginner-training",
  },
};

export default function BeginnerTrainingPage() {
  return (
    <SeoServicePage
      eyebrow="新手健身入門"
      title="第一次健身，也可以安心開始"
      description="如果你很久沒運動、怕動作做錯、或不知道課表怎麼安排，這類課程會先把訓練變簡單：學會基本動作、理解身體狀況，再慢慢建立規律。"
      serviceArea="適合高雄、屏東想開始健身的新手"
      highlights={[
        "不用先有基礎，從呼吸、核心、蹲、推、拉等基本動作開始。",
        "避免一開始就過度訓練，讓身體有時間適應。",
        "建立你自己也看得懂的訓練邏輯，不只是照做動作。",
      ]}
      sections={[
        {
          title: "從評估開始",
          body: "先了解你的活動度、肌力狀態、過去運動經驗與生活作息，再決定訓練方向。",
        },
        {
          title: "動作慢慢學",
          body: "把複雜動作拆成容易理解的步驟，讓你知道怎麼做、為什麼這樣做。",
        },
        {
          title: "養成運動節奏",
          body: "協助你找到每週可執行的頻率與內容，讓健身不只是短期衝刺。",
        },
      ]}
    />
  );
}
