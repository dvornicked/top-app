import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Htag } from '../components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MyTop</title>
      </Head>
      <Htag tag='h1'>Text</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
    </>
  )
}

export default Home
