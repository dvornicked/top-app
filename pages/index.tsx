import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Button, Htag, P, Rating, Tag } from '../components'

const Home: NextPage = () => {

  const [rating, setRating] = useState<number>(4)

  return (
    <>
      <Head>
        <title>MyTop</title>
      </Head>
      <Htag tag='h1'>Заголовок</Htag>
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
      <Rating rating={rating} setRating={setRating} isEditable/>
    </>
  )
}

export default Home
