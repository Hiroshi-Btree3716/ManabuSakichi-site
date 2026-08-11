import React from "react"
import SliderDetailPageTemplate from "../../components/layouts/SliderDetailPageTemplate"
import styles from "./mado.module.css" // 1. CSSをインポート

const MadoPage = () => {
  return (
    <SliderDetailPageTemplate
      title="窓越し授業"
      description="..."
      image="..."
      color="#CE7E78"
      content={
        <div>
          {/* 2. styles.クラス名 で指定 */}
          <div className={styles.hero}>
            <h2>佐吉少年、新所小学校で窓越し授業に挑む</h2>
            <p>〜飽くなき知識への渇望と、実践的学びの本質〜</p>
          </div>

          <div className={styles.container}>
            <article>
              <h2>「窓越し授業」のエピソードとは</h2>
              <p>...</p>
              <blockquote>...</blockquote>
              <p>この物語は、恵まれない環境にあっても決して学びを諦めない<span className={styles.highlight}>「旺盛な知識欲」と「不屈の努力」の象徴</span>として、長く語り継がれてきました。</p>

              {/* 以降、クラス名がある場所にすべて styles. を付与 */}
              <div className={styles["tsuna-box"]}> {/* ハイフンを含む場合はブラケット記法 */}
                <div className={styles["tsuna-title"]}>【実践と独学】に対応する条文</div>
                ...
              </div>

              <div style={{ textAlign: "center" }}>
                <a href="#" className={styles["back-btn"]}>TOPへ戻る</a>
              </div>
            </article>
          </div>
        </div>
      }
    />
  )
}

export default MadoPage