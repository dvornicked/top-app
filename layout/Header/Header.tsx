import styles from './Header.module.css'
import { HeaderProps } from './Header.props'
import Logo from '../logo.svg'
import cn from 'classnames'
import { ButtonIcon } from '../../components'
import { Sidebar } from '../Sidebar/Sidebar'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const shouldReduceMotion = useReducedMotion()
  const [isOpened, setIsOpened] = useState<Boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setIsOpened(false)
  }, [router])

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%'
    }
  }
  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)}/>
      <motion.div className={styles.mobileMenu} variants={variants} initial='closed' animate={isOpened ? 'opened' : 'closed'}>
        <Sidebar />
        <ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={() => setIsOpened(false)}/>
      </motion.div>
    </header>
  )
}
