import {
  FacebookShareButton,
  FacebookIcon,
  XShareButton,
  XIcon,
  LineShareButton,
  LineIcon,
} from "react-share"

interface ShareButtonProps {
  url: string
}

const ShareButton = ({ url }: ShareButtonProps) => (
  <>
    <FacebookShareButton url={url} style={{ outline: "none" }}>
      <FacebookIcon size="32px" round />
    </FacebookShareButton>
    <XShareButton
      url={url}
      style={{ marginLeft: `15px`, outline: "none" }}
    >
      <XIcon size="32px" round />
    </XShareButton>
    <LineShareButton url={url} style={{ marginLeft: `15px`, outline: "none" }}>
      <LineIcon size="32px" round />
    </LineShareButton>
  </>
)

export default ShareButton
