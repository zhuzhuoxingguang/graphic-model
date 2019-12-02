import React, { Component } from 'react'
import { Card, Tabs, Icon, Table, Divider } from 'antd'
import GroupCheck from '@/components/GroupCheck'
const { TabPane } = Tabs
const { Column } = Table

class PropSubstation2Feeder extends Component {
  state = {
    list: [
      { substationName: '淳东变', id: 100001, feeders: ['东游线131', '老庄山线122', ' 沛桥线123', '童家线113', '双望线121 ', '银杏线116'] },
      { substationName: '双湖变', id: 100002, feeders: ['中杭#1线136', '雅居乐#2线135', '雅居乐#1线132', '统冠线145', '戴家城线143', '竹山线131', '永城线142', '双源线122', '古檀线141', '宁高园线133', '碧桂园#1线146', '芦溪线144', '桃园线134'] },
      { substationName: '高淳变', id: 100003, feeders: ['芜太线115', '花奔线116', '薛工线111', '康桥线121', '淳团线118', '淳镇线110', '淳工线119', '联络线117', '天河线112', '淳永线114'] },
      { substationName: '城北变', id: 100004, feeders: ['姜家线211', '大丰线221', '固北西线216', '碧桂园#4线228', '肇倩圩线217', '碧桂园#2线212', '明丰线222', '薛城线225', '渭凤线223', '紫雅线224', '石臼线214', '胥河线215', '碧桂园#3线218', '中宏#1线227', '固北东线226'] },
      { substationName: '城东变', id: 100005, feeders: ['尚品线188', '城鑫线181', '双湖线183', '北岭线184', '城工线185', '财智广场#2线192', '西舍线186', '财智广场#1线191', '塔农线182', '曼园线189'] },
      { substationName: '桠溪变', id: 100006, feeders: ['桠漆线234'] },
      { substationName: '游子山变', id: 100007, feeders: ['庙岗线271', '渔场线281'] },
      { substationName: '东坝变', id: 100008, feeders: ['下坝线132', '青化线138', '青山线136', '东镇线135', '青工线133', '东农线137', '青开线131'] },
      { substationName: '薛城变', id: 100009, feeders: ['薛丰线111', '薛轨1号122', '薛轨2号142', '芜太2号线144', '薛和线114', '薛海线146', '固北西2号线112', '石臼2号线121', '淳工2号线124', '天河2号线143', '固北东2号线133', '大丰2号线141', '胥河2号线132', '姜家2号线113', '薛镇线131'] },
      { substationName: '秀山变', id: 100010, feeders: ['漕塘线148', '漕工线147'] },
      { substationName: '西舍变', id: 100011, feeders: ['南漪线225', '丹南线221', '固城湖生态线222', '湖滨线214', '淳兴线216', '康乐线224', '筑城线223', '丹北线215', '淳南线212', '中杭#2线226', '北漪线213', '码头线211'] },
      { substationName: '双牌石变', id: 100012, feeders: ['紫荆线129', '漆工线123', '茅山线128', '双漆线125', '双古线126', '古工线122', '双高线127', '仓前线132', '新东阳线121', '漆开线124'] },
      { substationName: '沧溪变', id: 100013, feeders: ['太平线211', '南宕线212'] },
      { substationName: '凤山变', id: 100014, feeders: ['凤团线192', '凤双联络线195', '凤山线193'] },
      { substationName: '定埠变', id: 100015, feeders: ['新石线252', '银飞线253', '新闸线254', '枫元线262', '镇北线261', '镇南线251'] },
      { substationName: '松园变', id: 100016, feeders: ['华圣线231', '松园北线239', '游山北线232', '花山北线236', '游山南线234', '花山南线237', '花园线238'] },
      { substationName: '秦仙变', id: 100017, feeders: ['东湖线156'] },
      { substationName: '狮树变', id: 100018, feeders: ['丹农线161', '10KV狮工线165', '丹湖线166'] },
      { substationName: '松溪变', id: 100019, feeders: ['新墙线134', '松闸线143', '松北线132'] }
    ]
  }

  render () {
    const { list } = this.state
    return (
      <Card bodyStyle={{ padding: 20 }}>
        <GroupCheck />
        <Tabs defaultActiveKey='table'>
          <TabPane
            tab={
              <span>
                <Icon type='deployment-unit' /> 关系图
              </span>
            }
            key='chart'
          >
            Tab 1
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type='table' /> 表格
              </span>
            }
            key='table'
          >
            <Table dataSource={list} size='small' bordered rowKey='id'>
              <Column title='变电站名称' dataIndex='substationName' key='substationName' width={96} />
              <Column title='馈线数量' key='number' align='center' width={80} render={(text, record) => (<span>{record.feeders.length} </span>)} />
              <Column
                title='馈线'
                key='action'
                render={(text, record) => (
                  <div>
                    {record.feeders.map((feeder, idx) => {
                      return <span key={feeder}> {idx > 0 ? <Divider type='vertical' /> : null}<span>{feeder}</span></span>
                    })}
                    {/* <a>Invite {record.lastName}</a> */}
                    {/* <Divider type='vertical' /> */}
                    {/* <a>Delete</a> */}
                  </div>
                )}
              />
            </Table>
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default PropSubstation2Feeder
