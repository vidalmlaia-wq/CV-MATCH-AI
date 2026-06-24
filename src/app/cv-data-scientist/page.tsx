import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Data Scientist: Plantilla y Consejos ATS | CVMatch AI",
  description: "Crea un CV de Data Scientist optimizado para ATS. Palabras clave, proyectos y estructura para científicos de datos con Python, ML y estadística.",
  alternates: { canonical: "https://cvmatch.ai/cv-data-scientist" },
  openGraph: { title: "CV para Data Scientist — CVMatch AI", description: "Guía para el CV de Data Scientist optimizado para ATS." },
}

export default function CVDataScientistPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Data Scientist",
    description: "Guía para crear un CV de Data Science optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Stack técnico claro", text: "Python, SQL, ML frameworks con nivel de dominio" },
      { "@type": "HowToStep", name: "Proyectos con impacto medible", text: "Kaggle, GitHub, proyectos reales con métricas" },
    ],
  }

  return (
    <RoleLanding
      role="Data Scientist"
      headline="CV para Data Scientist que pasa el filtro ATS"
      subheadline="Las empresas buscan Python, estadística y capacidad de traducir datos en decisiones. Cómo estructurar tu CV de data science para llegar a la entrevista técnica."
      schema={schema}
      keywords={[
        "Python", "R", "SQL", "Machine Learning", "Deep Learning",
        "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
        "Statistics", "A/B Testing", "Data Visualization", "Tableau", "Power BI",
        "Spark", "Hadoop", "AWS", "Google Cloud", "Azure",
        "NLP", "Computer Vision", "Feature Engineering", "Model Deployment",
        "Jupyter", "Git", "Docker", "MLflow",
      ]}
      tips={[
        {
          title: "GitHub con proyectos reales es obligatorio",
          desc: "En Data Science, el portfolio importa tanto como el CV. Enlaza tu GitHub con notebooks limpios, README explicativos y al menos 2-3 proyectos con datasets reales y resultados documentados.",
        },
        {
          title: "Diferencia entre ML engineer y data scientist",
          desc: "Si tus proyectos son más de modelado estadístico y análisis, eres data scientist. Si son más de pipelines, deployment y productización de modelos, eres ML engineer. El CV debe reflejar cuál eres.",
        },
        {
          title: "Kaggle y certificaciones suman mucho para juniors",
          desc: "Un ranking competitivo en Kaggle, una certificación de Google o AWS, o un curso de fast.ai con proyecto final compensan falta de experiencia laboral formal en data science.",
        },
        {
          title: "Incluye el impacto de negocio, no solo la técnica",
          desc: "'Entrené un modelo XGBoost con 94% de accuracy' es técnico. 'Modelo de churn que redujo la pérdida de clientes en un 18%, ahorrando 200k€ anuales' demuestra que entiendes el negocio.",
        },
        {
          title: "Especifica el dominio de los datos",
          desc: "Finanzas, salud, ecommerce, telecomunicaciones — cada sector tiene su vocabulario y sus problemas. Si tienes experiencia en un dominio concreto, es un diferenciador que debes destacar.",
        },
        {
          title: "Stack de visualización y comunicación",
          desc: "Tableau, Power BI, Plotly, Streamlit — los data scientists que saben comunicar sus hallazgos a audiencias no técnicas son más valiosos. Incluye herramientas de visualización y ejemplos de dashboards.",
        },
      ]}
      faqs={[
        {
          q: "¿Data Scientist, Data Analyst o ML Engineer?",
          a: "Data Analyst: análisis descriptivo, SQL, dashboards. Data Scientist: modelado predictivo, estadística, Python/R. ML Engineer: deployment, MLOps, ingeniería de features. Identifica cuál eres y usa ese título en el CV.",
        },
        {
          q: "¿Pongo mi score de Kaggle?",
          a: "Sí, si es relevante. Un top 10% en una competición es un diferenciador claro. Si es solo participación sin resultados destacables, mejor menciona el proyecto pero sin el ranking.",
        },
        {
          q: "¿Cuántas tecnologías incluir?",
          a: "Las que realmente dominas. Una lista de 40 librerías sin contexto genera desconfianza. Mejor 15 tecnologías con nivel claro que 40 con nivel vago. Los entrevistadores técnicos te preguntarán sobre todo lo que pongas.",
        },
        {
          q: "¿Cómo presento proyectos académicos si no tengo experiencia laboral?",
          a: "Con rigor y contexto: 'TFG sobre predicción de abandono escolar usando Random Forest. Dataset de 50.000 registros. Accuracy 89%. Código disponible en GitHub.' La metodología y los resultados importan más que el origen del proyecto.",
        },
      ]}
    />
  )
}
