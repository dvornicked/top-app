import styles from './Layout.module.css'
import { HeaderProps } from './Header.props'
import cn from 'classnames'

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return (
    <div {...props}>
      Header
    </div>
  )
}
