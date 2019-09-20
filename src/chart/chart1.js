import React, { Component } from "react";
import Chart from "react-apexcharts";
import { messages } from "../constants/constant";
class Donut extends Component {
  fetchMailsCount = month => {
    let count = 0;
    for (let i = 0; i < messages.length; i++) { month === new Date(messages[i].date).getMonth() && count++; }
    return count;
  };
  fetchMails = month => {
    let mails = [];
    for (let i = 0; i < messages.length; i++) { month === new Date(messages[i].date).getMonth() && mails.push(messages[i]); }
    return mails;
  };
  state = {
    index: 0,
    flag: false,
    messages: [],
    options: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],

      chart: {
        height: 350,
        type: "bar",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            this.setState({
              labels: chartContext.opts.labels,
              percentage: chartContext.opts.series,
              selectedData: this.fetchMails(config.dataPointIndex)
            });
          }
        }
      },

      legend: {
        position: "bottom",
        horizontalAlign: "center"
      }
    },
    series: [
      this.fetchMailsCount(0),
      this.fetchMailsCount(1),
      this.fetchMailsCount(2),
      this.fetchMailsCount(3),
      this.fetchMailsCount(4),
      this.fetchMailsCount(5),
      this.fetchMailsCount(6),
      this.fetchMailsCount(7),
      this.fetchMailsCount(8),
      this.fetchMailsCount(9),
      this.fetchMailsCount(10),
      this.fetchMailsCount(11)
    ]
  };

  render() {
    const { selectedData, options, series } = this.state;

    return (
      <div className="donut">
        <Chart options={options} series={series} type="donut" width="380" className="charts" />

        {selectedData && (
          <table className="table">
            <thead>
              <tr>
                <th width="50">Id</th>
                <th width="200">From</th>
                <th width="200">To</th>
                <th width="200">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map((mail, index) => (
                <tr key={`mail-${index}`}>
                  <td>{mail.id}</td>
                  <td>{mail.from}</td>
                  <td>{mail.to}</td>
                  <td>{mail.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Donut;
