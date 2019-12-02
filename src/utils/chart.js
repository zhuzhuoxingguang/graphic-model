export default {
  mounted () {
    window.addEventListener('resize', () => {
      if (this.chart) this.chart.resize()
    }, false)
  }
}
