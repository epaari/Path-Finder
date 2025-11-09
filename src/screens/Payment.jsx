import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [paid, setPaid] = useState(false);
  const nav = useNavigate();

  return (
    <div className="max-w-3xl w-full">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold">Secure Payment</h2>
        <p className="text-gray-600">One-time fee for personalized report</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Amount</div>
            <div className="text-lg font-bold">Rs. 100</div>
            <div className="text-xs text-gray-400">Includes GST</div>
          </div>
          <div className="w-48 h-24 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Payment method
            <br />
            PayU / RazorPay
          </div>
        </div>

        <button
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            paid
              ? "bg-gradient-to-r from-purple-500 to-cyan-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!paid}
          onClick={() => {
            if (paid) nav("/quiz");
          }}
        >
          Start Career Quiz
        </button>

        <p className="text-sm text-gray-500">
          Button will become enabled after successful payment.
        </p>

        <div className="pt-2">
          <button
            type="button"
            className="text-sm text-primary underline"
            onClick={() => setPaid(true)}
            data-demo
          >
            Simulate successful payment (demo only)
          </button>
          <button
            type="button"
            className="ml-4 text-sm text-red-500"
            onClick={() => setPaid(false)}
            data-demo
          >
            Reset payment
          </button>
        </div>
      </div>
    </div>
  );
}
