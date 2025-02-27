import {Pipe, PipeTransform} from "@angular/core";
import * as dayjs from 'dayjs';

@Pipe({
    standalone: true,
    name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

    transform(time: Date): string {
        if (!time) {
            return '';
        }

        // Parse the time using dayjs
        const parsedTime = dayjs(`1970-01-01T${time}`); // Use an arbitrary date

        // Format the time as "22h00"
        return parsedTime.format('HH[h]mm');
    }
}
