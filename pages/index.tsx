import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, Htag, P, Tag } from '../components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MyTop</title>
      </Head>
      <Htag tag='h1'>Text</Htag>
      <Button appearance='primary' arrow='right'>Кнопка</Button>
      <Button appearance='ghost' arrow='down'>Кнопка</Button>
      <P size='s'>Параграф</P>
      <P>Параграф</P>
      <P size='l'>Параграф</P>
      <Tag className='s'>Ghost</Tag>
      <Tag className='m' color='red'>Red</Tag>
      <Tag className='s' color='green'>Green</Tag>
      <Tag className='s' color='gray'>G ray</Tag>
      <Tag color='primary'>Мал</Tag>
    </>
  )
}

export default Home
