import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {Row, Card, Form, Space, Typography} from 'antd'

import { CustomInput } from "../../components/custom-input"
import {Layout} from "../../components/layout"
import { PasswordInput } from "../../components/password-input"
import { CustomButton } from "../../components/custom-button"
import { Paths } from "../../paths"
import { UserData, useLoginMutation } from "../../app/services/auth"
import { isErrorWithMessage } from "../../utils/is-error-with-message"
import { ErrorMessage } from "../../components/error-message"

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const loginHandler = async(data: UserData) => {
    try{
      await loginUser(data).unwrap();

      navigate('/')
    } catch(err){
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
        <Card title='LogIn' style={{width: '30rem'}}>
          <Form onFinish={loginHandler}>
            <CustomInput name="email" placeholder="Email" type="email"/>
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit" loading={loginUserResult.isLoading}>
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size='large'>
            <Typography.Text>
              Not account? <Link to={Paths.register}>Register</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}