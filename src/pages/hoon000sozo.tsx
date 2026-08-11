import React from "react"
import SliderDetailPageTemplate from "../components/layouts/SliderDetailPageTemplate"

const HoonSozoPage = () => {
  return (
    <SliderDetailPageTemplate
      title="報恩創造"
      description="「受けた恩に感謝し、新たな価値を創り出す」。社会の支えに報いるため、生涯をかけて自動織機を発明し続けた佐吉翁の生き方そのものを表す、トヨタグループの原点たる精神です。"
      image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
      color="#64ACC8"
      content={
        <>
          <p>ここに「報恩創造」に関する詳しい解説テキストが入ります。</p>
          <p>日本と海外での『還元』への捉え方の違いや、社使「豊田綱領」との深いつながりを詳細に記述できます。</p>
        </>
      }
    />
  )
}

export default HoonSozoPage