// pages/archive/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next"
import { ThemeProvider, makeStyles } from "@mui/styles"
import { Container, Typography, Grid } from "@mui/material"

import PageTemplate from "../../components/layouts/PageTemplate"
import theme from "../../components/utils/theme"
import ShareButton from "../../components/utils/ShareButton"

import { fetchArchivePosts, fetchArchivePostById } from "../../lib/api"
import moment from "moment"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
    maxWidth: "800px",
    overflow: "hidden"
  },
  imageWrapper: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  archiveImage: {
    height: "200px", // 👈 高さを200pxに統一（お好みで調整してください）
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    objectFit: "cover" // 👈 縦横比が違う画像も、枠に合わせて綺麗に切り
  },
  bodyContent: {
    marginTop: "2rem",
    lineHeight: 1.8,
    fontSize: "1.05rem",
    "& img": {
      maxWidth: "100%",
      height: "auto"
    }
  }
}))

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchArchivePosts()
  if (!posts || posts.length === 0) {
    return { paths: [], fallback: "blocking" }
  }
  const paths = posts.map((post) => ({ params: { id: post.id } }))
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = String(params?.id)
  const post = await fetchArchivePostById(id)
  if (!post) return { notFound: true }
  return { props: { post }, revalidate: 1 }
}

interface ArchivePostData {
  post: {
    id: string
    title: string
    publishedAt: string
    createdAt: string
    // 💡 imageが「単一オブジェクト」か「配列」のどちらでも許容する設定
    images?: any 
    body?: string
  }
}

// 💡 [id].tsx の「const ArchiveId = ...」からファイルの最後までを、これに丸ごと差し替えて上書き保存してください。

// 💡 [id].tsx の「const ArchiveId = ...」からファイルの最後までを、これに丸ごと差し替えて上書き保存してください。

const ArchiveId = ({ post }: ArchivePostData) => {
  const classes = useStyles()
  const displayDate = post.publishedAt || post.createdAt

  const getImagesArray = () => {
    if (!post.images) return []
    if (Array.isArray(post.images)) return post.images
    if (post.images.fieldId && Array.isArray(post.images.images)) return post.images.images
    if (post.images.url) return [post.images]
    return []
  }
  
  const images = getImagesArray()

  return (
    <ThemeProvider theme={theme}>
      <PageTemplate title={`${post.title} | 資料室（アーカイブ）`}>
        <Container className={classes.container}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h1">{post.title}</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                {moment(displayDate).format("MMMM Do YYYY")}
              </Typography>
            </Grid>
 <Container className={classes.container}>
          <Grid container direction="column">
            <Grid item>
              <div
                className={classes.bodyContent}
                dangerouslySetInnerHTML={{ __html: `${post.body || ''}` }}
              />
            </Grid>
          </Grid>
        </Container>
            {images.length > 0 && (
              <Grid item className={classes.imageWrapper}>
                <Grid container direction="row" spacing={2}>
                  {images.map((img: any, index: number) => {
                    let imageUrl = "";

                    if (typeof img === 'string') {
                      imageUrl = img;
                    } else if (img && typeof img === 'object') {
                      if (img.url) {
                        imageUrl = img.url;
                      } else if (img.image && img.image.url) {
                        imageUrl = img.image.url;
                      }
                    }

                    if (!imageUrl) return null;

                    return (
                      <Grid item xs={4} key={index}>
                        <img 
                          src={imageUrl} 
                          alt={`${post.title} - ${index + 1}`} 
                          className={classes.archiveImage} 
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>

        <Container className={classes.container}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <ShareButton url={`https://<デプロイ後のドメイン>/archive/${post.id}`} />
            </Grid>
          </Grid>
        </Container>

        <Container className={classes.container}>
          <Grid container direction="column">
            <Grid item>
              <div
                className={classes.bodyContent}
                dangerouslySetInnerHTML={{ __html: `${post.body || ''}` }}
              />
            </Grid>
          </Grid>
        </Container>
      </PageTemplate>
    </ThemeProvider>
  )
}

export default ArchiveId