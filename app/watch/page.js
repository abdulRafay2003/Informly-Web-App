import dynamic from 'next/dynamic';
const StreamClient = dynamic(
  () => import('./StreamClient'),
  { ssr: false },
);

export default function WatchPage() {
  return (
    <div>
      <StreamClient />
    </div>
  );
}
