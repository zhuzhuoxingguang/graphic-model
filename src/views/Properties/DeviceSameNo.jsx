import React, { Component } from 'react'
import { Card, Layout, Table } from 'antd'
import ListTree from '@/components/ListTree'
const { Content } = Layout
const { Column } = Table

class DevicesSameNO extends Component {
  state = {
    data: [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ]
  }

  render () {
    const { data } = this.state
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Layout>
          <ListTree />
          <Content style={{ paddingLeft: 20, background: '#fff' }}>
            <Table
              dataSource={data}
              expandedRowRender={record => <p style={{ margin: 0 }}>{record.age}</p>}
            >
              <Column title='设备名称' dataIndex='age' key='age' />
              <Column title='设备类型' dataIndex='age' key='age' />
              <Column title='变电站' dataIndex='address' key='address' />
              <Column title='配电站' dataIndex='address' key='address' />
              <Column
                title='馈线'
                key='action'
                render={(text, record) => (
                  <span>
                    <span>Invite {record.lastName}</span>
                  </span>
                )}
              />
            </Table>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default DevicesSameNO
