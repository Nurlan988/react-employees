import { FC, ReactNode } from "react"
import {Layout as AntLayout} from 'antd'
import styles from './index.module.css'
import { Header } from "../header"

type LayoutProps = {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className={styles.main}>
      <AntLayout.Content style={{height: '100%'}}>
        <Header/>
        {children}
      </AntLayout.Content>
    </div>
  )
}