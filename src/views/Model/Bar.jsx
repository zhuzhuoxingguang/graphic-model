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
export default props => {
  const { dataset = [], height = 320, color, onHandleBar } = props
  const isShowLegend = dataset[0] ? Object.keys(dataset[0]).length > 2 : false
  // console.log(dataset)
  const series = dataset[0] ? Object.keys(dataset[0]).slice(1).map(item => ({
    type: 'bar',
    barWidth: '20',
    stack: 'all'
  })) : { type: 'bar' }

  const option = {
    legend: {
      show: isShowLegend
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: isShowLegend ? 30 : 10,
      left: 0,
      right: 40,
      bottom: 0,
      containLabel: true
    },
    dataset: {
      source: dataset
    },
    xAxis: { type: 'value' },
    yAxis: { type: 'category' },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series
  }
  if (color) option.color = color
  const onEvents = {
    click: (e) => {
      onHandleBar(e.name)
    }
  }

  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      onEvents={onEvents}
      style={{ height: height + 'px' }}
    />
  )
}
