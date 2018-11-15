import moment from 'moment';

export const getTicketDuration = (now, endDate, remainingTickets) => {
  if (endDate.isSameOrBefore(now)) {
    throw new Error('Session has ended');
  }

  if (remainingTickets <= 0) {
    return Number.POSITIVE_INFINITY;
  }

  const remaining = moment.duration(endDate.diff(now));

  return remaining.asSeconds() / remainingTickets;
};
