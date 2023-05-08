import {Form, Input} from 'antd'
import { FC } from 'react';

type CustomInputProps = {
  name: string;
  placeholder: string;
  type?: string;
}

export const CustomInput: FC<CustomInputProps> = ({name, placeholder, type='text'}) => {
  return (
    <Form.Item
      name={name}
      rules={[{required: true, message: "Required input"}]}
      shouldUpdate={true}
    >
      <Input
        placeholder={placeholder}
        type={type}
        size='large'
      />
    </Form.Item>
  )
}