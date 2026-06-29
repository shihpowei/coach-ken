import type { Metadata } from "next";
import SeoServicePage from "../components/SeoServicePage";

export const metadata: Metadata = {
  title: "屏東私人健身教練｜一對一肌力訓練與體能提升",
  description:
    "阿Ken教練 施柏瑋提供屏東私人健身教練課，適合新手、上班族、想改善體能與建立規律運動習慣的人。",
  alternates: {
    canonical: "/pingtung-personal-trainer",
  },
};

export default function PingtungPersonalTrainerPage() {
  return (
    <SeoServicePage
      eyebrow="屏東私人健身教練"
      title="屏東一對一私人健身教練"
      description="想在屏東開始健身，最常卡住的是不知道去哪裡練、怎麼練才安全，以及如何持續。阿Ken教練會協助你從基本動作、課表安排與習慣建立開始。"
      serviceArea="服務地區：屏東市與周邊區域可討論安排"
      highlights={[
        "適合沒有健身經驗、想重新開始運動的人。",
        "課程重視安全動作、基礎肌力與長期進步。",
        "可依照屏東生活圈與訓練場館討論上課方式。",
      ]}
      sections={[
        {
          title: "降低開始門檻",
          body: "不需要先練好才找教練，課程會從你目前的狀態開始調整。",
        },
        {
          title: "改善體力與活動度",
          body: "透過肌力訓練與基礎體能安排，讓日常生活更有力氣、更穩定。",
        },
        {
          title: "屏東也能穩定訓練",
          body: "依照地點、時間與目標規劃訓練，讓你不用為了開始運動而跑很遠。",
        },
      ]}
    />
  );
}
