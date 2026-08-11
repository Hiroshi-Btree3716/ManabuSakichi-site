import { makeStyles, ThemeProvider } from "@mui/styles"
import { Container, Grid, Typography} from "@mui/material"

import Jobs from "../components/recruit/Jobs"
import Slider from "../components/recruit/Slider"
import PageTemplate from "../components/layouts/PageTemplate"
import theme from "../components/utils/theme"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem",
    padding: "0 1rem"
  }
}))

interface Job {
  id:string,
  name: string
}

const Recruit: React.FC = () => {
  const classes = useStyles()

  const jobs: Job[] = [
    {
      name: "佐吉検定",
      id:"kentei"
    },
    {
      name: "佐吉翁ゆかりの研修旅行",
      id:"goods"
    },
    {
      name: "佐吉翁を語る会講演会",
      id:"speaker"
    },
    {
      name: "佐吉翁に学ぶ会運営",
      id:"meeting"
    }
  ]

  const images: string[] = [
    "/佐吉検定.jpg",
    "/報徳社見学.jpg",
    "/佐吉翁講演会2.jpg",
    "/障子.jpg"
    
  ]

  return (
    <>
      <ThemeProvider theme={theme}>
        <PageTemplate title="Recruit | Corporate Site Sample">
          <>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="h1" gutterBottom>
                    活動・イベント
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={2} justifyContent="center">
                <Grid container item xs={12} spacing={2}>
                  <Jobs
                    jobs={jobs}
                  />
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Slider images={images} />
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Typography align="center">
                Please feel free to contact us.
              </Typography>
            </Container>
          </>
        </PageTemplate>
      </ThemeProvider>
    </>
  )
}

export default Recruit
