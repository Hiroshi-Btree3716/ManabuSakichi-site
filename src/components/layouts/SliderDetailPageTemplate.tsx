import React from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import PageTemplate from "./PageTemplate" // 既存のテンプレート

// 共通で受け取るプロパティ（Props）の型定義
export interface SliderDetailProps {
  title: string
  description: string
  content: React.ReactNode // HTMLや長い文章をそのまま入れられるように
  image: string
  color: string
}

const SliderDetailPageTemplate: React.FC<SliderDetailProps> = ({
  title,
  description,
  content,
  image,
  color
}) => {
  return (
    <PageTemplate title={`${title} | 佐吉翁に学ぶ会`}>
      {/* ヘッダーエリア（スライダーと同じ背景色） */}
      <Box style={{ backgroundColor: color, color: "#fff", padding: "4rem 0" }}>
        <Container maxWidth="lg">
          <Typography variant="h1" style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {title}
          </Typography>
          <Typography variant="h6" style={{ opacity: 0.9, lineHeight: 1.6, fontWeight: "normal" }}>
            {description}
          </Typography>
        </Container>
      </Box>

      {/* メインコンテンツエリア */}
      <Container maxWidth="md" style={{ marginTop: "3rem", marginBottom: "5rem" }}>
        {/* メイン画像 */}
        <Box style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <img 
            src={image} 
            alt={title} 
            style={{ width: "100%", maxHeight: "450px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} 
          />
        </Box>

        {/* 本文テキスト */}
        <Box style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#333" }}>
          {content}
        </Box>

        {/* トップに戻るボタン */}
        <Box style={{ marginTop: "4rem", textAlign: "center" }}>
          <Link href="/" passHref legacyBehavior>
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              トップページに戻る
            </Button>
          </Link>
        </Box>
      </Container>
    </PageTemplate>
  )
}

export default SliderDetailPageTemplate