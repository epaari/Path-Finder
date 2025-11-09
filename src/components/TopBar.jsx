import { useNavigate } from "react-router-dom";

export default function TopBar({ left, center, showBack = true }) {
  const nav = useNavigate();
  return (
    <div className="w-full flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => nav(-1)}
            aria-label="back"
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            ←
          </button>
        )}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-cyan-300 flex items-center justify-center text-white font-semibold">
          A
        </div>
      </div>

      <div className="text-center">{center}</div>

      <div className="w-12">{left}</div>
    </div>
  );
}
