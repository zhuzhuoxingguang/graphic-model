import React, { Component } from 'react'
import { Card, Layout, Table, Tabs, Icon } from 'antd'
import VTree from '@/components/VTree'
const { TabPane } = Tabs
const { Content } = Layout
const { Column } = Table

class NoCollectBus extends Component {
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
          <VTree treeData={[
            {
              label: '本部',
              key: 'ben',
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
          <Content style={{ paddingLeft: 20, background: '#fff' }}>
            <Tabs defaultActiveKey='table'>
              <TabPane
                tab={
                  <span>
                    <Icon type='bar-chart' /> 图形
                  </span>
                }
                key='chart'
              >
                Tab 1
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Icon type='table' /> 列表
                  </span>
                }
                key='table'
              >
                <Table dataSource={data}>
                  <Column title='rdfID' dataIndex='firstName' key='firstName' />
                  <Column title='设备名称' dataIndex='firstName' key='firstName' />
                  <Column title='设备类型' dataIndex='age' key='age' />
                  <Column title='变电站' dataIndex='lastName' key='lastName' />
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
                  <Column title='馈线ID' dataIndex='address' key='address' />
                </Table>
              </TabPane>
            </Tabs>
          </Content>
        </Layout>
      </Card>
    )
  }
}

export default NoCollectBus
