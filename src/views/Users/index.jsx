import React, { Component } from 'react'
import { Table, Card, Input, Form } from 'antd'
import SearchForm from '@/components/SearchForm'
import VLink from '@/components/VLink'
import VText from '@/components/VText'
import DialogForm from './DialogForm'
import VPagination from '@/components/VPagination'
import { regMobile } from '@/utils/pattern'
import axios from 'axios'
const { Column } = Table
const { VLinkGroup } = VLink

class Feeders extends Component {
  state = {
    users: [
      {
        id: 12,
        accountNumber: 'James',
        password: null,
        name: '詹姆斯',
        phone: '13987661111',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 11,
        accountNumber: 'hadeng',
        password: null,
        name: '哈登',
        phone: '17701223323',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 10,
        accountNumber: 'qing',
        password: null,
        name: '董卿',
        phone: '18809901112',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 9,
        accountNumber: 'test',
        password: null,
        name: 'test',
        phone: '15050511245',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 8,
        accountNumber: 'tomasd',
        password: null,
        name: 'Tom',
        phone: '14701298901',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 7,
        accountNumber: 'meim',
        password: null,
        name: '韩梅梅',
        phone: '17109911232',
        accountStatus: 0,
        state: null,
        addTime: null
      },
      {
        id: 6,
        accountNumber: 'xiayu',
        password: null,
        name: '赤瑕瑜',
        phone: '15600991111',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 5,
        accountNumber: 'baigui',
        password: null,
        name: '江白圭',
        phone: '19809911112',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 4,
        accountNumber: 'user',
        password: null,
        name: '秦牧',
        phone: '13411221111',
        accountStatus: 1,
        state: null,
        addTime: null
      },
      {
        id: 3,
        accountNumber: 'zhuzhuzhu',
        password: null,
        name: '猪久戒',
        phone: '15254258421',
        accountStatus: 1,
        state: null,
        addTime: null
      }],
    visible: false
  }

  user = {}

  getUsers = () => {
    axios.get('/api/user').then(res => {
      this.setState({ users: res.data.result.list })
    })
  }

  handelEditUser = user => {
    console.log(user)
    this.setState({ visible: true })
  }

  judgeSameObj = (newValue, oldValue) => {
    // 判断当前搜索条件是否重置了
    return Object.keys(newValue).some(item => newValue[item] !== oldValue[item])
  }

  handleSubmit = user => {
    // 判断当前搜索条件是否重置了
    const changed = this.judgeSameObj(user, this.user)
    if (!changed) return
    this.user = user
    this.getUsers()
  }

  componentDidMount () {
    this.getUsers()
  }

  render () {
    const { users } = this.state

    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    const config = {
      rules: [{
        type: 'string', required: true, message: '用户名不能为空'
      }]
    }
    const configAccount = {
      rules: [{ type: 'string', required: true, message: '账号不能为空' }]
    }

    return (
      <div>
        <SearchForm search={this.handleSubmit}>
          <Input placeholder='请输入用户名' key='userName' formType='Input' />
          <Input placeholder='请输入联系电话' key='phone' formType='Input' />
        </SearchForm>

        <Card bodyStyle={{ minHeight: 'calc(100vh - 273px)', padding: 0 }} style={{ marginTop: 20 }}>
          <Table dataSource={users} rowKey='id' pagination={false}>
            <Column title='姓名' dataIndex='name' key='name' />
            <Column title='账号' dataIndex='accountNumber' key='accountNumber' />
            <Column title='电话' dataIndex='phone' key='phone' align='center' />
            <Column
              title='账号状态'
              dataIndex='accountStatus'
              key='accountStatus'
              align='center'
              render={(text, record) => {
                return text === 1 ? <VText>正常</VText> : <VText type='danger'>封禁</VText>
              }}
            />
            <Column
              title='操作'
              align='center'
              width='200px'
              render={(text, record) => {
                return (
                  <VLinkGroup>
                    <VLink onClick={() => this.handelEditUser(record)}>编辑</VLink>
                    <VLink>重置密码</VLink>
                    <VLink type='danger'>封禁</VLink>
                  </VLinkGroup>
                )
              }}
            />
          </Table>
          <VPagination align='right' onPaginationChange={this.handlePaginationChange} />
        </Card>
        <DialogForm
          visible={this.state.visible}
          onCancel={() => { this.setState({ visible: false }) }}
          onOk={this.handleSubmit}
        >
          <Form {...formItemLayout}>
            <Form.Item label='姓名'>
              {getFieldDecorator('username', config)(<Input allowClear size='large' autoComplete='off' placeholder='请输入用户名' />)}
            </Form.Item>
            <Form.Item label='账号'>
              {getFieldDecorator('account', configAccount)(<Input allowClear size='large' autoComplete='off' placeholder='请输入账号' />)}
            </Form.Item>
            <Form.Item label='电话' extra='初始密码为手机号码后6位'>
              {getFieldDecorator('phone', { rules: [{ required: true, pattern: regMobile, message: '国内手机号码' }] })(<Input allowClear maxLength={11} size='large' autoComplete='off' placeholder='请输入手机号码' />)}
            </Form.Item>
          </Form>
        </DialogForm>
      </div>
    )
  }
}
export default Form.create()(Feeders)
