import React from "react"
import SliderDetailPageTemplate from "../../components/layouts/SliderDetailPageTemplate"
import styles from "./hoonsozo.module.css" // 1. CSSをインポート
const HoonSozoPage = () => {
  return (
    <SliderDetailPageTemplate
      title="報恩創造"
      description="「受けた恩に感謝し、新たな価値を創り出す」。社会の支えに報いるため、生涯をかけて自動織機を発明し続けた佐吉翁の生き方そのものを表す、トヨタグループの原点たる精神です。"
      image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
      color="#64ACC8"
      content={
        <>
          <div className={styles.hero}>
            <h2>佐吉青年、母親のために自動織機開発に立ち上がる</h2>
            <p>〜新しい価値の創造こそが人類に貢献する〜</p>
          </div>
        <div className={styles.container}>
            
            <h2>「報恩創造」とは</h2>
            <p>豊田グループの創業者である豊田佐吉翁の精神、そしてその生涯の歩みを最もよく表す言葉として知られているのが、この<span className="highlight">「報恩創造（ほうおんそうぞう）」</span>です。</p>
            <blockquote>「受けた恩（社会や先人の支え）に感謝し、それに報いるために、自らの知恵と努力で新しい価値（技術や産業）を創造し、社会に還元していく」</blockquote>

            <h2>言葉の由来と、佐吉翁の歩み</h2>
            <p>実は「報恩創造」という四字熟語そのものは、佐吉翁が生前に直接叫んだり宣言したりした記録が残っているわけではありません。彼の<span className="highlight">「生き方そのもの」を後世の人々が凝縮して表現した言葉</span>です。その精神の原点は、佐吉翁の人生における大きな転機に深く根ざしています。</p>
            
            <h3>1. 発明の原点（明治時代初期）</h3>
            <p>母親や村の織り手たちが、夜遅くまで苦労して手作業で機織りをしている姿を見て、「なんとか彼女たちの苦労を減らし、社会の役に立ちたい（＝報恩）」と熱心に織機の改良（＝創造）を志しました。これこそが「報恩創造」の最初の種火でした。</p>

            <h3>2. 海外への特許譲渡（大正13年 / 1924年）</h3>
            <p>世界初の無停止杼換式自動織機（G型自動織機）を完成させ、イギリスのプラット社に特許権を100万円（当時の巨費）で譲渡した際、佐吉翁はその資金を息子の喜一郎に託し、「これからは自動車の時代だ。国のために自動車を開発せよ」と命じました。得た利益を社会へ還元（報恩）し、次なる新しい産業を興す（創造）という見事なサイクルがここに体現されています。</p>

            <h2>日本と海外における「受け止め方」の違い</h2>
            <p>この精神をグローバルな視点で見つめ直すと、文化的な背景によるニュアンスの面白い違いが見えてきます。</p>

            <table>
                <tbody>
                <tr>
                    <th>日本での解釈</th>
                    <td>
                        <strong>「お陰様の精神」と謙虚な義務感</strong>
                        仏教的な響き（報恩感謝）や二宮尊徳の「報徳思想」に近く、「自分が生かされているのは社会や先人のおかげ。だからお返しをするのは当然である」という、縦のつながりや感謝の念が重視されます。
                    </td>
                </tr>
                <tr>
                    <th>海外での解釈</th>
                    <td>
                        <strong>「Give back」とアクティブな社会的インパクト</strong>
                        欧米などでは <em>"Give back to society"</em>（社会への還元）や <em>"Pay it forward"</em>（恩送り）、あるいは社会的起業家精神（Social Entrepreneurship）として捉えられます。「自らのクリエイティビティ（創造）を用いて、いかに社会にイノベーションをもたらすか」という能動的な文脈で高く評価されます。
                    </td>
                </tr>
                </tbody>
            </table>

            <h2>トヨタ自動車の社是「豊田綱領」とのつながり</h2>
            <p>トヨタ自動車をはじめとするトヨタグループの社是である<span className="highlight">「豊田綱領（1935年制定）」</span>には、「報恩創造」という熟語そのものは含まれていません。しかし、その精神は全5条の中にしっかりと組み込まれ、今もグループのDNAとして脈々と受け継がれています。</p>

            <div className={styles["tsuna-box"]}>  
                <div className={styles["tsuna-title"]}>【創造】に対応する条文</div>
                <strong>一、研究と創造に心を致し、常に時流に先んずべし</strong>
                <p style={{"margin": "5px 0 0 0;",  "fontSize":" 0.9rem;", "color":" #666;"}}>（いつも研究と新しいものを創り出す精神を忘れず、時代の先頭に立とう）</p>
            </div>

            <div className={styles["tsuna-box"]}>
                <div className={styles["tsuna-title"]}>【報恩】に対応する条文</div>
                <strong>一、神仏を尊崇し、報恩感謝の生活を為すべし</strong>
                <p style={{"margin": "5px 0 0 0;",  "fontSize":" 0.9rem;", "color":" #666;"}}>（いつも敬けんな気持ちを忘れず、生かされていることに感謝して毎日を過ごそう）</p>
            </div>
            
            <p style={{"marginTop": "20px;"}}>
                ※また、第1条にある「産業報国の実を挙ぐべし」という言葉も、産業を通じて国や社会に報いるという意味であり、まさに「報恩」そのものを指しています。
            </p>
            <div style={{ textAlign: "center" }}>
                <a href="#" className={styles["back-btn"]}>このページのTOPへ戻る</a>
            </div>

        </div>

        </>
   
      
      }
    />
  )
}

export default HoonSozoPage