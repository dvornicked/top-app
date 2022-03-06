import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Button, Htag, P, Rating, Tag } from '../components'
import { withLayout } from '../layout/Layout'
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface'

const Home: NextPage<HomeProps> = ({menu, firstCategory}): JSX.Element => {

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
      <ul>
        {menu.map(m => <li key={m._id.secondCategory}>{m._id.secondCategory}</li>)}
      </ul>
    </>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find', {firstCategory: 0})
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps {
  menu: MenuItem[]
  firstCategory: number
}
