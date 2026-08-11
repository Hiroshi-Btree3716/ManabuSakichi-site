import { Theme } from "@mui/material/styles"
import { makeStyles} from "@mui/styles"
import { Typography, Box, Button } from "@mui/material"

const useStyles = makeStyles((theme: Theme) => ({
  linkButton: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    border: "transparent 1px solid",
    borderRadius: 50,
    backgroundColor: "#4F9DF7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#4F9DF7"
    }
  }
}))

interface IntroductionsProps {
  index: number
  title: string
  description: string
  action: string
  href: string
}

const Introductions = ({ index, title, description, action, href }: IntroductionsProps) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h1" gutterBottom align={index % 2 == 0 ? "left" : "right"}>
        {title}
      </Typography>
      <Typography variant="body1" align={index % 2 == 0 ? "left" : "right"} paragraph>
        {description}
      </Typography>
      <Box textAlign={index % 2 == 0 ? "left" : "right"}>
        <Button variant="outlined" color="primary" className={classes.linkButton} href={href}>
          {action}
        </Button>
      </Box>
    </>
  )
}

export default Introductions
