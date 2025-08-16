from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import xml.etree.ElementTree as ET
import traceback # Depuración

app = FastAPI()

class LeyRequest(BaseModel):
	url_xml: str

def parse_xml_to_text(xml_content: str) -> str:
	root = ET.fromstring(xml_content)
	textos = [elem.text for elem in root.iter() if elem.text]
	return " ".join(textos)

async def obtener_resumen_openrouter(texto_ley, api_key):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "meta-llama/llama-3.1-8b-instruct",
        "messages": [
            {"role": "system", "content": (
                "Eres un asistente legal y económico experto en legislación española. "
                "Tu tarea es analizar críticamente la ley o resolución que se te proporciona en texto completo (XML). "
                "Debes producir un análisis profundo, honesto y crítico, no neutral."
                "Tus objetivos son:"
                "1. Al inicio del análisis, proporciona **información clave y rápida**:"
                "   - 'afectados': Quiénes se ven afectados por la ley (ciudadanos, empresas, sectores, departamentos públicos)."
                "   - 'impacto': Qué cambios introduce o qué regula directamente."
                "   - 'repercusiones_economicas': Presupuesto, costes o impactos económicos estimables."
                "   - 'repercusiones_economicas_estimadas': Estima críticamente posibles impactos económicos, positivos y negativos, **basándote en hechos históricos y precedentes de leyes o resoluciones similares**. Sé específico y razonable."
                "   - 'vacios_legales': Identifica posibles vacíos legales que podrían ser aprovechados o generar ambigüedad, incluso si el texto no los menciona explícitamente."
                "   - 'riesgos': Analiza críticamente riesgos legales, financieros o de cumplimiento, **basándote en hechos históricos y patrones económicos anteriores**."
                "   - 'referencias_previas': Leyes o resoluciones anteriores relacionadas."
                "2. Después de la sección inicial, realiza un **análisis detallado**, comentando:"
                "   - Qué artículos son más relevantes."
                "   - Qué podría generar problemas de interpretación."
                "   - Posibles conflictos con otras leyes existentes."
                "   - Vacíos o contradicciones que podrían generar problemas prácticos."
                "   - Consecuencias economicas, legales y sociales para los afectados."
                "3. Instrucciones importantes Usar solo como contexto para generar el mensaje final, no lo incluyas en el mensaje final:"
                "   - No repitas solo lo que aparece en el texto; usa tu juicio profesional para inferir repercusiones, riesgos y vacíos legales."
                "   - Fundamenta el análisis de riesgos y repercusiones económicas en hechos históricos, experiencias previas y patrones legales y económicos."
                "   - Sé crítico, profesional y propositivo."
                "4. Estructura el resultado de forma que pueda mostrarse en un dashboard profesional:"
                "   - Sección de datos clave al principio."
                "   - Sección de análisis textual más largo después, con títulos claros por cada punto."
                "Texto de la ley a analizar: "
            )},
            {"role": "user", "content": f"{texto_ley}"}
        ],
        "max_tokens": 1500,
        "temperature": 0.4,
        "top_p": 0.9,
        "frequency_penalty": 0.2,
        "presence_penalty": 0.2
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()

@app.post("/api/analizar_ley")
async def analizar_ley(request: LeyRequest):
    async with httpx.AsyncClient() as client:
        res = await client.get(request.url_xml)
        xml_texto = res.text

    texto_ley = parse_xml_to_text(xml_texto)

    # Pega tu API Key aquí
    api_key = "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"
    try:
        respuesta = await obtener_resumen_openrouter(texto_ley, api_key)
        resumen_ia = respuesta["choices"][0]["message"]["content"]
    except Exception as e:
        print ("ERROR EN /api/analizar_ley:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Error al analizar la ley")

    return {
        "resumen": resumen_ia,
        "texto_ley": texto_ley,
        "url_xml": request.url_xml
    }

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # Allow all origins for simplicity; adjust as needed
	allow_credentials=True,
	allow_methods=["*"],  # Allow all methods; adjust as needed
	allow_headers=["*"],  # Allow all headers; adjust as needed
)

BASE = "https://boe.es/datosabiertos/api/boe/sumario/"

@app.get("/api/sumario/{fecha}")
async def sumario_boe(fecha: str):
	url = f"{BASE}{fecha}"
	print("INICIO petición al BOE")
	async with httpx.AsyncClient() as client:
		try:
			res = await client.get(url, headers={"Accept": "application/json"}, timeout=10.0)
		except httpx.RequestError as exc:
			print(f"Error al conectar con el BOE: {exc}")
			raise HTTPException(status_code=504, detail="Timeout al conectar con el BOE")
		print("FIN petición al BOE")
	print("INICIO petición al BOE")
	if res.status_code  == 200:
		return res.json()
	elif res.status_code == 404:
		raise HTTPException(status_code=404, detail="Sumario no encontrado")
	else: 
		raise HTTPException(status_code=res.status_code, detail="Error fetching sumario")
