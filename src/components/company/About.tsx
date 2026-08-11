import { makeStyles } from "@mui/styles"
import {  Theme } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material//TableBody"
import TableCell from "@mui/material//TableCell"
import TableContainer from "@mui/material//TableContainer"
import TableRow from "@mui/material//TableRow"
import Paper from "@mui/material//Paper"

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650
  }
}))

const createData = (key: string, value: string) => {
  return { key, value }
}

interface AboutProps {
  name: string
  founded: string
  vice: string
  Acountant:string
  Secretariant:string
  ceo: string
  address: string
  service: string
  mail: string
  advisor:string
  support:string
}

const About = ({ name, founded, vice, Acountant, Secretariant, ceo, address, service, mail, advisor, support }: AboutProps) => {
  const classes = useStyles()

  const rows = [
    createData("Name", name),
    createData("Founded", founded),
    createData("CEO", ceo),
    createData("Vice", vice),
    createData("Advisor", advisor),
    createData("Acountant", Acountant),
    createData("Secretariant", Secretariant),   
    createData("Address", address),
    createData("Service", service),
    createData("Support", support),
    createData("Mail", mail),
  ]

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row" style={{ fontWeight: "bold"}}>
                {row.key}
              </TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default About
