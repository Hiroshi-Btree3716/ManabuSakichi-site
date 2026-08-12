import { GetStaticPaths, GetStaticProps } from "next"
import { makeStyles, ThemeProvider } from "@mui/styles"

import Qualifications from "../../components/recruit/Qualifications"
import { Container, Grid, Typography} from "@mui/material"
import PageTemplate from "../../components/layouts/PageTemplate"
import theme from "../../components/utils/theme"
import { jobDetails } from "../../data/jobDetails"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  },
  gridItem: {
    maxWidth: "1260px"
  }
}))

export interface JobDetail {
  id: string // 飛び先用のID（英語など）
  image: string
  name: string // 表示用の名前（日本語）
  description: string
  requiredSkills: string[]
  welcomeSkills: string[]
  idealImages: string[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  // /recruit/kentei などのパス一覧を動的に生成
  const paths = jobDetails.map((job) => `/recruit/${job.id}`)

  return { 
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const jobDetail = jobDetails.find((job) => job.id === String(params?.job)) || null

  return {
    props: { jobDetail },
    revalidate: 1
  }
}

interface RecruitJobProps {
  jobDetail: JobDetail | null
}

const RecruitJob: React.FC<RecruitJobProps> = ({ jobDetail }) => {
  const classes = useStyles()

  if (!jobDetail) {
    return (
      <ThemeProvider theme={theme}>
        <PageTemplate title="404 | Not Found">
          <Container maxWidth="lg" className={classes.container}>
            <Typography align="center" variant="h4">該当する活動が見つかりませんでした。</Typography>
          </Container>
        </PageTemplate>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <PageTemplate title={`Recruit | ${jobDetail.name}`}>
        <>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="h1" gutterBottom>
                  {jobDetail.name}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justifyContent="center">
              <Grid item className={classes.gridItem}>
                <img src={jobDetail.image} style={{ height: "auto", maxWidth: "100%" }} alt={jobDetail.name} />
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container justifyContent="center">
              <Grid item className={classes.gridItem}>
                <Typography variant="h2" gutterBottom>
                  Description
                </Typography>
                <Typography>
                  {jobDetail.description}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
              <Qualifications
                requiredSkills={jobDetail.requiredSkills}
                welcomeSkills={jobDetail.welcomeSkills}
                idealImages={jobDetail.idealImages}
              />
            </Grid>
          </Container>
        </>
      </PageTemplate>
    </ThemeProvider>
  )
}

export default RecruitJob