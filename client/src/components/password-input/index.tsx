import {Form, Input} from 'antd'
import {NamePath} from 'antd/es/form/interface'
import { FC } from 'react';

type PasswordInputProps = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[]  
}

export const PasswordInput: FC<PasswordInputProps> = ({name, placeholder, dependencies}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[{
        required: true,
        message: 'Required input'
      }, ({getFieldValue})=> ({
        validator(_, value){
          if(!value) {
            return Promise.resolve();
          }
          if(name==='confirmPassword'){
            if(!value || getFieldValue('password') === value){
              return Promise.resolve();
            } 
            return Promise.reject(new Error('Passwords must match'));
          }else{
            if(value.length < 6){
              return Promise.reject(new Error('Password must be more than 6 characters'))
            } 
            return Promise.resolve();
          }
        }
      })
    ]}
    >
      <Input placeholder={placeholder} size='large' type='password'/>
    </Form.Item>
  )
}