import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
// при русской изменилоись индексы дней в неделе
// https://stackoverflow.com/questions/44872960/adding-locale-js-in-moment-react


function Calendar(props) {
  const { date } = props;

  let firstDays = 0;
  let latestDays = 0;
  let result = [];
  let sizeCalendar = [0, 1, 2, 3, 4];
  // console.log(date.locale('ru'))
  const daysInMonth = moment(date.format()).daysInMonth();

  for (let i = 1; i <= daysInMonth; i++) {
    result.push(i);
  }



  const dayName = moment(date.format()).format('dddd');
  const numberDay = moment(date.format()).format('D');
  const monthName = moment(date.format()).format('MMMM');
  const year = moment(date.format()).format('YYYY');

  const begin = moment(date.format('YYYY-MM-DD')).startOf('month').format('e');
  const end = moment(date.format('YYYY-MM-DD')).endOf('month').format('e');

  const checkSunday = moment(date.format('YYYY-MM-DD')).endOf('month').format('dddd');
  const checkMonday = moment(date.format('YYYY-MM-DD')).startOf('month').format('dddd');


  if (checkSunday !== 'Sunday') {
    latestDays = 7 - end - 1;
    let count = latestDays;
    for (let i = count; i > 0; i--) {
      result.push([count - i + 1, 'ui-datepicker-other-month'])
    }
  };


  if (checkMonday !== 'Monday') {
    firstDays = begin;

    const lastDayPrevMonth = moment(date.format('YYYY-MM-DD')).subtract(1, 'months').endOf('month').format('D');

    let count = lastDayPrevMonth;
    for (let i = 0; i < firstDays; i++) {
      result.unshift([count - i + 1, 'ui-datepicker-other-month']);
    }

  }

  let resp = [];
  for (let i = 0; i < 5; i++) {
    resp[i] = result.slice(0, 7);
    result.splice(0, 7);
  }

  return (<>
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayName}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{numberDay}</div>
          <div className="ui-datepicker-material-month">{monthName}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{dayName}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {sizeCalendar.map((el) =>
            <tr key={el}>
              {resp[el].map((day) => {
                if (day.length > 1) {
                  return <td key={day} className={day[1]}>{day[0]}</td>
                } else {
                  return  <td key={day}>{day}</td>;
                }
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>)
}



export default Calendar;