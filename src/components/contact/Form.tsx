import React, { useState } from "react"

import { createStyles, makeStyles } from "@mui/styles"
import {  Theme } from "@mui/material/styles"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"

import { createContact } from "../../lib/api"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children ?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  const {children, ...other} =props
  return <Slide direction="up" ref={ref} {...props} >
    {children}
  </Slide>

})

interface CompletionDialogProps {
  open: boolean
  handleClose: VoidFunction
}

// 送信完了したらダイアログを表示
const CompletionDialog = ({ open, handleClose}: CompletionDialogProps) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          Thank you for contacting us !
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please wait a couple of days for our reply.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: "1rem 4rem"
    },
    header: {
      marginTop: "1.5rem"
    },
    submitBtn: {
      margin: theme.spacing(2),
      textTransform: "none"
    }
  })
)

const Form = () => {
  const classes = useStyles()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const data: {} = {
      name: name,
      email: email,
      body: body
    }

    createContact(data)
    .then(() => {
      handleOpen()
      setName("")
      setEmail("")
      setBody("")
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
      <Container fixed>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                required
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="Body"
                multiline
                rows={10}
                value={body}
                variant="outlined"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
                style={{ marginTop: "2rem"}}
              />
            </CardContent>
            <Box p={1} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                //color="default"
                disabled={!name || !email || !body ? true : false}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Box>
          </Card>
        </form>
        <CompletionDialog
          open={open}
          handleClose={handleClose}
        />
      </Container>
    </>
  )
}

export default Form
