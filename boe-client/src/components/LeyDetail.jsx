import { useState } from "react";
import axios from "axios";

export default function LeyDetail({url_xml}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const analizarLey = async () => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8000/api/analizar_ley", {url_xml});
            setData(res.data);
        } catch (error) {
            console.error("Error al analizar la ley:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <button
                onClick={analizarLey}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Analizar Ley
            </button>

            {loading && <p className="mt-2">Procesando...</p>}

            {data && (
                <pre className="mt-4 whitespace-pre-wrap bg-gray-100 p-2 rounded max-h-[60vh] overflow-y-auto">{data.resumen}</pre>
            )}
        </div>
    );
}