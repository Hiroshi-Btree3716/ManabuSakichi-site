import React from "react"
import SliderDetailPageTemplate from "../../components/layouts/SliderDetailPageTemplate"
import styles from "./mado.module.css" 

const ShojiPage = () => {
  return (
    <SliderDetailPageTemplate
      title="障子を開けて見よ"
      description="「障子を開けてみよ、外は広いぞ」。大正時代、周囲の猛反対を押し切って上海への進出を決断した佐吉翁のダイナミックな一言。"
      image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
      color="#7D85B1"
      content={
        <>
    <div className = {styles.hero}>
        <h2>佐吉翁、海外進出を決断する</h2>
        <h3>Open your mind, and look at the great world outside.</h3>
        <p>　　　　  </p>
        <p>〜殻を破り、広い世界へ挑戦し続けるベンチャー精神〜</p>
    </div>
    <div className={styles.container}>
        <article className={styles.article}>
            
            <h2>この言葉について</h2>
            <p>豊田グループの始祖・豊田佐吉翁が残した名言の中で、最もダイナミックで広く親しまれているのが、この<span className="highlight">「障子を開けてみよ、外は広いぞ」</span>です。</p>
            <blockquote>「自分の狭い殻の中に閉じこもって現状維持に満足してはならない。一歩外へ踏み出せば、そこには無限の可能性と新しい世界が広がっている」</blockquote>

            <h2>いつ、どのような状況で語られたのか？</h2>
            <p>この言葉が語られたのは、<span className="highlight">大正時代中期の1918年（大正7年）頃</span>と言われています。当時51歳だった佐吉翁が、中国・上海への工場進出を決断した瞬間でした。</p>
            
            <h3>猛反対する周囲の説得</h3>
            <p>第一次世界大戦が終結した当時、佐吉翁は国内での事業をさらに拡大するだけでなく、グローバルな視点から中国（上海）への大規模な工場進出と家族での移住を計画しました。しかし、身内や会社の周囲からは「国内の事業がようやく軌道に乗ったばかりなのに、わざわざ海外へ打って出るなどリスクが高すぎる」と猛反対にあいます。</p>

            <h3>未知なる「広い世界」への決断</h3>
            <p>その際、渋る親族や役員たちを前に、佐吉翁が目の前の障子をガラリと開け放ち、<span className="highlight">「そこの障子を開けてみよ、外は広いぞ」</span>と語りかけ、世界を見据えた大局的な視点（中国論や国民外交としての使命感）を熱弁したとされています。この一言で周囲を納得させ、後のグローバルな豊田紡織廠の設立へと突き進んでいきました。</p>

            <h2>日本と海外における「受け止め方」の違い</h2>
            <p>この言葉が持つ「マインドセット」は、日本国内とグローバル社会でそれぞれ異なる視点から高い評価を得ています。</p>

            <table>
                <tr>
                    <th>日本での解釈</th>
                    <td>
                        <strong>「内向き志向（ガラパゴス）の打破」と勇気</strong><br/>
                        日本では、古くからある「前例踏襲」や「事なかれ主義」「内向きな姿勢（心の障子）」を打ち破るための自省的な訓話として受け止められます。特に現代の日本社会においては、変化を恐れず一歩を踏み出す「若者のチャレンジ精神を促す言葉」として強く響きます。
                    </td>
                </tr>
                <tr>
                    <th>海外での解釈</th>
                    <td>
                        <strong>「Think Outside the Box（既成概念からの脱却）」</strong>
                        海外ビジネスにおいて、この言葉は <em>"Think Outside the Box"</em>（箱の外に出て考える＝固定観念にとらわれない）や、フロンティア・スピリット（開拓者精神）として完璧に翻訳・理解されます。狭いローカル市場に安住せず、最初からグローバル展開や破壊的イノベーション（Disruptive Innovation）を目指す、まさに「シリコンバレー的なベンチャー精神」の先駆けとして称賛されます。
                    </td>
                </tr>
            </table>

            <h2>トヨタ自動車の社是「豊田綱領」とのつながり</h2>
            <p>この言葉のDNAも、トヨタグループの最高行動指針である<span className="highlight">「豊田綱領（1935年制定）」</span>に見事に組み込まれ、今日にいたる「グローバル企業・トヨタ」を形作る原動力となっています。</p>

            <div className ={styles["tsuna-box"]}>
                <div className={styles["tsuna-title"]}>【時流に先んずる精神】に対応する条文</div>
                <strong>一、研究と創造に心を致し、常に時流に先んずべし</strong>
                <p >（現状の成功に満足せず、常に時代の半歩先を読み、世界に目を向けて新しい価値を創造しよう）</p>
            </div>

            <div className ={styles["tsuna-box"]}>
                <div className={styles["tsuna-title"]}>【国際人としての協調】に対応する条文</div>
                <strong>一、温情友愛の精神を発揮し、互に切磋琢磨して和衷協同の責任を全うすべし</strong>
                <p >（佐吉翁が上海進出時に抱いた「日中親善」や、外の世界の人々と共に栄えるグローバルな融和・チームワークの精神に通じています）</p>
            </div>
            
            <p >トヨタ自動車が自動織機から「自動車」という未知の産業へ舵を切ったこと、そして現在「モビリティカンパニー」へと変革しようとしていること。これらはすべて、この「障子を開けて外を見る」精神が、今もトップから現場まで息づいている証拠だと言えます。</p>
            <div style={{ textAlign: "center" }}>
                <a href="#" className={styles["back-btn"]}>このページのTOPへ戻る</a>
              </div>

        </article>
    </div>
        </>
      }
    />
  )
}
//style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666;"
//style="margin-top: 20px;"
//style="text-align: center;"
export default ShojiPage