import React, { Component } from "react"
import { Form, Icon, Input, Button, Checkbox } from "antd"
import { regPassword, regAccount } from "@/utils/pattern"
import { doLogin } from "@/api/users"

class Login extends Component {
  handleSubmit = e => {
    // console.log(this.props)
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      // console.log(values)
      if (!err) {
        // console.log('Received values of form: ', values)
        // return this.props.history.push('/home')
        const { account, password, remember } = values
        doLogin(account, password, remember).then(res => {
          if (res.status.toLowerCase() === "ok") {
            this.props.history.push("/home")
          }
          // console.log("res:", res)
        })
      }
    })
  }

  componentDidMount() {
    // Spin.setDefaultIndicator(App)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="v-form">
          <h2>配电网络模型校验系统</h2>
          <h4>国网江苏电力有限公司苏州供电分公司</h4>
          <Form onSubmit={this.handleSubmit} className="v-login">
            <Form.Item>
              {getFieldDecorator("account", {
                rules: [
                  { required: true, message: "请输入账户名称", trigger: "blur" },
                  {
                    pattern: regAccount,
                    message: "账户名称以字母开头，字母数字_组成，非_结尾",
                    trigger: "change"
                  }
                ]
              })(
                <Input
                  size="large"
                  autoComplete="off"
                  prefix={<Icon type="user" style={{ color: "#c1c8d1" }} />}
                  placeholder="账户名称"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "请输入密码" },
                  {
                    pattern: regPassword,
                    message: "密码以数字或字母开头，6到16位数字字母_组成",
                    trigger: "change"
                  }
                ]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" style={{ color: "#c1c8d1" }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox style={{ color: "#c1c8d1" }}>记住账户</Checkbox>)}
            </Form.Item>
            <Form.Item>
              <Button block size="large" type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: "normal_login" })(Login)
