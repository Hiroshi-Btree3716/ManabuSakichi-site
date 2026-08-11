import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"

import React, { useCallback } from "react"

import { makeStyles, ThemeProvider } from "@mui/styles"
import { Container, Grid, Typography } from "@mui/material"
import { Pagination } from "@mui/material"

import Posts from "../../../components/blog/Posts"
import PageTemplate from "../../../components/layouts/PageTemplate"
import theme from "../../../components/utils/theme"
import { fetchAllPosts, fetchPostsByPageNumber } from "../../../lib/api"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  },
  // 💡 画像サイズを統一し、文字数溢れを防ぐためのスタイルを追加
  gridItem: {
    display: 'flex',
    '& > div': { // Postsコンポーネントのルート要素をカード風に高さを揃える
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    // Posts内の img タグ（またはMuiCardMedia）の大きさを強制的に統一する
    '& img': {
      width: '100%',
      height: '200px', // 💡 お好みの高さに固定（例: 200px）
      objectFit: 'cover' // 💡 縦横比を保ったまま綺麗にトリミングする設定
    }
  }
}))

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await fetchAllPosts()
  
  const per_page = 6
  
  const range = (start: number, end: number) => {
    return (
      [...Array(end - start + 1)].map((_, i) => start + i)
    )
  }

  const paths = range(1, Math.ceil(allPosts.length / per_page)).map((number) =>  `/blog/page/${number}`)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPageNumber: number = Number(params.number)
  const limit: number = 6

  const postsByPageNumber = await fetchPostsByPageNumber(currentPageNumber, limit)
  const allPosts = await fetchAllPosts()

  return { 
    revalidate: 1,
    props: { 
      currentPageNumber,
      postsByPageNumber,
      allPosts
    }
  }
}

interface Post {
  id: string
  title: string
  subTitle: string
  image: {
    url: string
  }
}

const BlogPage = ({ currentPageNumber, postsByPageNumber, allPosts }) => {
  const classes = useStyles()
  const router = useRouter()

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, number: number) => {
      router.push(`${number}`)
    },[router]
  )

  const perPage: number = 6

  // 💡 概要を50文字程度に制限する簡易関数
  const truncateText = (text: string, maxLength: number = 50) => {
    if (!text) return '活動の記録・詳細をご覧いただけます。';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <PageTemplate title="Blog | Corporate Site Sample">
          <>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="h1" gutterBottom>
                    ニュース（新着情報）
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={4}>    
                {postsByPageNumber?.map((post: Post) => (
                  // 💡 クラス `classes.gridItem` を適用
                  <Grid item key={post.id} xs={12} sm={6} md={4} className={classes.gridItem}>
                    <Grid container>
                      <Posts
                        id={post.id}
                        title={post.title}
                        // 💡 subTitle を50文字で切り取るように変更
                        subTitle={truncateText(post.subTitle, 50)}
                        thumbnail={post.image?.url}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container justifyContent="center">
                <Grid item>
                <Pagination
                  count={Math.ceil(allPosts.length / perPage)}
                  variant="outlined"
                  page={currentPageNumber}
                  onChange={handleChangePage}
                />
                </Grid>
              </Grid>
            </Container>
          </>
        </PageTemplate>
      </ThemeProvider>
    </>
  )
}

export default BlogPage