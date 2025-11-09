export default function OfflineBadge({ online }) {
  return (
    <div
      className={`text-xs px-2 py-1 rounded-full ${
        online ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {online ? "Online" : "Offline - answers saved locally"}
    </div>
  );
}
