import type { Metadata } from "next";
import SeoServicePage from "../components/SeoServicePage";

export const metadata: Metadata = {
  title: "高雄私人健身教練｜一對一肌力訓練與新手健身",
  description:
    "阿Ken教練 施柏瑋提供高雄一對一私人健身教練課，適合新手、久坐上班族、想增肌減脂與建立規律運動習慣的人。",
  alternates: {
    canonical: "/kaohsiung-personal-trainer",
  },
};

export default function KaohsiungPersonalTrainerPage() {
  return (
    <SeoServicePage
      eyebrow="高雄私人健身教練"
      title="高雄一對一私人健身教練"
      description="如果你住在高雄，想開始訓練卻不知道怎麼安排課表、怕動作做錯，阿Ken教練會依照你的身體狀況、生活作息與目標，安排安全且能持續的訓練方式。"
      serviceArea="服務地區：高雄左營、三民、鳳山、鼓山等區域可討論安排"
      highlights={[
        "第一次健身也可以，從基礎動作與身體控制開始。",
        "依照你的目標安排訓練，例如增肌、減脂、體態調整或體能提升。",
        "可搭配高雄合作場館與生活圈，降低開始運動的阻力。",
      ]}
      sections={[
        {
          title: "先評估再訓練",
          body: "課程會先了解你的訓練經驗、疼痛史、生活型態與目標，再安排適合的動作與強度。",
        },
        {
          title: "建立可持續習慣",
          body: "不是一次練到很累，而是讓你知道每週該怎麼安排，慢慢把訓練變成生活的一部分。",
        },
        {
          title: "適合高雄生活圈",
          body: "依照你的地點與時間討論訓練安排，讓課程更容易長期執行。",
        },
      ]}
    />
  );
}
