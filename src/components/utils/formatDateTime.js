import moment from 'moment';

export default function formatDateTime(dateTime) {
  return moment(dateTime).format('HH:mm Do MMM');
}