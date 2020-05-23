import AbstractSmartComponent from "./abstract-smart-component";
import {ACTIVITIES_BY_TYPE} from "../const";
import Chart from "chart.js";
import ChartDataLables from "chartjs-plugin-datalabels";
import moment from "moment";

const getAllCurrentEventsTypes = (events) => events.map((event) => event.type.toUpperCase());

const getCertainCurrentEventsTypes = (events) => [...new Set(getAllCurrentEventsTypes(events))].sort();

const calculateDurationInHours = (dateFrom, dateTo) => moment.duration(moment(dateTo).diff(moment(dateFrom))).asHours();

const roundHours = (hours) => hours > 0.5 ? Math.round(hours) : Math.ceil(hours);

const renderMoneyChart = (moneyCtx, events) => {
  const eventsNames = getCertainCurrentEventsTypes(events);
  const eventsCosts = events.length > 0 ?
    eventsNames.map((eventName) => events
      .filter((event) => event.type === eventName
      .toLowerCase())
      .map((event) => event.basePrice)
      .reduce((prev, cur) => prev + cur))
    : [];

  return new Chart(moneyCtx, {
    plugins: [ChartDataLables],
    type: `horizontalBar`,
    data: {
      labels: eventsNames,
      datasets: [{
        data: eventsCosts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        barThickness: 44,
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        minBarLength: 50
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, events) => {
  const eventsTransports = getCertainCurrentEventsTypes(events).filter((type) => ACTIVITIES_BY_TYPE.movements.includes(type.toLowerCase()));
  const numberOfTimes = eventsTransports.map((a) => getAllCurrentEventsTypes(events).filter((b) => b === a).length);

  return new Chart(transportCtx, {
    plugins: [ChartDataLables],
    type: `horizontalBar`,
    data: {
      labels: eventsTransports,
      datasets: [{
        data: numberOfTimes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        barThickness: 44,
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        minBarLength: 50
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpentChart = (timeSpendCtx, events) => {
  const eventsPlacesNames = getCertainCurrentEventsTypes(events).filter((type) => ACTIVITIES_BY_TYPE.places.includes(type.toLowerCase()));
  const eventsDuration = eventsPlacesNames
  .map((name) => events
    .filter((event) => event.type === name.toLowerCase())
    .map((it) => roundHours(calculateDurationInHours(it.dateFrom, it.dateTo)))
    .reduce((a, b) => a + b));

  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLables],
    type: `horizontalBar`,
    data: {
      labels: eventsPlacesNames,
      datasets: [{
        data: eventsDuration,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        barThickness: 44,
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        minBarLength: 50
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(events) {
    super();

    this._events = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
    this.hide();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._events);
  }

  recoveryListeners() {}

  rerender(events) {
    this._events = events;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 6.5;
    transportCtx.height = BAR_HEIGHT * 4.5;
    timeSpendCtx.height = BAR_HEIGHT * 2.5;

    this._resetCharts();

    this._moneyChart = renderMoneyChart(moneyCtx, this._events.getEventsAll());
    this._transportChart = renderTransportChart(transportCtx, this._events.getEventsAll());
    this._timeSpentChart = renderTimeSpentChart(timeSpendCtx, this._events.getEventsAll());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpentChart) {
      this._timeSpentChart.destroy();
      this._timeSpentChart = null;
    }
  }
}
