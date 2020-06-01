import AbstractSmartComponent from "./abstract-smart-component";
import {ACTIVITIES_BY_TYPE} from "../const";
import Chart from "chart.js";
import ChartDataLables from "chartjs-plugin-datalabels";
import moment from "moment";

const ChartTitle = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`,
};

const Colors = {
  WHITE: `#ffffff`,
  BLACK: `#000000`,
};

const Position = {
  START: `start`,
  END: `end`,
  LEFT: `left`
};

const FontSize = {
  DATALABLES: 13,
  TITLE: 23,
  TICKS: 13,
};

const BarSize = {
  MIN_BAR_LENGTH: 50,
  BAR_THICKNESS: 44,
};

const Padding = {
  TICKS: 5,
};

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
        backgroundColor: Colors.WHITE,
        hoverBackgroundColor: Colors.WHITE,
        anchor: Position.START
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FontSize.DATALABLES
          },
          color: Colors.BLACK,
          anchor: Position.END,
          align: Position.START,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: ChartTitle.MONEY,
        fontColor: Colors.BLACK,
        fontSize: FontSize.TITLE,
        position: Position.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Colors.BLACK,
            padding: Padding.TICKS,
            fontSize: FontSize.TICKS,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        barThickness: BarSize.BAR_THICKNESS,
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
        minBarLength: BarSize.MIN_BAR_LENGTH
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
        backgroundColor: Colors.WHITE,
        hoverBackgroundColor: Colors.WHITE,
        anchor: Position.START
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FontSize.DATALABLES
          },
          color: Colors.BLACK,
          anchor: Position.END,
          align: Position.START,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: ChartTitle.TRANSPORT,
        fontColor: Colors.BLACK,
        fontSize: FontSize.TITLE,
        position: Position.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Colors.BLACK,
            padding: Padding.TICKS,
            fontSize: FontSize.TICKS,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        barThickness: BarSize.BAR_THICKNESS,
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
        minBarLength: BarSize.MIN_BAR_LENGTH
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
        backgroundColor: Colors.WHITE,
        hoverBackgroundColor: Colors.WHITE,
        anchor: Position.START
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FontSize.DATALABLES
          },
          color: Colors.BLACK,
          anchor: Position.END,
          align: Position.START,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: ChartTitle.TIME_SPENT,
        fontColor: Colors.BLACK,
        fontSize: FontSize.TITLE,
        position: Position.LEFT
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Colors.BLACK,
            padding: Padding.TICKS,
            fontSize: FontSize.TICKS,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        barThickness: BarSize.BAR_THICKNESS,
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
        minBarLength: BarSize.MIN_BAR_LENGTH
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
