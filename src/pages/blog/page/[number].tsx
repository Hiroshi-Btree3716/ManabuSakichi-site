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
  // 画像サイズを統一し、カードの高さを揃えるスタイル
  gridItem: {
    display: 'flex',
    '& > div': { 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    '& img': {
      width: '100%',
      height: '200px', 
      objectFit: 'cover' 
    },
    // 💡 タイトルの文字サイズを少し小さく上書き（例: 1.5rem → 1.2rem等、適宜調整してください）
    '& h2, & .MuiTypography-h2': {
      fontSize: '1.25rem !important',
      fontWeight: 'bold',
      lineHeight: 1.4
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
  body: string // 💡 subTitle から body に変更
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
                  <Grid item key={post.id} xs={12} sm={6} md={4} className={classes.gridItem}>
                    <Grid container>
                      <Posts
                        id={post.id}
                        title={post.title}
                        // 💡 body からHTMLタグを除外したテキストを50文字で渡す
                        subTitle={extractTextFromBody(post.body, 50)}
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