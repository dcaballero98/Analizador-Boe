import {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [fecha, setFecha] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setData(null);
    if (fecha) {

    }
    try {
      const res = await fetch(`https://localhost:8000/sumario/${fecha}`);
      if (!res.ok) throw new Error("Error fetching data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center p-6'>
      <h1 className='text-2xl font-bold mb-4'>Consulta Sumario BOE</h1>
      <div className='flex gap-2 mb-6'>
        <DatePicker
          selected={fecha}
          onChange={(date) => setFecha(date)}
          dateFormat="yyyy-MM-dd"  // aquí el año primero
          className="input"
          showYearDropdown
          scrollableYearDropdown
        />
        <button
          onClick={handleSearch}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Buscar
        </button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {data && (
        <div className='bg-white shadow rounded-lg p-4 w-full max-w-3xl overflow-auto'>
          {data}
        </div>)}
    </div>
  );
}