import React, { Component } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Home from "@/views/Home"
import { Layout, Spin } from "antd"
import NavMenu from "@/components/NavMenu"
import PageHeader from "@/components/PageHeader"
import { collapseNavMenu, changeLoading } from "@/store/actions/constant"
import SubstationsFeeders from "@/views/Relation/SubstationFeeder"
import Substations from "@/views/Relation/Substations"
import Feeders from "@/views/Relation/Feeders"
import Users from "@/views/Users"
import Model from "@/views/Model"
import PropSubstation2Feeder from "@/views/Properties/Substation2Feeder"
import PropSameNameDevice from "@/views/Properties/DeviceNames"
import PropSameNoDevice from "@/views/Properties/DeviceSameNo"
import VoltageNull from "@/views/Properties/VoltageNull"
import TerminalHang from "@/views/Properties/TerminalHang"
import NoCollectBus from "@/views/SimpleTopology/NoCollectBus"
import NoFeederBreaker from "@/views/SimpleTopology/NoFeederBreaker"
import MultiConnect from "@/views/SimpleTopology/MultiConnect"
import ConnectTransformer from "@/views/SimpleTopology/ConnectTransformer"
import FeederSwitcher from "@/views/SimpleTopology/FeederSwitcher"
// 拓扑校验
import NoPower from "@/views/Topology/NoPower"
import DiffVoltage from "@/views/Topology/DiffVoltage"
import LoopNet from "../views/Topology/LoopNetWork"

const { Header, Content, Footer, Sider } = Layout

class LayoutView extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    // console.log(collapsed)
    this.setState({ collapsed })
  }

  componentDidMount() {
    // 监听路由切换了，取消loading状态
    const { changeLoading } = this.props
    this.props.history.listen((...rest) => {
      changeLoading(false)
    })
  }

  render() {
    const { isCollapse, loading } = this.props
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={isCollapse}
          // eslint-disable-next-line react/jsx-handler-names
          onCollapse={this.onCollapse}
          width="256"
        >
          <div className="logo">{isCollapse ? null : <strong>配电模型校验系统 </strong>}</div>
          <NavMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: "0 20px", background: "#002140" }}>
            <PageHeader />
          </Header>
          <Content style={{ padding: 20 }}>
            <Spin spinning={loading} wrapperClassName="loading">
              <div style={{ boxSizing: "border-box", minHeight: "100%" }}>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/relation/substation-feeder" component={SubstationsFeeders} />
                  <Route path="/relation/substations" component={Substations} />
                  <Route path="/relation/feeders" component={Feeders} />
                  <Route path="/users" component={Users} />
                  <Route path="/models" component={Model} />
                  <Route path="/property/substation-feeder" component={PropSubstation2Feeder} />
                  <Route path="/property/duplicate-name" component={PropSameNameDevice} />
                  <Route path="/property/duplicate-serial" component={PropSameNoDevice} />
                  <Route path="/property/void-voltage" component={VoltageNull} />
                  <Route path="/property/terminal-hang" component={TerminalHang} />
                  <Route path="/simple/no-connect-bus" component={NoCollectBus} />
                  <Route path="/simple/no-feeder-breaker" component={NoFeederBreaker} />
                  <Route path="/simple/multi-connect" component={MultiConnect} />
                  <Route path="/simple/dual-connect-transformer" component={ConnectTransformer} />
                  <Route path="/simple/feeder-switch" component={FeederSwitcher} />
                  <Route path="/topology/no-power" component={NoPower} />
                  <Route path="/topology/diff-voltage" component={DiffVoltage} />
                  <Route path="/topology/loop-network" component={LoopNet} />
                </Switch>
              </div>
            </Spin>
          </Content>
          <Footer style={{ textAlign: "center", paddingTop: 0 }}>
            Copyright 2018 国网江苏省电力有限公司苏州供电分公司
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProps({ constant }) {
  return {
    isCollapse: constant.isCollapse,
    loading: constant.loading
  }
}

export default connect(mapStateToProps, { collapseNavMenu, changeLoading })(withRouter(LayoutView))
