interface Post {
  id: string
  title: string
  subTitle: string
  body: HTMLElement
  thumbnail: string
}

const serviceId: string = process.env.NEXT_PUBLIC_MICRO_CMS_SERVICE_ID
const baseUrl: string = `https://${serviceId}.microcms.io/api/v1`

const apiKey: string = process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY
const writeApiKey: string = process.env.NEXT_PUBLIC_MICRO_CMS_WRITE_API_KEY

const params = (method: string, data?: {}) => {
  if (data) {
    return {
      "method": method,
      "headers": {
        "Content-Type": "application/json; charset=utf-8",
        "X-WRITE-API-KEY": writeApiKey
      },
      "body": JSON.stringify(data)
    }
  } else {
    return {
      "method": method,
      "headers": {
        "X-API-KEY": apiKey
      }
    }
  }
}

// 記事を全件取得
export const fetchAllPosts = async (): Promise<Post[]> => {
  const data = await fetch(`${baseUrl}/blog`, params("GET"))
  .then(res => res.json())
  .catch(() => null)

  if (data.contents) {
    return data.contents
  }
}

// IDから個別の記事を取得
export const fetchPostById = async (id: string): Promise<Post> => {
  const data = await fetch(`${baseUrl}/blog/${id}`, params("GET"))
  .then(res => res.json())
  .catch(() => null)

  if (data) {
    return data
  }  
}

// ページ番号によって記事を取得
export const fetchPostsByPageNumber = async (pageNumber: number, limit: number): Promise<Post[]> => {
  const data = await fetch(`${baseUrl}/blog?offset=${(pageNumber - 1) * 6}&limit=${limit}`, params("GET"))
  .then(res => res.json())
  .catch(() => null)

  if (data.contents) {
    return data.contents
  }
}

// 最新の記事のみを取得
export const fetchLatestPosts = async (limit: number): Promise<Post[]> => {
  const data = await fetch(`${baseUrl}/blog?limit=${limit}`, params("GET"))
  .then(res => res.json())
  .catch(() => null)

  if (data.contents) {
    return data.contents
  }
}

// お問い合わせを作成
export const createContact = async (data: {}) => {
  await fetch(`${baseUrl}/contacts`, params("POST", data))
}
// --- 既存のコードの一番下に追記 ---

// アーカイブ用の型定義（既存のPostとは別に定義）
export interface ArchivePost {
  id: string
  title: string
  description?: string
  publishedAt: string
  createdAt: string
  driveUrl?: string
  fileType?: 'pdf' | 'excel' | 'xlsx' | 'none'
  image?: any //
}

// アーカイブ記事一覧を全件取得する関数
export const fetchArchivePosts = async (): Promise<ArchivePost[]> => {
  // microCMSに新しく作る（あるいは既存の）エンドポイント名を指定
  // ここでは仮に 'archives' としています
  const data = await fetch(`${baseUrl}/archive?limit=50`, params("GET"))
    .then(res => res.json())
    .catch(() => null)

  if (data && data.contents) {
    return data.contents
  }
  return []
}
// アーカイブ用：IDから個別の記事を取得する関数
export const fetchArchivePostById = async (id: string): Promise<ArchivePost> => {
  const data = await fetch(`${baseUrl}/archive/${id}`, params("GET"))
    .then(res => res.json())
    .catch(() => null)

  if (data) {
    return data
  }
}