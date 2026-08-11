// pages/archive/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next"
import { ThemeProvider } from "@mui/styles"

import Post from "../../components/blog/Post"
import PageTemplate from "../../components/layouts/PageTemplate"
import theme from "../../components/utils/theme"

// 必要とする関数のみを厳密にインポート
import { fetchArchivePostById, fetchArchivePosts } from "../../lib/api"

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchArchivePosts()

  // 万が一データが空だった場合のフォールバック
  if (!posts || posts.length === 0) {
    return { paths: [], fallback: false }
  }

  // 💡 ここを修正：params.id に「記事のid文字列だけ」を確実に渡す構造にします
  const paths = posts.map((post) => ({
    params: { id: post.id }
  }))

  return { 
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 安全に id を文字列として抽出
  const id = String(params?.id)
  //const post = await fetchPostById(id)
  const post = await fetchArchivePostById(id)
  // 記事データが正しく取得できなかった場合は404ページへ飛ばす安全策
  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
    revalidate: 1
  }
}

interface PostData {
  post: {
    id: string
    title: string
    publishedAt: string
    image: {
      url: string
    }
    body: HTMLElement
  }
}

const ArchiveId = ({ post }: PostData) => {
  return (
    <ThemeProvider theme={theme}>
      <PageTemplate title={`${post.title} | 資料室（アーカイブ）`}>
        <Post
          id={post.id}
          title={post.title}
          publishedAt={post.publishedAt}
          thumbnail={post.image?.url || ""} // 画像がない場合のフォールバック
          body={post.body}
        />
      </PageTemplate>
    </ThemeProvider>
  )
}

export default ArchiveId