import React from "react"
import SliderDetailPageTemplate from "../../components/layouts/SliderDetailPageTemplate"
import styles from "./mado.module.css" // 1. CSSをインポート

const ShojiPage = () => {
  return (
    <SliderDetailPageTemplate
      title="障子を開けて見よ"
      description="「障子を開けてみよ、外は広いぞ」。大正時代、周囲の猛反対を押し切って上海への進出を決断した佐吉翁のダイナミックな一言。"
      image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
      color="#7D85B1"
      content={
        <>
          <p>ここに「障子を開けて見よ」に関する詳しい解説テキストが入ります。</p>
          <p>内向きな殻を破り、広い世界へ挑戦し続けるベンチャー精神の本質と、現代のグローバルビジネス、そしてトヨタのDNAにおける意味を紐解きます。</p>
        </>
      }
    />
  )
}

export default ShojiPage