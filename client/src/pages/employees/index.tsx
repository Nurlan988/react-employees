import {PlusCircleOutlined} from '@ant-design/icons'
import {Table} from 'antd'
import {ColumnsType} from 'antd/es/table'
import {Employee} from '@prisma/client'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { CustomButton } from "../../components/custom-button"
import { Layout } from "../../components/layout"
import { useGetAllEmployeesQuery } from '../../app/services/employees'
import { Paths } from '../../paths'
import { selectUser } from '../../features/auth/authSlice'

const columns: ColumnsType<Employee> = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
]

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser)
  const {data, isLoading} = useGetAllEmployeesQuery();

  useEffect(()=>{
    if(!user) {
      navigate('/login')
    }
  }, [navigate, user])

  const addUserHandler = () => {
    navigate(Paths.employeeAdd)
  }

  return (
    <Layout>
      <CustomButton type="primary" onClick={addUserHandler} icon={<PlusCircleOutlined/>}>
        Add employees
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(employee)=> employee.id}
        onRow={(employee)=> {
          return{
            onClick: () => navigate(`${Paths.employee}/${employee.id}`)
          }
        }}
      />
    </Layout>
  )
}