const createRouteAndCostMarkup = (routeAndCostData) => {
  const {cost, pointsString, travelDatesString} = routeAndCostData;
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${pointsString}</h1>

      <p class="trip-info__dates">${travelDatesString}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost.sumTotal}</span>
    </p>
  </section>`
  );
};

export default createRouteAndCostMarkup;
