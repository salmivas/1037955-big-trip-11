const createDaysData = (events) => {
  return Array.from(new Set(events.map((event) => event.dateFrom.toDateString()))).map((date, i) => {
    return {
      date: new Date(date),
      dayNumber: ++i,
    };
  });
};

export {createDaysData};
