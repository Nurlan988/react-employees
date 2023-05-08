import {Button, Form} from 'antd'
import { FC, ReactNode } from 'react'

type CustomButtonProps = {
  children: ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: ()=> void;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: "circle" | "default" | "round" | undefined;
  icon?: React.ReactNode;
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  type,
  danger,
  loading,
  htmlType = 'button',
  onClick,
  shape,
  icon
  }) => {
  return (
    <Form.Item>
      <Button 
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        size="large"
        shape={ shape }
        onClick={ onClick }
        icon={ icon }
      >{children}</Button>
    </Form.Item>
  )
}