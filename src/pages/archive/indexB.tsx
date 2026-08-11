// pages/archive/index.tsx
import { GetStaticProps } from "next"
import { ThemeProvider } from "@mui/styles"
import { makeStyles } from "@mui/styles"
import { Container, Typography, Card, CardContent, Box, Button, Chip } from "@mui/material"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DescriptionIcon from '@mui/icons-material/Description'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import PageTemplate from "../../components/layouts/PageTemplate"
import theme from "../../components/utils/theme"
import { fetchArchivePosts, ArchivePost } from "../../lib/api"
import moment from "moment"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
    maxWidth: "800px",
    overflow: "hidden"
  },
  title: {
    fontWeight: 'bold', 
    borderBottom: '4px solid #c07667', // 佐吉翁に学ぶ会のテラコッタ色
    paddingBottom: '10px', 
    marginBottom: '3rem'
  },
  card: {
    borderRadius: '8px', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    marginBottom: '24px'
  },
  btn: {
    borderRadius: '20px',
    textTransform: 'none'
  }
}))

interface Props {
  archives: ArchivePost[]
}

const ArchivePage = ({ archives }: Props) => {
  const classes = useStyles()
  
  // ファイル形式に応じた外部ファイル用ボタン
  const renderFileButton = (item: ArchivePost) => {
    const fileTypeValue = typeof item.fileType === 'string' ? item.fileType : '';
    const hasDriveFile = !!(item.driveUrl && item.fileType && item.fileType !== 'none');
    if (!hasDriveFile || !item.driveUrl) return null;
    // 50行目付近の修正例
    //const fileTypeValue = typeof item.fileType === 'object' ? item.fileType.id : item.fileType;
    const isPdf = fileTypeValue?.toLowerCase() === 'pdf';
    //const isPdf = item.fileType?.toLowerCase() === 'pdf';
    
    return (
      <Button
        variant="outlined"
        color="inherit"
        href={item.driveUrl}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={isPdf ? <PictureAsPdfIcon style={{ color: '#dc2626' }} /> : <DescriptionIcon style={{ color: '#16a34a' }} />}
        className={classes.btn}
        style={{ borderColor: '#d1d5db' }}
      >
        資料ダウンロード 
      </Button>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      {/* システム共通のテンプレートで囲み、Header/Footerを自動適用 */}
      <PageTemplate title="資料室（アーカイブ） | 佐吉翁に学ぶ会">
        <Container className={classes.container}>
          {/* ページタイトル */}
          <Typography variant="h1" className={classes.title}>
            活動アーカイブ・資料室
          </Typography>

          {/* 記事一覧ループ */}
          {archives.map((item) => {
            const hasDriveFile = !!(item.driveUrl && item.fileType && item.fileType !== 'none');
            const displayDate = item.publishedAt || item.createdAt;

            return (
              <Card key={item.id} variant="outlined" className={classes.card}>
                <CardContent style={{ padding: '24px' }}>
                  
                  {/* メタ情報（日付 ＆ 分類バッジ） */}
                  <Box display="flex" alignItems="center" gap="12px" marginBottom="12px">
                    <Typography color="textSecondary">
                      {moment(displayDate).format("YYYY年MM月DD日")}
                    </Typography>
                    <Chip 
                      label={hasDriveFile ? '配布資料' : 'ブログ'} 
                      size="small"
                      style={{ 
                        backgroundColor: hasDriveFile ? '#f3f4f6' : '#fef2f2', 
                        color: hasDriveFile ? '#4b5563' : '#991b1b',
                        fontWeight: 'bold',
                        borderRadius: '4px'
                      }} 
                    />
                  </Box>

                  {/* 記事タイトル */}
                  <Typography variant="h2" style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                    {item.title}
                  </Typography>

                  {/* 簡単な説明文 */}
                  <Typography variant="body1" color="textSecondary" style={{ marginBottom: '20px', lineHeight: 1.6 }}>
                    {item.description || '活動の記録・詳細をご覧いただけます。'}
                  </Typography>

                  {/* アクションボタン */}
                  <Box display="flex" flexWrap="wrap" gap="12px">
                    <Button
                      variant="contained"
                      color="primary"
                      href={`/archive/${item.id}`}
                      endIcon={<ArrowForwardIcon />}
                      className={classes.btn}
                      style={{ fontWeight: 'bold' }}
                    >
                      記事を読む
                    </Button>
                    {renderFileButton(item)}
                  </Box>

                </CardContent>
              </Card>
            )
          })}
        </Container>
      </PageTemplate>
    </ThemeProvider>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await fetchArchivePosts()

  return {
    props: {
      archives: posts || [],
    },
    revalidate: 60,
  }
}

// 💡 エラーの原因だったデフォルトエクスポートをシステムと統一
export default ArchivePage