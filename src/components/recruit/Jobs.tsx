import React from "react"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { Grid, Paper } from "@mui/material"

import Link from "../utils/Link"

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: "1rem",
    height: "100%",
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: 32,
  },
}))

// 単体のJobコンポーネントが受け取るデータの型
interface JobProps {
  name: string
  id: string
}

const Job: React.FC<JobProps> = ({ name, id }) => {
  const classes = useStyles()

  return (
    <Grid item xs={6}>
      {/* 動的ルーティングの href と実際のパス as を指定 */}
      <Link href="/recruit/[job]" as={`/recruit/${id.toLowerCase()}`}>
        <Paper className={classes.paper}>{name}</Paper>
      </Link>
    </Grid>
  )
}

// Jobsコンポーネント全体が受け取る props の型
interface JobsProps {
  jobs: {
    name: string
    id: string
  }[]
}

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
  return (
    <>
      {jobs.map((job) => (
        <Job
          key={job.id} 
          id={job.id}   
          name={job.name}
        />
      ))}
    </>
  )
}

export default Jobs