import { useState } from "react";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.xelitesolutions.com";

export default function StoreIntegration() {
  const [activeTab, setActiveTab] = useState("connect");
  const [loading, setLoading] = useState(false);

  // Connection state
  const [storeType, setStoreType] = useState("shopify");
  const [storeUrl, setStoreUrl] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [connectionResult, setConnectionResult] = useState(null);

  // Improvement state
  const [improvementGoals, setImprovementGoals] = useState("");
  const [recommendations, setRecommendations] = useState(null);

  // Product descriptions state
  const [productDescriptions, setProductDescriptions] = useState(null);

  const [error, setError] = useState("");

  const handleConnectStore = async () => {
    try {
      setLoading(true);
      setError("");
      setConnectionResult(null);

      const response = await axios.post(`${API_BASE}/api/store/connect-store`, {
        storeType,
        storeUrl,
        apiToken,
      });

      if (response.data.ok) {
        setConnectionResult(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImproveStore = async () => {
    try {
      setLoading(true);
      setError("");
      setRecommendations(null);

      const response = await axios.post(`${API_BASE}/api/store/improve-store`, {
        storeType,
        storeUrl,
        apiToken,
        improvementGoals,
      });

      if (response.data.ok) {
        setRecommendations(response.data.recommendations);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescriptions = async () => {
    try {
      setLoading(true);
      setError("");
      setProductDescriptions(null);

      const response = await axios.post(
        `${API_BASE}/api/store/generate-product-descriptions`,
        {
          storeType,
          storeUrl,
          apiToken,
        }
      );

      if (response.data.ok) {
        setProductDescriptions(response.data.products);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🛍️ External Store Integration
        </h1>
        <p className="text-gray-600">
          ربط وتطوير المتاجر الخارجية (Shopify, WooCommerce) باستخدام AI
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("connect")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "connect"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          🔗 ربط المتجر
        </button>
        <button
          onClick={() => setActiveTab("improve")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "improve"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          🚀 تحسين المتجر
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "products"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          📝 وصف المنتجات
        </button>
      </div>

      {/* Store Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">إعدادات المتجر</h2>

        <div className="space-y-4">
          {/* Store Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نوع المتجر
            </label>
            <select
              value={storeType}
              onChange={(e) => setStoreType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="shopify">Shopify</option>
              <option value="woocommerce">WooCommerce</option>
            </select>
          </div>

          {/* Store URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رابط المتجر
            </label>
            <input
              type="text"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder={
                storeType === "shopify"
                  ? "https://your-store.myshopify.com"
                  : "https://your-store.com"
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* API Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Token / Access Token
            </label>
            <input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder={
                storeType === "shopify"
                  ? "shpat_..."
                  : "consumer_key:consumer_secret"
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              {storeType === "shopify"
                ? "احصل على Access Token من Shopify Admin → Apps → Develop apps"
                : "احصل على Consumer Key:Secret من WooCommerce → Settings → Advanced → REST API"}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "connect" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">ربط المتجر</h2>

          <button
            onClick={handleConnectStore}
            disabled={loading || !storeUrl || !apiToken}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "جاري الاتصال..." : "🔗 ربط المتجر"}
          </button>

          {connectionResult && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                ✅ تم الربط بنجاح!
              </h3>
              <p className="text-green-800">
                <strong>اسم المتجر:</strong> {connectionResult.storeData?.name}
              </p>
              <p className="text-green-800 text-sm">
                تم الاتصال في:{" "}
                {new Date(
                  connectionResult.storeData?.connectedAt
                ).toLocaleString("ar")}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "improve" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
             AI-Powered Store Optimization
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Optimization Goals (Optional)
            </label>
            <input
              type="text"
              value={improvementGoals}
              onChange={(e) => setImprovementGoals(e.target.value)}
              placeholder="زيادة المبيعات، تحسين تجربة المستخدم، تحسين SEO"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleImproveStore}
            disabled={loading || !storeUrl || !apiToken}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ?"Analyzing..." : "🚀 Analyzing & Optimizing the Store"}</button>

          {recommendations && (
            <div className="mt-6 space-y-4">
              {/* Critical Issues */}
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">
                  ⚠️ Critical Issues
                </h3>
                <ul className="list-disc list-inside space-y-1 text-red-800 text-sm">
                  {recommendations.criticalIssues?.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>

              {/* Quick Wins */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  ⚡ Quick Improvements
                </h3>
                <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
                  {recommendations.quickWins?.map((win, i) => (
                    <li key={i}>{win}</li>
                  ))}
                </ul>
              </div>

              {/* Long-term Strategy */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                 📈 Long-Term Strategy
                </h3>
                <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                  {recommendations.longTermStrategy?.map((strategy, i) => (
                    <li key={i}>{strategy}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "products" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
             AI-Powered Product Description Generation 
          </h2>

          <button
            onClick={handleGenerateDescriptions}
            disabled={loading || !storeUrl || !apiToken}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Generating..." : "📝 Generate Product Description"}
          </button>
          {productDescriptions && (
            <div className="mt-6 space-y-4">
              {productDescriptions.map((product, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Old Description:
                      </p>
                      <p className="text-sm text-gray-600 line-through">
                        {product.oldDescription?.substring(0, 100) || "لا يوجد"}
                        ...
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium mb-1">
                    ✨ New Description:
                      </p>
                      <p className="text-sm text-gray-800">
                        {product.newDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">❌ {error}</p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🤖 How does Store Integration work?
        </h3>
        <ul className="space-y-2 text-blue-800">
            <li>✅ Direct integration with Shopify and WooCommerce</li>
            <li>✅ Smart store analysis using Gemini AI</li>
            <li>✅ Personalized recommendations to improve performance</li>
            <li>✅ SEO-optimized product description generation</li>
            <li>✅ Automatic store updates</li>
        </ul>
      </div>
    </div>
  );
}
