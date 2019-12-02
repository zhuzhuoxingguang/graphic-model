/* eslint-disable react/jsx-indent */
/* eslint-disable template-curly-spacing */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'
import { getModelLoad } from '@/api/load'
import { changeLoading } from '@/store/actions/constant'
import Bar from './Bar'
import MicroBar from './MicroBar'

class Model extends Component {
  state = {
    time: null,
    dataset: [],
    microBarData: []
  }

  staticData = []

  getData = () => {
    this.props.changeLoading(true)
    getModelLoad().then(res => {
      this.props.changeLoading()
      this.staticData = res.list
      const dataset = res.list.map(item => {
        let target = { name: item.time }

        const data = item.data.map((item, index) => {
          return {
            name: item.name,
            value: item.children.reduce((accu, curr) => { return accu + curr.count }, 0)
          }
        }).map(item => {
          return { [item.name]: item.value }
        })
        target = Object.assign(target, ...data)

        return target
      })
      this.setState({ dataset })
    })
  }

  paintBar = (time) => {
    const bar = this.staticData.find(item => item.time === time).data
    const microBarData = bar.reduce((accu, curr) => {
      accu = [...accu, ...curr.children]
      return accu
    }, []).map((item, index) => ({ name: item.type, value: item.count }))

    /* .reduce((accu, curr) => {
      accu.name = curr.type
      accu[curr.type] = curr.count
      return accu
    }, {}) */
    this.setState({ microBarData, time })
    // console.log(microBarData)
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const { dataset, microBarData, time } = this.state
    return (
      <>
        <Card title='近十次模型校验'>
          <Bar dataset={dataset} onHandleBar={this.paintBar} />
        </Card>
        {
          time &&
          <Card title={`已加载（${ time }）模型`} style={{ marginTop: 20 }}>
            <Row>
              <Col span={12}>
                <MicroBar dataset={microBarData} type='bar' />
              </Col>
              <Col span={12}>
                <MicroBar dataset={microBarData} type='pie' />
              </Col>
            </Row>
          </Card>
        }
      </>
    )
  }
}

export default connect(null, { changeLoading })(Model)
