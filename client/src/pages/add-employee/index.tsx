import { useEffect, useState } from "react"
import { Row } from "antd"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Employee } from "@prisma/client";

import { Layout } from "../../components/layout"
import { EmploeeForm } from "../../components/emploee-form"
import { selectUser } from "../../features/auth/authSlice"
import { useAddEmployeeMutation } from "../../app/services/employees"
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";


export const AddEmployee = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  }, [navigate, user])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unknow Error");
      }
    }
  };

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmploeeForm 
          title="Add Employee"
          btnText="Add"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}