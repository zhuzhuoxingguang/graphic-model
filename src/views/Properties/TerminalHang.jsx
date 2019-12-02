import React, { Component } from 'react'
import { Card, Layout, Table } from 'antd'
import VTree from '@/components/VTree'
const { Content } = Layout
const { Column } = Table

class TerminalHang extends Component {
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
      <Card bodyStyle={{ padding: 0 }}>
        <Layout>
          <VTree treeData={[
            {
              label: '本部',
              key: 'ben',
              icon: 'mail',
              children: [
                {
                  label: '双湖变',
                  key: 'shuanghu',
                  children: [
                    {
                      label: '10kV碧桂园#1线146',
                      key: '1000001',
                      children: [
                        {
                          label: '漕东联K5330',
                          key: 2000001111
                        },
                        {
                          label: '东漕联K6240',
                          key: 2000001112
                        }
                      ]
                    },
                    {
                      label: '10kV下坝线132',
                      key: '1000002'
                    }
                  ]
                },
                {
                  label: '淳东变',
                  key: 'chundong'
                }
              ]
            },
            {
              label: '本部123',
              key: 'ben12',
              icon: 'appstore',
              children: [
                {
                  label: '上饶变',
                  checked: true,
                  key: 'shangrao'
                }
              ]
            }
          ]}
          />
          <Content style={{ background: '#fff', padding: 20 }}>
            <Table
              dataSource={data}
            >
              <Column title='rdfID' dataIndex='firstName' key='firstName' />
              <Column title='设备名称' dataIndex='firstName1' key='firstName2' />
              <Column title='设备类型' dataIndex='age' key='age' />
              <Column title='变电站' dataIndex='lastName' key='lastName' />
              <Column title='配电站' dataIndex='address1' key='address' />
              <Column
                title='馈线'
                key='action'
                render={(text, record) => (
                  <span>
                    <span>Invite {record.lastName}</span>
                  </span>
                )}
              />
              <Column title='馈线ID' dataIndex='address' key='address2' />
            </Table>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default TerminalHang
