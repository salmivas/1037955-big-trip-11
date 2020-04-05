const createTripDaysMarkup = () => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime="2019-03-18">MAR 18</time>
        </div>

        <ul class="trip-events__list">
          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Taxi to Amsterdam</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                  —
                  <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                </p>
                <p class="event__duration">30M</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">20</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Order Uber</span>
                  +
                  €&nbsp;<span class="event__offer-price">20</span>
                </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>

          <li class="trip-events__item">
            <form class="event  event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Transfer</legend>

                      <div class="event__type-item">
                        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                        <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                      </div>
                    </fieldset>

                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Activity</legend>

                      <div class="event__type-item">
                        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                      </div>

                      <div class="event__type-item">
                        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    Flight to
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
                  <datalist id="destination-list-1">
                    <option value="Amsterdam"></option>
                    <option value="Geneva"></option>
                    <option value="Chamonix"></option>
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">
                    From
                  </label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                  —
                  <label class="visually-hidden" for="event-end-time-1">
                    To
                  </label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    €
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>

                <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
                <label class="event__favorite-btn" for="event-favorite-1">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </label>

                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>

              <section class="event__details">
                <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                  <div class="event__available-offers">
                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
                      <label class="event__offer-label" for="event-offer-luggage-1">
                        <span class="event__offer-title">Add luggage</span>
                        +
                        €&nbsp;<span class="event__offer-price">30</span>
                      </label>
                    </div>

                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
                      <label class="event__offer-label" for="event-offer-comfort-1">
                        <span class="event__offer-title">Switch to comfort class</span>
                        +
                        €&nbsp;<span class="event__offer-price">100</span>
                      </label>
                    </div>

                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                      <label class="event__offer-label" for="event-offer-meal-1">
                        <span class="event__offer-title">Add meal</span>
                        +
                        €&nbsp;<span class="event__offer-price">15</span>
                      </label>
                    </div>

                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                      <label class="event__offer-label" for="event-offer-seats-1">
                        <span class="event__offer-title">Choose seats</span>
                        +
                        €&nbsp;<span class="event__offer-price">5</span>
                      </label>
                    </div>

                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                      <label class="event__offer-label" for="event-offer-train-1">
                        <span class="event__offer-title">Travel by train</span>
                        +
                        €&nbsp;<span class="event__offer-price">40</span>
                      </label>
                    </div>
                  </div>
                </section>
              </section>
            </form>
          </li>

          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Drive to Chamonix</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T14:30">14:30</time>
                  —
                  <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
                </p>
                <p class="event__duration">1H 35M</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">160</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Rent a car</span>
                  +
                  €&nbsp;<span class="event__offer-price">200</span>
                </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>

          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/check-in.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Check-in in Chamonix</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T12:25">16:20</time>
                  —
                  <time class="event__end-time" datetime="2019-03-18T13:35">17:00</time>
                </p>
                <p class="event__duration">40M</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">600</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Add breakfast</span>
                  +
                  €&nbsp;<span class="event__offer-price">50</span>
                </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        </ul>
      </li>

      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">2</span>
          <time class="day__date" datetime="2019-03-19">MAR 19</time>
        </div>

        <ul class="trip-events__list">
          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Sightseeing in Chamonix</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-19T11:20">14:20</time>
                  —
                  <time class="event__end-time" datetime="2019-03-19T13:00">13:00</time>
                </p>
                <p class="event__duration">1H 20M</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">50</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Book tickets</span>
                  +
                  €&nbsp;<span class="event__offer-price">40</span>
                </li>
                <li class="event__offer">
                  <span class="event__offer-title">Lunch in city</span>
                  +
                  €&nbsp;<span class="event__offer-price">30</span>
                  </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>

          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Drive to Geneva</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-19T10:00">16:00</time>
                  —
                  <time class="event__end-time" datetime="2019-03-19T11:00">17:00</time>
                </p>
                <p class="event__duration">1H</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">20</span>
              </p>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>

          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Flight to Geneva</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-19T18:00">18:00</time>
                  —
                  <time class="event__end-time" datetime="2019-03-19T19:00">19:00</time>
                </p>
                <p class="event__duration">1H</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">20</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Add luggage</span>
                  +
                  €&nbsp;<span class="event__offer-price">30</span>
                </li>
                <li class="event__offer">
                  <span class="event__offer-title">Switch to comfort</span>
                  +
                  €&nbsp;<span class="event__offer-price">100</span>
                  </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        </ul>
      </li>

      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">3</span>
          <time class="day__date" datetime="2019-03-18">MAR 20</time>
        </div>

        <ul class="trip-events__list">
          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Drive to Geneva</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-20T08:25">08:25</time>
                  —
                  <time class="event__end-time" datetime="2019-03-20T09:25">09:25</time>
                </p>
                <p class="event__duration">1H</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">20</span>
              </p>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>

          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Sightseeing in Geneva</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-20T11:15">11:15</time>
                  —
                  <time class="event__end-time" datetime="2019-03-20T12:15">12:15</time>
                </p>
                <p class="event__duration">1H</p>
              </div>

              <p class="event__price">
                €&nbsp;<span class="event__price-value">180</span>
              </p>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        </ul>
      </li>
    </ul>`
  );
};

export default createTripDaysMarkup;
