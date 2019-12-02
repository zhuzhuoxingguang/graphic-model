import React, { Component } from 'react'
import { Card, Form, Input, Button } from 'antd'
const size = 'large'
class Search extends Component {
  // 确定Form类型
  resetFormItem = item => {
    const { getFieldDecorator } = this.props.form
    if (!item || !item.props || !item.props.formType) return null
    switch (item.props.formType) {
      case 'Input':
        return getFieldDecorator(item.key, { initialValue: '' })(
          <Input size={size} autoComplete='off' allowClear type={item.props.type} placeholder={item.props.placeholder} />
        )
      default:
        return getFieldDecorator(item.key)(
          <Input size={size} autoComplete='off' type={item.props.type} placeholder={item.props.placeholder} />
        )
    }
  }

  handleSubmit = () => {
    this.props.search(this.props.form.getFieldsValue())
  }

  render () {
    const { children } = this.props
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <Form layout='inline' onSubmit={this.handleSubmit}>
          {
            this.props.children.length
              ? this.props.children.map((item, index) => {
                return (
                  <Form.Item key={index}>
                    {this.resetFormItem(item)}
                  </Form.Item>
                )
              })
              : (
                <Form.Item>
                  {this.resetFormItem(children)}
                </Form.Item>
              )
          }
          <Form.Item>
            <Button size={size} type='primary' htmlType='submit' icon='search'> 搜 索 </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create({ name: 'search' })(Search)
