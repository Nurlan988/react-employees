import {useState} from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Descriptions, Divider, Space, Modal } from 'antd';

import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { selectUser } from '../../features/auth/authSlice';
import { Layout } from '../../components/layout';
import { CustomButton } from '../../components/custom-button';
import { ErrorMessage } from '../../components/error-message';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const params = useParams<{id:string}>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data, isLoading} = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);
  
  


  if(isLoading) return (<span>Loading...</span>);
  
  if(!data) return (<Navigate to='/'/>);

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleRemoveUser = async() => {
    hideModal();

    try{
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
    } catch(err) {
      const maybeError = isErrorWithMessage(err);

      if(maybeError){
        setError(err.data.message)
      } else {
        setError('Unknow error')
      }
    }
  }

  return (
    <Layout>
      <Descriptions title='Employee info' bordered={true}>
        <Descriptions.Item label='Name' span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label='Age' span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label='Address' span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>
      {
        user?.id === data.userId && (
          <>
            <Divider orientation='left'>Actions</Divider>
            <Space>
              <Link to={`/employee/edit/${data.id}`}>
                <CustomButton
                  shape='round'
                  type='default'
                  icon={<EditOutlined/>}
                >Edit</CustomButton>
              </Link>
              <CustomButton
                shape='round'
                danger
                onClick={showModal}
                icon={<DeleteOutlined/>}
              >Remove</CustomButton>
            </Space>
          </>
        )
      }
      <ErrorMessage message={error}/>
      <Modal 
        title='Comfirm remove'
        open={isModalOpen}
        onOk={handleRemoveUser}
        onCancel={hideModal}
        okText='Comfirm'
        cancelText="Cancel"
      >
        Do you really want to delete?
      </Modal>
    </Layout>
  )
}