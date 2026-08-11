import { useRouter } from "next/router"


// ⭕ 1. スタイル関連は「@mui/styles」からインポート
import { makeStyles  } from "@mui/styles";

// ⭕ 2. コンポーネント関連は「@mui/material」からインポート
import { Container, Grid, Typography ,Theme} from "@mui/material";
import { routes } from "../../data/routes"
import Link from "../utils/Link"
import SocialMedia from "../utils/SocialMedia"
import { Box } from "@mui/system"

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    position: "relative",
    overflow: "hidden",
    marginTop: "6em",
    padding: "2em 0 "
  },
  link: {
    fontSize: "1.25em",
    color: "#fff"
  },
  contact: {
    color: "#fff",
    fontSize: "1.5em",
    marginTop: "20px"
  },
  copylight: {
    marginTop: "15px",
    color: "#fff",
    fontSize: "1em"
  }
}))

const Footer = () => {
  //const classes = useStyles()
  const path = routes
  const router = useRouter()

  return (
   <Box
    sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        position: "relative",
        overflow: "hidden",
        marginTop: "6em",
        padding: "2em 0"
  })}
>
 <Container maxWidth="lg">
    <Grid container spacing={3} justifyContent="center">
      {path.map(({ name, link }) => (
        <Grid item key={link}>
          <Link href={link}>
            <Typography
              // 2. className={classes.link} を sx に変更
              sx={{
                fontSize: "1.25em",
                color: "#fff"
              }}
              style={{
                fontWeight: router.pathname.match(link) ? "bold" : "normal",
                // 三項演算子に直しておくと、別の型エラーを防げて安全です
                borderBottom: router.pathname.match(link) ? "1px solid #757ce8" : "none"
              }}
            >
              {name}
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
    
    <Grid container direction="column" style={{ margin: "1.5em 0" }}>
      <SocialMedia />
    </Grid>
    
    {/* 3. justify="center" を justifyContent="center" に修正 */}
    <Grid item container justifyContent="center">
      <Typography
        // 4. className={classes.copylight} を sx に変更
        sx={{
          marginTop: "15px",
          color: "#fff",
          fontSize: "1em"
        }}
      >
        &copy;{new Date().getFullYear()} Manabu.Sakichi.Site
      </Typography>
    </Grid>
  </Container>   
</Box>
  )
}

export default Footer
