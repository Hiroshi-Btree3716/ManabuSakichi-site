import React, { useState } from "react"
import { useRouter } from "next/router"

import { useTheme, Theme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  IconButton,
} from "@mui/material"

import useScrollTrigger from "@mui/material/useScrollTrigger"
import MenuIcon from "@mui/icons-material/Menu"

import Link from "../utils/Link"
import { routes } from "../../data/routes"

interface ElevationScrollProps {
  children: React.ReactElement
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}
const useStyles = makeStyles((theme: Theme) => ({
  toolbarMargin: {
    // -----------------------------------------------------------------
    // 1. PC・タブレット表示時（MENUが表示されているとき / matches = false）
    // -----------------------------------------------------------------
    // Toolbarのpaddingが上下24pxあるため、
    // 中身の文字の高さ(約32px〜40px) ＋ 上下padding(48px) に合わせる必要があります。
    // ここでは安全に標準の toolbar ミキシンをベースにしつつ、
    // padding分（24px * 2 = 48px）を足した高さ、または十分な高さを指定します。
    minHeight: "calc(64px + 48px)", 
    
    // -----------------------------------------------------------------
    // 2. スマホ表示時（3本線メニューのとき / matches = true）
    // -----------------------------------------------------------------
    // Toolbarのpaddingが "0 16px" になり上下の余白が消えるため、
    // Material-UI標準のヘッダー高さ（56px〜64px）にぴったり合わせます。
    [theme.breakpoints.down("sm")]: {
      minHeight: "56px", // あるいは theme.mixins.toolbar.minHeight
    }
  },
/* ★★★ ここを修正しました ★★★
const useStyles = makeStyles((theme: Theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar, // デフォルトの標準の高さをベースにする
    
    // PC表示時：Toolbarのpadding(上下24px=計48px)の分、高さを広げる
    minHeight: "calc(64px + 48px)", 
    
    // タブレット・スマホ表示時（ブレイクポイント md 以下の設定）
    [theme.breakpoints.down("md")]: {
      minHeight: "calc(64px + 48px)",
    },
    // スマホ表示時（matchesが有効になる sm 以下の設定）
    [theme.breakpoints.down("sm")]: {
      // Toolbarのpaddingが上下0px（正確には0 16px）になるため、高さを通常サイズ（56px〜64px）に戻す
      minHeight: "56px", 
    }
  },*/
  drawerIconContainer: {
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
    color: "inherit",
    [theme.breakpoints.down("xs")]: {
      height: "40px",
      width: "40px"
    }
  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0 6em"
  }
}))

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const matches = useMediaQuery(theme.breakpoints.down("sm"))

  const [openDrawer, setOpenDrawer] = useState(false)

  const router = useRouter()
  const path = routes

  const tabs = (
    <>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={4}>
        {path.map(({ name, link }) => (
          <Grid item key={link}>
            <Link href={link}>
              <Typography
                style={{
                  color: "inherit",
                  fontWeight: router.pathname.match(link) ? "bold" : "normal",
                  borderBottom: router.pathname.match(link) && "1px solid #757ce8",
                }}
              >
                {name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
  
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="right"
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {path.map(({ name, link }) => (
            <ListItem
              key={link}
              divider
              button
              onClick={() => {
                setOpenDrawer(false)
              }}
            >
              <ListItemText disableTypography>
                <Link href={link}>
                  <Typography
                    style={{
                      color:
                        router.pathname === link
                          ? "primary"
                          : "rgb(107 107 107)",
                      fontWeight: router.pathname === link ? "bold" : "normal"
                    }}
                  >
                    {name}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )
  
  return (
    <>
      <ElevationScroll>
        <AppBar color="inherit">
          <Toolbar
            disableGutters
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              width: "100%",
              // PC時は上下24pxの余白があるためヘッダーが大きくなる
              padding: matches ? "0 16px" : "14px"
            }}
          >
            <Link href="/">
              <Typography
                style={{
                  color: "inherit",
                  fontWeight: "bold",
                  fontSize: "1.75em",
                  position: "relative",
                  zIndex: 100,
                  whiteSpace: "nowrap" // ★ これを追加して自動改行を防ぐ
                }}
              >
                佐吉翁に学ぶ会
              </Typography>
            </Link>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* 
        ここでAppBarの裏に隠れるのを防ぐためのクッション（高さ）を作っています。
        classes.toolbarMargin の高さを上記で広げたため、スライダーが下に押し下げられます。
      */}
      <div className={classes.toolbarMargin} />
    </>
  )
}

export default Header