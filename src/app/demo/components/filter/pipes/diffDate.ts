import {Pipe, PipeTransform} from "@angular/core";
import * as dayjs from "dayjs";
import * as duration from 'dayjs/plugin/duration';

// Extend dayjs with the duration plugin
dayjs.extend(duration);

@Pipe({
    standalone: true,
    name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {

    transform(startDate: Date, endDate: Date): string {
        if (!startDate || !endDate) {
            return '';
        }
        console.log(startDate, endDate);

        // Parse the times using dayjs
        const start = dayjs(`1970-01-01T${startDate}`); // Use an arbitrary date
        const end = dayjs(`1970-01-01T${endDate}`);     // Use an arbitrary date

        // Calculate the difference between the two dates
        const diff = dayjs.duration(end.diff(start));
        // Extract hours and minutes from the duration
        const hours = diff.hours();
        const minutes = diff.minutes();

        // Format the result as "00h 51min"
        return `${this.padZero(hours)}h ${this.padZero(minutes)}min`;
    }

    // Helper function to pad single-digit numbers with a leading zero
    private padZero(value: number): string {
        return value < 10 ? `0${value}` : `${value}`;
    }
}
