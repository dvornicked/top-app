import type { NextPage } from 'next'
import Head from 'next/head'
import { Htag } from '../components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MyTop</title>
      </Head>
      <Htag tag='h1'>Text</Htag>
    </>
  )
}

export default Home
