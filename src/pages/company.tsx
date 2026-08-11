import { makeStyles, ThemeProvider } from "@mui/styles"
import { Container, Grid, Typography} from "@mui/material"

import About from "../components/company/About"
import PageTemplate from "../components/layouts/PageTemplate"
import theme from "../components/utils/theme"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

interface About {
  name: string
  founded: string
  advisor:string
  ceo: string
  vice: string
  Acountant:string
  Secretariant:string
  address: string
  service: string
  mail: string
  support:string
}

const Company: React.FC = () => {
  const classes = useStyles()

  const about: About = {
    name: "正式名称：佐吉翁に学ぶ会",
    founded: "設立日　：2018/05/01",
    advisor: "顧問　　：三上　元　",
    ceo: "会長　　：小池　力",
    vice: "副会長　：小野田　冨康",
    Acountant: "会計　　：野末　高広",
    Secretariant: "事務担当：鈴木　弘",
    address: "所在地　：静岡県湖西市坊瀬",
    service: "活動内容：佐吉翁を語る会運営　佐吉検定、佐吉翁を語る会講演会、佐吉翁の足跡をめぐる研修旅行",
    mail: "メール　：hiroshi.btree@gmail.com",
    support: "協賛　：湖西市文化協会　　協力：トヨタバッテリー株式会社（TOYOTA BATTERY）"
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <PageTemplate title="Organization | Corporate Site Sample">
          <>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="h1" gutterBottom>
                    基本情報
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <About
                name={about.name}
                founded={about.founded}
                ceo={about.ceo}
                vice={about.vice}
                Acountant={about.Acountant}
                Secretariant={about.Secretariant}
                advisor={about.advisor}
                address={about.address}
                service={about.service}
                mail={about.mail}
                support={about.support}
              />
            </Container>
          </>
        </PageTemplate>
      </ThemeProvider>
    </>
  )
}

export default Company
