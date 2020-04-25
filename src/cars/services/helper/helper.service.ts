import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  getCountMonthsFromDate(date: Date): number {
    return date.getFullYear() * 12 + date.getMonth() + 1;
  }
}
