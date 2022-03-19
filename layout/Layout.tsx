import styles from './Layout.module.css'
import { LayoutProps } from './Layout.props'
import cn from 'classnames'

import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import { FC, useRef, useState, KeyboardEvent } from 'react'
import { AppContextProvider, IAppContext } from '../context/app.context'
import { Up } from '../components'

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault()
      bodyRef.current?.focus()
    }
    setIsSkipLinkDisplayed(false)
  }
  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipContentAction}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main role="main" ref={bodyRef} tabIndex={0} className={styles.body}>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Object & IAppContext>(
  Component: FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
