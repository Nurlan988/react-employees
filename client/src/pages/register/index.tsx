import { Link, useNavigate } from "react-router-dom"
import {Row, Card, Form, Space, Typography} from 'antd'
import {useState} from 'react'
import { useSelector } from "react-redux"
import { User } from "@prisma/client"

import { CustomInput } from "../../components/custom-input"
import {Layout} from "../../components/layout"
import { PasswordInput } from "../../components/password-input"
import { CustomButton } from "../../components/custom-button"
import { Paths } from "../../paths"
import { selectUser } from "../../features/auth/authSlice"
import { useRegisterMutation } from "../../app/services/auth"
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import { ErrorMessage } from "../../components/error-message"

type RegisterData = Omit<User, 'id'> & {comfirmPassword: string}

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState('');
  const [registerUser] = useRegisterMutation();

  const useStateHandler = async(data: RegisterData) => {
    try{
      await registerUser(data).unwrap();

      navigate('/')
    } catch(err) {
      const maybeError = isErrorWithMessage(err);

      if(maybeError){
        setError(err.data.message);
      } else{
        setError('Unknown error')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Register' style={{width: '30rem'}}>
          <Form onFinish={useStateHandler}>
            <CustomInput name="name" placeholder="Name"/>
            <CustomInput name="email" placeholder="Email" type="email"/>
            <PasswordInput name="password" placeholder="Password"/>
            <PasswordInput name="confirmPassword" placeholder="Confirm password"/>
            <CustomButton type="primary" htmlType="submit">
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size='large'>
            <Typography.Text>
              Already registered? <Link to={Paths.login}>LogIn</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}