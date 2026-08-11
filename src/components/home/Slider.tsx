import React, { useState, useEffect } from "react"
import Link from "next/link" // 💡 追加
import { makeStyles } from "@mui/styles"
import { Container, Grid, Typography, Button, Box } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

const useStyles = makeStyles(() => ({
  sliderWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "450px",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.5s ease",
    overflow: "hidden"
  },
  container: {
    paddingTop: "3rem",
    paddingBottom: "3rem",
    position: "relative",
    zIndex: 2
  },
  contentBox: {
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    paddingRight: "2rem"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    letterSpacing: "0.05em",
    textShadow: "0 2px 4px rgba(0,0,0,0.15)",
    "@media (max-width: 600px)": {
      fontSize: "1.8rem"
    }
  },
  description: {
    fontSize: "1.05rem",
    lineHeight: 1.8,
    marginBottom: "2rem",
    opacity: 0.95,
    textShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  actionBtn: {
    alignSelf: "flex-start",
    borderColor: "#ffffff",
    color: "#ffffff",
    borderWidth: "2px",
    padding: "8px 24px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "4px",
    textTransform: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#333333",
      borderWidth: "2px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    }
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    "@media (max-width: 960px)": {
      marginTop: "2rem"
    }
  },
  sliderImage: {
    width: "100%",
    maxWidth: "480px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    transition: "transform 0.5s ease",
    "&:hover": {
      transform: "scale(1.02)"
    },
    "@media (max-width: 600px)": {
      height: "200px"
    }
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    minWidth: "auto",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    zIndex: 10,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      color: "#ffffff"
    },
    "@media (max-width: 600px)": {
      width: "35px",
      height: "35px"
    }
  },
  prevButton: {
    left: "20px",
    "@media (max-width: 600px)": { left: "5px" }
  },
  nextButton: {
    right: "20px",
    "@media (max-width: 600px)": { right: "5px" }
  }
}))

interface Item {
  name: string
  description: string
  color: string
  image: string
}
/*
interface SliderProps {
  items: Item[]
}*/

interface SliderProps {
  items: {
    name: string
    description: string
    color: string
    image: string
  }[]
}

const Slider: React.FC<SliderProps> = ({ items }) => {
  const classes = useStyles()
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  // 🔥 【追加】自動再生用のタイマー処理 (4秒ごとに次のスライドへ)
    useEffect(() => {
    if (!items || items.length <= 1) return

    const timer = setInterval(() => {
      handleNext()
    }, 4000) // 4000ms = 4秒（お好みの秒数に調整してください）

    // コンポーネントがアンマウントされたとき、またはインデックスが変わったときにタイマーをクリア
    return () => clearInterval(timer)
  }, [activeIndex, items])

  if (!items || items.length === 0) return null

  const currentItem = items[activeIndex]

  // 各記事への遷移先リンクのマッピング（仮設定）
  const getHref = (name: string) => {
    if (name === "報恩創造") return "/hoonsozo"
    if (name.includes("障子")) return "/shoji"
    if (name.includes("窓越し")) return "/mado"
    return "#"
  }

  return (
    <Box 
      className={classes.sliderWrapper} 
      style={{ backgroundColor: currentItem.color }}
    >
      {/* ナビゲーションボタン（前へ） */}
      <Button className={`${classes.navButton} ${classes.prevButton}`} onClick={handlePrev}>
        <ArrowBackIosNewIcon fontSize="medium" />
      </Button>

      <Container maxWidth="lg" className={classes.container}>
        <Grid container alignItems="center" spacing={4}>
          
          {/* 左側：テキストコンテンツ領域 */}
          <Grid item xs={12} md={7}>
            <Box className={classes.contentBox}>
              <Typography variant="h2" className={classes.title}>
                {currentItem.name}
              </Typography>
              <Typography variant="body1" className={classes.description}>
                {currentItem.description}
              </Typography>
              <Link href={getHref(currentItem.name)} passHref legacyBehavior>
                <Button 
                    variant="outlined" 
                    className={classes.actionBtn}
                    href={getHref(currentItem.name)}
                >
                    Check It Out!
                </Button>
              </Link>
            </Box>
          </Grid>

          {/* 右側：画像表示領域（追加・改造ポイント） */}
          <Grid item xs={12} md={5}>
            <Box className={classes.imageContainer}>
              <img 
                src={currentItem.image} 
                alt={currentItem.name} 
                className={classes.sliderImage}
              />
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* ナビゲーションボタン（次へ） */}
      <Button className={`${classes.navButton} ${classes.nextButton}`} onClick={handleNext}>
        <ArrowForwardIosIcon fontSize="medium" />
      </Button>
    </Box>
  )
}

export default Slider