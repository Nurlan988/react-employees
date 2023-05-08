import { TeamOutlined, UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import {Layout, Space, Typography} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CustomButton } from '../custom-button'
import { Paths } from '../../paths'
import { logout, selectUser } from '../../features/auth/authSlice'

import styles from './index.module.css'

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login')
  }
  
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon}/>
        <Link to={Paths.home}>
          <CustomButton type='ghost'>
            <Typography.Title level={1}>{user?.name} Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton 
          type='ghost' 
          icon={<LogoutOutlined/>}
          onClick={onLogoutHandler}
        >
          Logout
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type='ghost' icon={<UserOutlined/>}>Registration</CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type='ghost' icon={<LoginOutlined/>}>Login</CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}