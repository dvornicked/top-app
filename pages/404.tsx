import type { NextPage } from 'next'
import { Htag } from '../components'
import { withLayout } from '../layout/Layout'

export const Error404: NextPage = (): JSX.Element => {
  return <Htag tag="h1">Ошибка 404</Htag>
}

export default withLayout(Error404)
