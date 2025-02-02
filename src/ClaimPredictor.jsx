import { useState } from "react";
import { Loader, Gauge } from "lucide-react";
import { motion } from "framer-motion";

export default function ClaimPredictor() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600">
        Claim Predictor
      </h1>
      <p className="text-center text-gray-600">
        Enter your details to estimate your claim amount
      </p>

      <div className="mt-6 flex justify-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your accident..."
          className="w-1/2 border border-blue-500 p-2 rounded-lg"
        />
        <button
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={fetchPrediction}
        >
          Predict
        </button>
      </div>

      {loading && (
        <div className="flex justify-center mt-6">
          <Loader className="animate-spin text-blue-600" size={32} />
        </div>
      )}

      {result && (
        <motion.div
          className="mt-10 grid grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Predicted Amount Card */}
          <div className="p-8 bg-white shadow-lg rounded-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Predicted Claim Amount
            </h2>
            <div className="flex justify-center mt-4">
              <Gauge className="text-blue-600" size={125} />
            </div>
            <p className="text-4xl font-semibold text-blue-700 mt-2">
              ₹{result.predicted_amount.toLocaleString()}
            </p>
          </div>

          {/* Similar Cases */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-gray-700">Similar Cases</h2>
            <ul className="mt-4 space-y-3">
              {result.similar_cases.map((caseItem, index) => {
                // Extract the case name (first line before the newline)
                const caseName = caseItem.split("\n")[0];
                const caseDetails = caseItem.substring(caseName.length).trim();

                return (
                  <li key={index} className="border-b pb-2 text-gray-700 relative group">
                    <p className="font-semibold">{caseName}</p>
                    <p className="text-sm truncate cursor-pointer hover:underline mt-2">
                      {caseDetails.substring(0, 100)}...
                    </p>

                    {/* Tooltip - Only appears on hover with a horizontal scrollbar */}
                    <div className="absolute left-0 mt-2 w-[170%] p-4 bg-white text-gray-800 text-xs rounded-lg shadow-lg border border-gray-300 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-x-auto">
                      <p className="font-medium">{caseDetails}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}

      {result?.case_advice && (
        <div className="mt-6 p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-700">Case Advice</h2>
          <p
            className="text-gray-700 mt-2 text-lg leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: result.case_advice.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          ></p>
        </div>
      )}
    </div>
  );
}