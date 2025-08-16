import ItemList from "./ItemList";

export default function EpigrafeList({ epigrafes }) {
  return (
    <div className="ml-4 mt-1">
      {epigrafes.map((epi, i) => (
        <div key={i} className="bg-yellow-100 rounded p-2 mb-2">
          <h4 className="font-semibold">{epi.nombre}</h4>
          <ItemList items={epi.item} />
        </div>
      ))}
    </div>
  );
}
