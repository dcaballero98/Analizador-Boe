from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # Allow all origins for simplicity; adjust as needed
	allow_credentials=True,
	allow_methods=["*"],  # Allow all methods; adjust as needed
	allow_headers=["*"],  # Allow all headers; adjust as needed
)

BASE = "https://boe.es/datosabiertos/api/boe/sumario/"

@app.get("/sumario/{fecha}")
async def sumario_boe(fecha: str):
	url = f"{BASE}{fecha}"
	async with httpx.AsyncClient() as client:
		response = await client.get(url, headers={"Accept": "application/json"})
	if response.status_code  == 200:
		return response.json()
	elif response.status_code == 404:
		raise HTTPException(status_code=404, detail="Sumario not found")
	else: 
		raise HTTPException(status_code=response.status_code, detail="Error fetching sumario")
