import {useState} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { Employee } from '@prisma/client';
import { Row } from 'antd';

import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import { Layout } from '../../components/layout';
import { EmploeeForm } from '../../components/emploee-form';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utils/is-error-with-message';

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{id: string}>();
  const [error, setError] = useState('');
  const {data, isLoading} = useGetEmployeeQuery(params.id || '')
  const [editEmployee] = useEditEmployeeMutation();

  if(isLoading) return (<span>Loading...</span>);

  const handleEditUser = async(employee: Employee) => {
    try{
      const editedEmployee = {
        ...data,
        ...employee
      };

      await editEmployee(editedEmployee);

      navigate(`${Paths.status}/updated`);
    } catch(err) {
      const maybeError = isErrorWithMessage(err);

      if(maybeError) {
        setError(err.data.message)
      }else{
        setError('Unknow error');
      }
    }
  }

  return (
    <Layout>
      <Row align={ 'middle'} justify={'center'}>
        <EmploeeForm
          title='Edit employee'
          btnText='Edit'
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  )
}