import { makeStyles, ThemeProvider } from "@mui/styles"

import { Container, Grid, Typography} from "@mui/material"

import Features from "../components/service/Features"
import PageTemplate from "../components/layouts/PageTemplate"
import theme from "../components/utils/theme"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

interface Feature {
  title: string
  description: string
}

const Service: React.FC = () => {
  const classes = useStyles()

  const features: Feature[] = [
    {
      title: "設立経緯",
      description: "本会は、2014年（平成26年）から進められた「豊田佐吉翁生誕150年記念事業」の企画委員会を前身としています。2年間にわたる記念事業の取り組みを経て、生誕150周年を迎えた2017年（平成29年）4月、行政主導の事業にとどめることなく、佐吉翁の偉業や精神を地域社会・後世へ永続的に継承していくため、企画委員有志や地域住民が中心となって発足いたしました。"
    },
    {
      title: "設立趣旨",
      description: "日本の発明王であり湖西市が誇る偉人・豊田佐吉翁の「人となり」や「モノづくり精神（創意工夫・たゆまぬ挑戦）」を深く学び、地域で語り継ぐことを目的としています。青少年の健やかな育成や、新たな価値を切り拓く人材づくりに寄与するとともに、ゆかりの地を巡る活動や文化・研究事業を通じて、市民の皆様が郷土への愛着と誇りを深められる場を提供してまいります。"
    },
    {
      title: "入会手続き",
      description: "当会の趣旨にご賛同いただける方であれば、どなたでもご入会いただけます。当会は「一生会員制」をとっており、毎年の年会費の負担なく末長く活動にご参加いただけます。"
    }
  ]

  return (
    <>
      <ThemeProvider theme={theme}>
        <PageTemplate title="Service | Corporate Site Sample">
          <>
            <Container maxWidth="lg"className={classes.container}>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="h1" gutterBottom>
                    佐吉翁に学ぶ会とは
                  </Typography>

                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              { features.map((feature, index) => (
                  <Features
                    key={index}
                    
                    title={feature.title}
                    description={feature.description}
                  />
                ))
              }
            </Container>
          </>
        </PageTemplate>
      </ThemeProvider>
    </>
  )
}

export default Service
