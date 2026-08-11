import {  Theme } from "@mui/material/styles"
import {makeStyles } from "@mui/styles"
import { Grid } from "@mui/material"
import MailIcon from "@mui/icons-material/Mail"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"

const useStyles = makeStyles((theme: Theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    }
  }
}))

interface SocialMediaProps {
  color?: string
}

const SocialMedia = ({ color }: SocialMediaProps) => {
  //const classes = useStyles()

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href="/contact"
      >
        <MailIcon
          //className={classes.snsIcon}
          sx={(theme) => ({
      width: "30px",
      height: "30px",
      [theme.breakpoints.down("sm")]: { // MUI v5では down("xs") ではなく down("sm") または実数値が推奨されます
        width: "25px",
        height: "25px",
      }
    })}
          color={color ? "primary" : "secondary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href=""
      >
        <TwitterIcon
          //className={classes.snsIcon}
          sx={(theme) => ({
      width: "30px",
      height: "30px",
      [theme.breakpoints.down("sm")]: { // MUI v5では down("xs") ではなく down("sm") または実数値が推奨されます
        width: "25px",
        height: "25px",
      }
    })}
          color={color ? "primary" : "secondary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href=""
      >
        <InstagramIcon
          //className={classes.snsIcon}
          sx={(theme) => ({
      width: "30px",
      height: "30px",
      [theme.breakpoints.down("sm")]: { // MUI v5では down("xs") ではなく down("sm") または実数値が推奨されます
        width: "25px",
        height: "25px",
      }
    })}
          color={color ? "primary" : "secondary"}
        />
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href=""
      >
        <FacebookIcon
          //className={classes.snsIcon}
          sx={(theme) => ({
      width: "30px",
      height: "30px",
      [theme.breakpoints.down("sm")]: { // MUI v5では down("xs") ではなく down("sm") または実数値が推奨されます
        width: "25px",
        height: "25px",
      }
    })}
          color={color ? "primary" : "secondary"}
        />
      </Grid>
    </Grid>
  )
}

export default SocialMedia
