import { makeStyles } from "@mui/styles"
import { Grid} from "@mui/material"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    marginBottom: "0.5rem",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "1px 0px 20px -1px rgba(0,0,0,0.2), 0px 0px 20px 5px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)"
    }
  },
  cardHeader: {
    padding: "1rem 1rem 0.5rem"
  }
}))

interface QualificationsProps {
  requiredSkills: string[]
  welcomeSkills: string[]
  idealImages: string[]
}

const Qualifications = ({ requiredSkills, welcomeSkills, idealImages}: QualificationsProps) => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardHeader title="Execution Time" className={classes.cardHeader} />
          <List>
            { requiredSkills.map((requiredSkill, index) => (
              <ListItem key={index}>
                <ListItemText
                  secondary={`・${requiredSkill}`}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardHeader title="Action History" className={classes.cardHeader} />
          <List>
            { welcomeSkills.map((welcomeSkill, index) => (
              <ListItem key={index}>
                <ListItemText
                  secondary={`・${welcomeSkill}`}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardHeader title=" Remarks" className={classes.cardHeader} />
          <List>
            { idealImages.map((idealImage, index) => (
              <ListItem key={index}>
                <ListItemText
                  secondary={`・${idealImage}`}
                />
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
    </>
  )
}

export default Qualifications
