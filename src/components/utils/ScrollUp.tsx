import ScrollToTop from "react-scroll-to-top"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const ScrollUp: React.FC = () => {

  return(
    <>
      <ScrollToTop
        smooth
        component={<KeyboardArrowUpIcon />}
        style={{
          borderRadius: "50%"
        }}
      />
    </>
  )
}

export default ScrollUp
