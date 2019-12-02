import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { setBreadcrumb } from '@/store/actions/constant'

const { SubMenu } = Menu
const menus = [
  {
    name: '首页',
    path: '/home',
    icon: 'home'
  },
  {
    name: '线变关系',
    path: '/relation',
    icon: 'link',
    children: [
      {
        path: '/substation-feeder',
        name: '变电站与馈线关系'
      },
      {
        path: '/substations',
        name: '站间联络'
      },
      {
        path: '/feeders',
        name: '馈线联络'
      }
    ]
  },
  {
    name: '模型加载',
    path: '/models',
    icon: 'loading-3-quarters'
  },
  {
    name: '属性校验',
    path: '/property',
    icon: 'appstore',
    children: [
      {
        path: '/substation-feeder',
        name: '变电站馈线'
      },
      {
        path: '/duplicate-name',
        name: '同名设备校验'
      },
      {
        path: '/duplicate-serial',
        name: '同编号设备校验'
      },
      {
        path: '/void-voltage',
        name: '空电压等级校验'
      },
      {
        path: '/terminal-hang',
        name: '端子悬空设备校验'
      }
    ]
  },
  {
    path: '/simple',
    name: '简单拓扑校验',
    icon: 'profile',
    children: [
      {
        name: '未与母线相连设备校验',
        path: '/no-connect-bus'
      },
      {
        name: '未拼接配电网设备的主网负荷校验',
        path: '/no-feeder-breaker'
      },
      {
        name: '一端连接多个设备校验',
        path: '/multi-connect'
      },
      {
        name: '两端都连接设备的配变校验',
        path: '/dual-connect-transformer'
      },
      {
        name: '线路末端开关校验',
        path: '/feeder-switch'
      }
    ]
  },
  {
    path: '/topology',
    name: '拓扑校验',
    icon: 'bars',
    children: [
      {
        path: '/no-power',
        name: '无电源点的配电网设备校验'
      },
      {
        path: '/diff-voltage',
        name: '同馈线电压等级不同校验'
      },
      {
        path: '/loop-network',
        name: '环网校验'
      }
    ]
  },
  {
    path: '/users',
    name: '用户管理',
    icon: 'user'
  }
]
const rootSubmenuKeys = menus.map(item => item.path)

class NavMenu extends Component {
  // eslint-disable-next-line space-before-function-paren
  constructor(props) {
    // console.log(menus.filter(item => item.path === key))
    super(props)
    this.state = {
      openKeys: [this.handleCurrentNav(props.location.pathname)]
    }
  }

  // 页面处理默认导航
  handleCurrentNav = pathname => {
    const navs = pathname.split('/').filter(item => item)
    const currentNav = '/' + navs[0]
    const currentMenu = menus.find(menu => menu.path === currentNav)
    const breads = [{ path: currentNav, name: currentMenu.name }]
    // console.log(currentNav, breads)
    if (navs[1]) {
      const secondary = currentMenu.children.find(item => item.path.slice(1) === navs[1])
      breads.push(secondary)
    }
    this.props.setBreadcrumb(breads)
    return currentNav
  }

  // 导航点击事件
  handleMenu = ({ item, key, keyPath, domEvent }) => {
    // console.log(item, key, keyPath, domEvent)
    this.handleCurrentNav(key)
    this.props.history.push(key)
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    // console.log(rootSubmenuKeys, latestOpenKey)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }

  render () {
    return (
      <Menu
        theme='dark'
        openKeys={this.state.openKeys}
        defaultSelectedKeys={[this.props.location.pathname]}
        mode='inline'
        onClick={this.handleMenu}
        onOpenChange={this.onOpenChange}
      >
        {
          menus.map(menu => {
            return menu.children
              ? (
                <SubMenu
                  key={menu.path}
                  title={
                    <span>
                      <Icon type={menu.icon} />
                      <span>{menu.name}</span>
                    </span>
                  }
                >
                  {
                    menu.children.map(item => {
                      return (
                        <Menu.Item key={menu.path + item.path}>  {item.name} </Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              )
              : (
                <Menu.Item key={menu.path}>
                  <Icon type={menu.icon} />
                  <span>{menu.name}</span>
                </Menu.Item>
              )
          })
        }
      </Menu>
    )
  }
}

export default connect(null, { setBreadcrumb })(withRouter(NavMenu))
