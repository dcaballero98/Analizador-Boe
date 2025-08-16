import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EpigrafeList from "./EpigrafeList";
import ItemList from "./ItemList";

export default function DepartamentoList({ departamentos }) {
  const [open, setOpen] = useState(null);
  let departamentosList;
  if (Array.isArray(departamentos)) {
    departamentosList = departamentos;
  }
  else if (departamentos.texto.epigrafe !== undefined) {
    departamentosList = departamentos.texto.epigrafe;
  }
  else {
    departamentosList = departamentos;
  }
  departamentosList = Array.isArray(departamentosList) ? departamentosList : [departamentosList];
  return (
    <div className="ml-4 mt-2">
      {departamentosList.map((dep, i) => (
        <div key={dep.codigo === undefined ? dep.nombre : dep.codigo} className="mb-2">
          <button
            className="w-full bg-green-100 px-3 py-1 rounded hover:bg-green-200"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {dep.nombre}
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden min-h-[20px]"
            >
              {dep.epigrafe !== undefined
                ? <EpigrafeList epigrafes={dep.epigrafe} />
                : <ItemList items={dep.item !== undefined ? dep.item : dep.texto.item} />}
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
