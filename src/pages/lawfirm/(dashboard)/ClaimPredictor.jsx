import { useState } from "react";
import { Loader, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";

export default function ClaimPredictor() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [theme, colorMode] = useMode();

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://app.lejit.ai/api/api/predict", {
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" height="100vh" position="relative">
          <Sidebar />
          <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
            <Topbar />
            <Box component="main" flexGrow={1} p={2} className="p-6 bg-grey min-h-screen overflow-y-auto">
              <div className="p-6 bg-white shadow-lg rounded-2xl mx-auto" style={{ maxWidth: "90%" }}>
                <div className="flex justify-center items-center mb-6">
                  <h1 className="font-bold" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "24px", textAlign: "center" }}>
                    Claim Estimator
                  </h1>
                </div>
                <p className="text-center" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>
                  Enter your details to estimate your claim amount
                </p>

                <div className="mt-6 flex justify-center items-center gap-3">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe your accident..."
                    className="w-1/2 border border-blue-500 p-2 rounded-lg resize-none"
                    rows="3"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "90%" }}
                  />
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-base"
                    onClick={fetchPrediction}
                    style={{ fontFamily: "Poppins, sans-serif" }}
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
                      <h2 className="text-2xl font-bold" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>
                        Predicted Claim Amount
                      </h2>
                      <div className="flex justify-center mt-4">
                        <Gauge className="text-blue-600" size={125} />
                      </div>
                      <p className="text-3xl font-bold mt-2" style={{ color: "#0F67FD", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>
                        ₹{result.predicted_amount ? result.predicted_amount.toLocaleString() : "N/A"}
                      </p>
                    </div>

                    {/* Similar Cases */}
                    {result.similar_cases && result.similar_cases.length > 0 ? (
                      <div className="p-8 bg-white shadow-lg rounded-2xl">
                        <h2 className="text-2xl font-bold" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>
                          Similar Cases
                        </h2>
                        <ul className="mt-4 space-y-3">
                          {result.similar_cases.map((caseItem, index) => {
                            const caseName = caseItem.split("\n")[0];
                            const caseDetails = caseItem.substring(caseName.length).trim();
                            return (
                              <li key={index} className="border-b pb-2 relative group" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>
                                <p className="font-semibold">{caseName}</p>
                                <p className="text-sm truncate cursor-pointer hover:underline mt-2">{caseDetails.substring(0, 100)}...</p>
                                <div className="absolute left-0 mt-2 w-[170%] p-4 bg-white text-xs rounded-lg shadow-lg border border-gray-300 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-x-auto" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>
                                  <p className="font-medium">{caseDetails}</p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : (
                      <div className="mt-6 text-center text-gray-500">
                        No similar cases found.
                      </div>
                    )}
                  </motion.div>
                )}

                {result?.case_advice && (
                  <div className="mt-6 p-8 bg-white shadow-lg rounded-2xl">
                    <h2 className="text-2xl font-bold" style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}>Case Advice</h2>
                    <p className="mt-2 text-lg leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: result.case_advice.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} style={{ color: "#343434", fontFamily: "Poppins, sans-serif", fontSize: "90%" }}></p>
                  </div>
                )}

                <div style={{ height: "100px" }}></div>
              </div>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}