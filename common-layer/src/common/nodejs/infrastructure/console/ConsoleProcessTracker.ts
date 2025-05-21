import ProcessTracker, { TrackPayload } from '../../domain/logs/ProcessTracker';

export default class ConsoleProcessTracker implements ProcessTracker {
  track({ title, data }: TrackPayload): void {
    let message = '\n=============================\n';
    message += `[TRACKING] ${title}\n`;
    message += JSON.stringify(data, null, 2);
    message += '\n=============================\n';
    console.log(message);
  }
}
