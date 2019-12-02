import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import FeederBreakerTable from './Modules/FeederBreakerTable'

class PropSubstation2Feeder extends Component {
  state = {
    list: [
      { id: 1, name: '南京', substation: '淳东变', device: '青工线133开关' }
    ],
    noTitleKey: 'table'
  }

  contentListNoTitle = {
    chart: <p>chart content</p>,
    table: <FeederBreakerTable data={this.state.list} />
  }

  onTabChange = (key, type) => {
    console.log(key, type)
    this.setState({ [type]: key })
  }

  render () {
    return (
      <Card
        style={{ width: '100%' }}
        tabList={[
          {
            key: 'chart',
            tab: <span><Icon type='bar-chart' />图表</span>
          },
          {
            key: 'table',
            tab: <span><Icon type='table' />表格</span>
          }
        ]}
        activeTabKey={this.state.noTitleKey}
        onTabChange={key => {
          this.onTabChange(key, 'noTitleKey')
        }}
        bodyStyle={{ padding: 0 }}
      >
        {this.contentListNoTitle[this.state.noTitleKey]}
      </Card>
    )
  }
}

export default PropSubstation2Feeder
