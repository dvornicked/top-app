import type { GetStaticProps, NextPage } from 'next'
import { withLayout } from '../layout/Layout'
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface'

const Search: NextPage = (): JSX.Element => {
  return <>Search</>
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    { firstCategory: 0 }
  )
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
