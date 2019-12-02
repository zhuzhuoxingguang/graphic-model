import React from 'react'

// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core'

// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

import 'echarts/lib/component/title'

// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

// import 'zrender/lib/vml/vml';

// The usage of ReactEchartsCore are same with above.

const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

export default props => {
  const { dataset = [], height = 320, type = 'bar' } = props
  // console.log(dataset)
  /* const series = dataset[0] ? Object.keys(dataset[0]).slice(1).map(item => ({
    type: 'bar',
    barWidth: '16'
  })) : { type: 'bar' } */

  const option = {
    legend: {
      show: false
    },
    grid: {
      top: 10,
      left: 0,
      right: 40,
      bottom: 0,
      containLabel: true
    },
    xAxis: { type: 'value', show: type === 'bar' },
    yAxis: { type: 'category', show: type === 'bar', boundaryGap: ['0', '100%'], data: dataset.map(item => item.name) },
    series: {
      type,
      data: dataset.map((item, idex) => ({
        ...item,
        itemStyle: {
          color: colors[idex]
        }
      }))
    }
  }

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      style={{ height: height + 'px' }}
    />
  )
}
