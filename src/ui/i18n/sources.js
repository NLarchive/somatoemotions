export const spanishSources = {
  'bodily-maps-2014': [
    'Mapas corporales de las emociones',
    'Los participantes marcaron las sensaciones asociadas a emociones en siluetas corporales.',
    'Los mapas de autoinforme no son mediciones fisiológicas directas ni probabilidades diagnósticas.',
  ],
  'ans-meta-2018': [
    '¿Huellas emocionales o poblaciones de emociones?',
    'Metaanálisis de medidas del sistema nervioso autónomo en distintas categorías emocionales.',
    'La variación y el solapamiento limitan la inferencia de una emoción concreta a partir de un signo corporal aislado.',
  ],
  'faces-review-2019': [
    'Reconsideración de las expresiones emocionales',
    'Evalúa los movimientos faciales y la inferencia de emociones.',
    'La apariencia facial por sí sola no basta para establecer un estado emocional en todos los contextos.',
  ],
  'ans-experiment-1983': [
    'La actividad del sistema nervioso autónomo distingue entre emociones',
    'Medidas autonómicas durante acciones faciales posadas y experiencias recordadas.',
    'Los resultados grupales de tareas específicas no proporcionan probabilidades para las afirmaciones del atlas.',
  ],
  'fear-sadness-2007': [
    'Patrones de respuesta cardiovascular, electrodérmica y respiratoria ante películas que inducen miedo y tristeza',
    'Se midieron respuestas cardiovasculares, de conductancia cutánea y respiratorias ante películas.',
    'La inducción experimental y las medidas seleccionadas no implican una respuesta cotidiana universal.',
  ],
  'pride-shame-2008': [
    'La expresión espontánea del orgullo y la vergüenza',
    'Observó las posturas tras la victoria o la derrota en atletas videntes y ciegos.',
    'El contexto deportivo y la influencia cultural, en particular sobre la vergüenza, limitan la generalización.',
  ],
  'awe-piloerection-2021': [
    'La piloerección no es un correlato fisiológico fiable del asombro',
    'Dos muestras prerregistradas evaluaron la piel de gallina objetiva tras estímulos de asombro.',
    'Los resultados se refieren a los estímulos de laboratorio estudiados, no a todas las experiencias posibles de asombro.',
  ],
  'nimh-panic': [
    'Trastorno de pánico: lo que necesita saber',
    'Descripciones de los síntomas de pánico y su evaluación.',
    'Los síntomas se solapan con otras afecciones; este catálogo no es un instrumento diagnóstico.',
  ],
  'facs-authority': [
    'Sistema de codificación de acciones faciales',
    'FACS describe acciones faciales visibles; su codificación requiere observación especializada.',
    'El manual completo bajo licencia no se reprodujo ni se certificó de forma independiente frente a estas imágenes generadas.',
  ],
  'openface-au': [
    'Unidades de acción de OpenFace',
    'Enumera el subconjunto de unidades de acción reconocido por la herramienta de investigación.',
    'Los resultados de la herramienta y las imágenes de referencia generadas no demuestran un estado emocional.',
  ],
};
const types = {
  'primary study': 'estudio primario',
  'meta-analysis': 'metaanálisis',
  'research review': 'revisión de investigación',
  'official clinical information': 'información clínica oficial',
  'method authority': 'fuente del método',
  'research software documentation': 'documentación de software de investigación',
};
export function localizedSource(source, locale) {
  if (locale !== 'es' || !spanishSources[source.id]) return source;
  const [title, scope, limitations] = spanishSources[source.id];
  return { ...source, title, scope, limitations, type: types[source.type] || source.type };
}
