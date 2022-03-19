import type { NextPage } from 'next'
import { Htag } from '../components'
import { withLayout } from '../layout/Layout'

export const Error500: NextPage = (): JSX.Element => {
  return <Htag tag="h1">Ошибка 500</Htag>
}

export default withLayout(Error500)
