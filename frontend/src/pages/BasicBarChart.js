/**
 This file is licensed under the MIT license

 Copyright (c) 2021 David Morrissey

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

import React, { Component, useRef, useEffect } from "react";
import * as echarts from "echarts";


function EChartsChart({ options, theme, onResize, style }) {
  const myChart = useRef(null);

  useEffect(() => {
    const chart = echarts.init(myChart.current, theme)
    chart.setOption(options)

    window.addEventListener('resize', event=>{
      chart.resize();

      if (onResize) {
        return onResize(event);
      }
    });
  }, [options, theme, onResize]);

  return <>
    <div ref={myChart} style={style} />
  </>;
}

class BasicBarChart extends Component {
  static AXIS_TYPE = {
    VALUE: 'value',
    LOG: 'float',
    CATEGORY: 'category',
    TIME: 'time'
  }

  constructor({ data, xAxisType, yAxisType, stack,
                xAxisLabelRotate, yAxisLabelRotate,
                xAxisLabelRich, yAxisLabelRich,
                xAxisMargin, yAxisMargin,
                gridStyle, dataZoom, style }) {
    super({ data, xAxisType, yAxisType, stack,
            xAxisLabelRotate, yAxisLabelRotate,
            xAxisLabelRich, yAxisLabelRich,
            xAxisMargin, yAxisMargin,
            gridStyle, dataZoom, style });
    this.state = {};
  }

  /*******************************************************************
   * HTML Rendering
   *******************************************************************/

  render() {
    let series = [];
    for (let [dataName, dataItem, color] of this.props.data) {
      series.push({
        name: dataName,
        type: 'bar',
        stack: this.props.stack,
        data: dataItem,
        symbol: 'roundRect',
        step: false,
        color: color
      });
    }

    const REPLACE_RE = /[ '(),&-]/g;
    let options = {
      legend: {
        textStyle: {
          color: "#333",
          //fontWeight: "bold",
          borderColor: "black",
          borderWidth: "3px",
          fontSize: 21,
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: this.props.xAxisType,
        axisLabel: {
          interval: this.props.xAxisType === BasicBarChart.AXIS_TYPE.CATEGORY ? 0 : 0,
          rotate: this.props.xAxisLabelRotate || 0,
          formatter: function (value) {
            return value + '   {'+value.replace(REPLACE_RE, '_')+'| }';
          },
          margin: this.props.xAxisMargin,
          rich: {
            ...(this.props.xAxisLabelRich || {})
          },
          color: "#333",
          fontWeight: "bold",
          borderColor: "black",
          borderWidth: "3px"
        }
      },
      yAxis: {
        type: this.props.yAxisType,
        axisLabel: {
          interval: this.props.yAxisType === BasicBarChart.AXIS_TYPE.CATEGORY ? 0 : "auto",
          rotate: this.props.yAxisLabelRotate || 0,
          color: "#333",
          fontWeight: "bold",
          borderColor: "black",
          borderWidth: "3px"
        },
      },
      grid: this.props.gridStyle,
      dataZoom: this.props.dataZoom,
      series: series,

      aria: {
        enabled: true,
        decal: {
          show: true
        }
      }
    };

    return <>
      <div>
        <EChartsChart
            ref={el => {this.reactEChart = el}}
            options={ options }
            style={ this.props.style }
        />
      </div>
    </>;
  }
}

export default BasicBarChart;
