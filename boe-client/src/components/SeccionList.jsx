import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DepartamentoList from "./DepartamentoList";

export default function SeccionList({ secciones }) {
  const [open, setOpen] = useState(null);
  console.log(secciones)

  return (
    <div>
      {secciones.map((sec, i) => (
        <div key={sec.codigo} className="mb-3">
          <button
            className="w-full bg-blue-100 px-4 py-2 text-left font-semibold rounded hover:bg-blue-200"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {sec.nombre}
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <DepartamentoList departamentos={sec.departamento} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
