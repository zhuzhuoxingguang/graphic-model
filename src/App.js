import React from "react"
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Login from "@/views/User"
import Layout from "@/layouts"
import { ConfigProvider } from "antd"
import zhCN from "antd/es/locale/zh_CN"

if (process.env.NODE_ENV === "development" && process.env.REACT_APP_BASE_URL === "mock") {
  require("./mock/index")
}
// console.log("process.env", process.env)

function App () {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route
            exact path="/"
          >
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </ConfigProvider>
  )
}

export default App
