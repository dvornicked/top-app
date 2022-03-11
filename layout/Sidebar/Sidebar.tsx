import styles from './Footer.module.css'
import { SidebarProps } from './Sidebar.props'
import cn from 'classnames'
import { Menu } from '../Menu/Menu'
import Logo from '../logo.svg'


export const Sidebar = ({className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo />
      <div>Search</div>
      <Menu />
    </div>
  )
}
