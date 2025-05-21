type TrackLogger = {
  title: string;
  data: Record<string, string | number>;
};
export function track({ title, data }: TrackLogger): void {
  console.log('\n=============================');
  console.log(`[TRACKING] ${title}`, data);
  console.log('=============================\n');
}
