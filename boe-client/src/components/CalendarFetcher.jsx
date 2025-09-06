import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SeccionList from "./SeccionList";

export default function CalendarFetcher() {
  const [fecha, setFecha] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError("");
    setData(null);
    try {
      // Format date to yyyymmdd
      const formattedDate = fecha
        ? fecha.getFullYear().toString() +
          String(fecha.getMonth() + 1).padStart(2, "0") +
          String(fecha.getDate()).padStart(2, "0")
        : "";
      console.log("Formatted date:", formattedDate);
      const res = await fetch(`http://localhost:8000/api/sumario/${formattedDate}`); // Change to https if needed
      const json = await res.json();
      setData(json.data.sumario.diario[0].seccion);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Consulta Sumario BOE</h1>
      <div className="flex gap-2 mb-6">
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="yyyyMMdd"
          className="input"
          showYearDropdown
          scrollableYearDropdown
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="text-2xl font-bold mb-6">Normativa BOE</h1>
          <SeccionList secciones={data} />
        </div>
      )}
    </div>
  );
}
