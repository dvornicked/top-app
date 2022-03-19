import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage
} from 'next'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'
import { withLayout } from '../../layout/Layout'
import { firstLevelMenu } from '../../helpers/helpers'
import { ParsedUrlQuery } from 'querystring'
import { API } from '../../helpers/api'

const Type: NextPage<TypeProps> = ({ firstCategory }): JSX.Element => {
  return <>Type: {firstCategory}</>
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  const firstCategoryItem =
    params && firstLevelMenu.find(m => m.route == params.type)
  if (!firstCategoryItem) return { notFound: true }
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: 0
  })

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}

interface TypeProps {
  menu: MenuItem[]
  firstCategory: number
}
