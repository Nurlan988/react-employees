import { FC } from "react";
import { Card, Form, Space } from "antd";
import { Employee } from "@prisma/client";

import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomButton } from "../custom-button";

type EmploeeFormProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T
}

export const EmploeeForm: FC<EmploeeFormProps<Employee>> = ({
  onFinish,
  title,
  employee,
  error,
  btnText
}) => {
  return (
    <Card title={title} style={{width: '30rem'}}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Name"/>
        <CustomInput name="lastName" placeholder="Surname"/>
        <CustomInput type="text" name="age" placeholder="Age"/>
        <CustomInput type="text" name="address" placeholder="Address"/>
        <Space style={{alignItems: 'flex-start'}}>
          <CustomButton htmlType="submit">{btnText}</CustomButton>
          <ErrorMessage message={error}/>
        </Space>
      </Form>
    </Card>
  )
}