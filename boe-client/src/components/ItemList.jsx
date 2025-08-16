import XmlViewer from "./XmlViewer";
import LeyDetail from "./LeyDetail";

export default function ItemList({ items }) {
  const list = Array.isArray(items) ? items : [items];

  return (
    <div className="ml-4 mt-1 space-y-2">
      {list.map((item, i) => (
        <div key={i} className="bg-white border rounded p-2 shadow">
          <p className="font-semibold">{item.titulo}</p>
          <div className="flex gap-3 text-sm mt-1">
            <a href={item.url_pdf.texto} target="_blank" className="text-blue-600 underline">PDF</a>
            <a href={item.url_html} target="_blank" className="text-blue-600 underline">HTML</a>
          </div>
          <XmlViewer url={item.url_xml} />
          <LeyDetail url_xml={item.url_xml} />
        </div>
      ))}
    </div>
  );
}
