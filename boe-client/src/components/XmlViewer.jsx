import { useState } from "react";

export default function XmlViewer({ url }) {
  const [xml, setXml] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchXml = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const text = await res.text();
      setXml(text);
    } catch (err) {
      console.error("Error cargando XML", err);
    }
    setLoading(false);
  };

  return (
    <div className="mt-2">
      <button
        onClick={fetchXml}
        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
      >
        {loading ? "Cargando..." : "Ver XML"}
      </button>
      {xml && (
        <pre className="bg-gray-900 text-green-300 p-2 mt-2 overflow-auto text-xs rounded max-h-64">
          {xml}
        </pre>
      )}
    </div>
  );
}
