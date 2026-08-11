import { GetStaticProps, NextPage } from "next"

import { makeStyles, ThemeProvider } from "@mui/styles"
import { Container, Grid, Typography } from "@mui/material"

import Slider from "../components/home/Slider"
import Introductions from "../components/home/Introductions"
import Posts from "../components/blog/Posts"
import PageTemplate from "../components/layouts/PageTemplate"
import theme from "../components/utils/theme"

import { fetchLatestPosts } from "../lib/api"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

interface Item {
  name: string
  description: string
  color: string
  image: string // 画像表示用にプロパティを追加
}

interface Introduction {
  title: string
  description: string
  action: string
  href: string
}

interface Post {
  id: string
  title: string
  body: string
  image: {
    url: string
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const latestPosts = await fetchLatestPosts(3) // トップページは最新の3件取得

  return {
    props: { latestPosts },
    revalidate: 1
  }
}

const Home = ({ latestPosts }) => {
  const classes = useStyles()

  // 3つの解説ページの内容に完全に合わせた概要と画像パスにアップデート
  const items: Item[] = [
    {
      name: "報恩創造",
      description: "「受けた恩に感謝し、新たな価値を創り出す」。社会の支えに報いるため、生涯をかけて自動織機を発明し続けた佐吉翁の生き方そのものを表す、トヨタグループの原点たる精神です。日本と海外での『還元』への捉え方の違いや、社是「豊田綱領」との深いつながりを解説します。",
      color: "#64ACC8",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" // モノづくり・技術を想起させるイメージ（必要に応じて実際の画像パスに変更してください）
    },
    {
      name: "障子を開けて見よ",
      description: "「障子を開けてみよ、外は広いぞ」。大正時代、周囲の猛反対を押し切って上海への進出を決断した佐吉翁のダイナミックな一言。内向きな殻を破り、広い世界へ挑戦し続けるベンチャー精神の本質と、現代のグローバルビジネス、そしてトヨタのDNAにおける意味を紐解きます。",
      color: "#7D85B1",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80" // 広い視界・世界への広がりを想起させるイメージ
    },
    {
      name: "窓越し授業",
      description: "学校に通えずとも、教室の窓外から必死に知識を貪ったとされる少年時代の有名エピソード。近年囁かれる史実性の議論を超え、ニュートンのリンゴやガリレオの裁判のように『天才の本質』を象徴する伝説としての真の価値、そしてトヨタの「現地現物」への繋がりを語ります。",
      color: "#CE7E78",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80" // 学び・夜の灯りを想起させるイメージ
    }
  ]

  const introductions: Introduction[] = [
    {
      title: "佐吉翁に学ぶ会とは",
      description: "佐吉翁に学ぶ会の設立経緯、設立趣旨、入会方法の3点について、詳説します。",
      action: "About  Sakichi Toyoda Learning Society　",
      href: "/service"
    },
    {
      title: "組織・役員",
      description: "佐吉翁に学ぶ会の基本情報　 組織構造と役割などについて一覧します。",
      action: "About Organization >",
      href: "/company"
    },
     {
      title: "活動・イベント",
      description: "佐吉翁に学ぶ会の活動やイベントについてお知らせします。",
      action: "About Ivent >",
      href: "/recruit"
    },
    {
      title: "資料室",
      description: "佐吉翁に学ぶ会の資料を閲覧できます。",
      action: "About Archive >",
      href: "/archive"
    }
  ]
  // 💡 HTMLタグを除去して50文字に制限する関数
  const extractTextFromBody = (htmlContent: string, maxLength: number = 50) => {
    if (!htmlContent) return '活動の記録・詳細をご覧いただけます。';
    
    // 正規表現でHTMLタグ（<... chunks>）をすべて除去し、プレーンテキストにする
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <PageTemplate title="Home | Corporate Site Sample">
          <>
            {/* 
              改造ポイント: items配列にimageを追加しました。
              もしSliderコンポーネント側で画像がまだ未実装の場合は、
              Slider.活動内容tsx側で <img src={item.image} /> や Flexbox/Grid を用いて、
              テキストの横に配置するスタイルを追加してください。
            */}
            <Slider
              items={items}
            />
            { introductions.map((introduction, index) => (
              <Container key={index} maxWidth="lg" className={classes.container}>
                <Grid container justifyContent={index % 2 == 0 ? "flex-start" : "flex-end"}>
                  <Grid item lg={6} md={6}>
                    <Introductions
                      index={index}
                      title={introduction.title}
                      description={introduction.description}
                      action={introduction.action}
                      href={introduction.href}
                    />
                  </Grid>
                </Grid>
              </Container>
              ))
            }
            <Container maxWidth="lg" className={classes.container}>
              <Typography variant="h1" align="center" style={{ marginBottom: "2rem" }}>
                Topics
              </Typography>
              <Grid container spacing={4}>
                {latestPosts?.map((post: Post) => (
                  <Grid item key={post.id} xs={12} sm={6} md={4}>
                    <Grid container>
                      <Posts
                        id={post.id}
                        title={post.title}
                        //subTitle={post.subTitle}
                        subTitle={extractTextFromBody(post.body, 50)}
                        thumbnail={post.image?.url}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </>
        </PageTemplate>
      </ThemeProvider>
    </>
  )
}

export default Home