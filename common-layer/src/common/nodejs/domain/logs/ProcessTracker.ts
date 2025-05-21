export type TrackPayload = {
  title: string;
  data: Record<string, string | number>;
};
interface ProcessTracker {
  track(payload: TrackPayload): void;
}

export default ProcessTracker;
