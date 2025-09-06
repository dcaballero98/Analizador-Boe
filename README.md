# 📄 Analizador-BOE – Seguimiento Inteligente de Documentos Oficiales

![Analizador-BOE Banner](./assets/boe-banner.png)

## Descripción del Proyecto

**Analizador-BOE** es una aplicación **fullstack moderna** que permite **acceder, procesar, visualizar y descargar documentos del BOE** de manera **rápida, clara y accesible**.

**Analizador-BOE** permite el análisis de documentos usando la IA integrada para su rápida y clara comprensión.

El proyecto demuestra competencias críticas para roles de **desarrollo fullstack, ingeniería de datos y AI aplicada**:

* Integración con **API oficial del BOE** y procesamiento de datos XML complejos.
* **Análisis inteligente** usando prompts de IA para resumir y contextualizar secciones de documentos.
* Experiencia con **stack moderno de producción**: React, TailwindCSS, ShadCN, PostCSS, Python backend con Uvicorn y entorno virtual.
* Foco en **UX/UI profesional** para hacer la información compleja accesible y útil en tiempo real.

---

## 🚀 Funcionalidades Clave

* **Acceso directo a datos del BOE:** uso de API para obtener XML y convertirlo en información legible.
* **Resúmenes inteligentes con IA:** análisis contextual de secciones y presentación de datos claros para el usuario.
* **Descarga de documentos:** permite exportar BOE en **HTML, XML y PDF** para uso offline o análisis adicional.
* **Interfaz interactiva y moderna:** frontend en React con TailwindCSS y componentes ShadCN, optimizado para rendimiento y accesibilidad.
* **Backend robusto:** Python + Uvicorn, ejecución en entorno virtual, manejo eficiente de datos y solicitudes.
* **Seguimiento rápido y accesible:** permite filtrar, buscar y visualizar documentos de forma sencilla.

---

## 🛠️ Tecnologías y Herramientas

* **Backend:** Python, Uvicorn, venv
* **Frontend:** React, TailwindCSS, ShadCN, PostCSS
* **Procesamiento de datos:** API BOE, XML, prompts IA
* **Control de versiones:** Git/GitHub
* **Despliegue y entorno de desarrollo:** venv, Node.js

---

## 📈 Competencias Profesionales Demostradas

* **Fullstack moderno:** construcción de aplicaciones escalables y mantenibles.
* **Procesamiento y análisis de datos:** extracción, transformación y visualización de XML complejos.
* **IA aplicada:** diseño de prompts para resumir y contextualizar información automáticamente.
* **UX/UI profesional:** interfaces claras, rápidas y accesibles para usuarios finales.
* **Automatización y eficiencia:** seguimiento de documentos oficiales sin intervención manual.
* **Gestión de documentos:** capacidad de exportar en múltiples formatos (HTML, XML, PDF) para maximizar el valor de la información.

---

## ⚡ Cómo Ejecutar el Proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/dcaballero98/Analizador-Boe.git
cd Analizador-Boe
```

2. Configura el entorno backend:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

3. Configura el frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Accede a la app en tu navegador: `http://localhost:5173`

---
