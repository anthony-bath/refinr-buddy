import moment from 'moment';
import { getTicketDuration } from '../utilities';

describe('getTicketDuration', () => {
  it('should calculate the correct duration in an ideal scenario', () => {
    const tickets = 10;
    const totalDurationSeconds = 1000;
    const now = moment([2018, 1, 1, 15, 0, 0]);
    const endDate = moment(now).add(totalDurationSeconds, 's');

    const result = getTicketDuration(now, endDate, tickets);

    expect(result).toBe(totalDurationSeconds / tickets);
  });

  it('should handle 0 remaining tickets', () => {
    const tickets = 0;
    const totalDurationSeconds = 1000;
    const now = moment([2018, 1, 1, 15, 0, 0]);
    const endDate = moment(now).add(totalDurationSeconds, 's');

    const result = getTicketDuration(now, endDate, tickets);

    expect(result).toBe(Number.POSITIVE_INFINITY);
  });

  it('should throw when now is after endDate', () => {
    const tickets = 10;
    const now = moment([2018, 1, 1, 15, 0, 0]);
    const endDate = moment(now).subtract(1, 's');

    expect(() => getTicketDuration(now, endDate, tickets)).toThrow();
  });
});
