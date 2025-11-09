export default function OptionCard({ letter, text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-4 ${
        selected
          ? "border-primary-400 bg-primary-50 shadow-sm"
          : "border-gray-200 bg-white hover:shadow-sm"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          selected ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
        }`}
      >
        <span className="font-semibold">{letter}</span>
      </div>
      <div className="flex-1">
        <div
          className={`text-sm ${
            selected ? "font-medium text-gray-900" : "text-gray-700"
          }`}
        >
          {text}
        </div>
      </div>
    </button>
  );
}
