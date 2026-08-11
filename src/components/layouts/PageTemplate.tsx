import Head from "next/head"
import React from "react"

import Header from "./Header"
import Footer from "./Footer"
import ScrollUp from "../utils/ScrollUp"

interface PageTemplateProps {
  children: React.ReactNode
  title: string
  description?: string; // 👈 追加
  image?: string;       // 👈 追加
  color?: string;       // 👈 追加
}

const PageTemplate = ({ children, title, description, image, color }: PageTemplateProps) => {
  return (
    <>
      <Head>
        <title>{title ? title : "佐吉翁に学ぶ会"}</title>
      </Head>
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
      <ScrollUp />
      <footer>
        <Footer />
      </footer>
      <style jsx global>
        {`
          html,
          body {
            background: #F5F5F5;
            overflow-x: hidden;
            padding: 0 !important;
          }
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
        `}
      </style>
    </>
  )
}

export default PageTemplate
