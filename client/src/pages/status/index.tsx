import { Link, useParams } from "react-router-dom"
import { Row, Result, Button } from "antd"

const Statuses: Record<string, string> = {
  created: 'User successfully created',
  updated: 'User successfully updated',
  deleted: 'User successfully deleted',
}

export const Status = () => {
  const {status} = useParams();

  return (
    <Row align='middle' justify='center' style={{width: '100%'}}>
      <Result
        status={status ? 'success' : '404'}
        title={status ? Statuses[status] : 'Undefined'}
        extra={
          <Button key='dashboard'>
            <Link to='/'>Home</Link>
          </Button>
        }
      />
    </Row>
  )
}