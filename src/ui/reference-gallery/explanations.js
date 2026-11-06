import { actionExplanations } from './action-explanations.js';
import { describePhoto } from './descriptions.js';
import { facialExplanations } from './facial-explanations.js';
import { somaticExplanations } from './somatic-explanations.js';

const movement = {
  au0: [
    'Use this resting face as a comparison. Check the brows, eyelids and mouth corners before looking for a change in any one region.',
    'Usa este rostro en reposo como referencia. Observa las cejas, los párpados y las comisuras antes de buscar cambios en una zona.',
  ],
  au1: [
    'Compare the inner brow ends with the outer ends. Raising the inner ends changes the slope of each brow toward the center.',
    'Compara los extremos internos de las cejas con los externos. Elevar los internos cambia la inclinación de cada ceja hacia el centro.',
  ],
  au2: [
    'Follow the outer third of each brow. Its lift changes the arch near the temple even when the inner brow stays in place.',
    'Sigue el tercio externo de cada ceja. Al elevarse, cambia el arco cerca de la sien aunque el extremo interno se mantenga en su sitio.',
  ],
  au4: [
    'Look for two components: lowering the brows and drawing them inward. The skin between them can bunch as the distance closes.',
    'Observa dos componentes: el descenso y el acercamiento de las cejas. La piel del entrecejo puede plegarse al reducirse la distancia.',
  ],
  au5: [
    'Judge the upper lid against the iris. More of the eye becomes visible as the lid rises, even if the brow does not move.',
    'Compara el párpado superior con el iris. Al elevarse el párpado queda más superficie del ojo a la vista, incluso si la ceja permanece quieta.',
  ],
  au6: [
    'Track the cheek below the eye. As it rises, it pushes tissue toward the lower lid and can form creases near the outer corner.',
    'Sigue la mejilla debajo del ojo. Al elevarse, empuja el tejido hacia el párpado inferior y puede formar pliegues en el extremo externo.',
  ],
  au7: [
    'Watch the lower lid margin. Tightening narrows the opening around the eye, whereas raising the upper lid widens it.',
    'Observa el borde del párpado inferior. La tensión estrecha la abertura del ojo, mientras que elevar el párpado superior la amplía.',
  ],
  au9: [
    'Use the bridge of the nose as a landmark. Skin gathers there and along the sides as the nose wrinkles.',
    'Usa el puente de la nariz como punto de referencia. Al arrugarse la nariz, la piel se acumula allí y a ambos lados.',
  ],
  au10: [
    'Follow the upper lip relative to the base of the nose. The space between them shortens as the lip rises, sometimes exposing the upper teeth.',
    'Sigue el labio superior con respecto a la base de la nariz. La distancia se acorta al subir el labio y pueden quedar visibles los dientes superiores.',
  ],
  au12: [
    'Follow the direction of the corners. An upward and outward pull changes the curve of the mouth whether the lips part or stay closed.',
    'Sigue la dirección de las comisuras. El tirón hacia arriba y hacia fuera cambia la curva de la boca tanto con los labios abiertos como cerrados.',
  ],
  au15: [
    'Compare the height of the corners with the center of the mouth. The corners can drop while the center and jaw stay relatively steady.',
    'Compara la altura de las comisuras con el centro de la boca. Las comisuras pueden bajar mientras el centro y la mandíbula se mantienen relativamente estables.',
  ],
  au16: [
    'Watch the edge of the lower lip against the lower teeth. The lip moves downward even when the jaw barely changes position.',
    'Observa el borde del labio inferior en relación con los dientes inferiores. El labio baja aunque la mandíbula apenas cambie de posición.',
  ],
  au17: [
    'Look beneath the lower lip. The soft tissue at the chin bunches upward and can push the lip up without raising the whole head.',
    'Mira debajo del labio inferior. El tejido blando del mentón se recoge hacia arriba y puede empujar el labio sin elevar toda la cabeza.',
  ],
  au20: [
    'Compare the width and height of the mouth. The corners move apart horizontally, so the opening can get wider without getting taller.',
    'Compara el ancho y la altura de la boca. Las comisuras se separan en horizontal, por lo que la abertura puede ensancharse sin ganar altura.',
  ],
  au23: [
    'Follow the visible thickness of both lips. Tension makes them look narrower, a change you can compare with the compression in AU24.',
    'Observa el grosor visible de ambos labios. La tensión los afina y permite comparar ese cambio con la compresión de AU24.',
  ],
  au24: [
    'Look at the line where the lips meet. Pressing the lips together flattens that line and compresses the visible lip tissue.',
    'Mira la línea de contacto entre los labios. Al presionarlos entre sí, esa línea se aplana y el tejido visible se comprime.',
  ],
  au25: [
    'Check the gap between the lips and the position of the chin. A gap can appear with little jaw movement, as opposed to a jaw drop in AU26.',
    'Observa el espacio entre los labios y la posición del mentón. Los labios pueden separarse con poco movimiento mandibular, a diferencia del descenso de mandíbula de AU26.',
  ],
  au26: [
    'Follow the chin relative to the nose. When the jaw lowers, the mouth opens vertically and the lower face lengthens.',
    'Sigue el mentón con respecto a la nariz. Al bajar la mandíbula, la boca se abre en vertical y se alarga la parte inferior del rostro.',
  ],
  au53: [
    'Compare the chin and neck as the whole head tilts up. The direction of the eyes can be considered separately from that tilt.',
    'Compara el mentón y el cuello cuando toda la cabeza se inclina hacia arriba. La dirección de los ojos puede observarse por separado.',
  ],
  au54: [
    'Track the angle of the head by the distance from chin to chest. This movement can occur independently of where the eyes are looking.',
    'Observa el ángulo de la cabeza a partir de la distancia entre el mentón y el pecho. Este movimiento puede ocurrir con independencia de hacia dónde miren los ojos.',
  ],
  au64: [
    'Use the iris relative to the lids to track where the eyes point. The eyes can look down while the head keeps the same angle.',
    'Usa la posición del iris respecto a los párpados para seguir la dirección de los ojos. Pueden mirar hacia abajo mientras la cabeza conserva el mismo ángulo.',
  ],
  'au14-unilateral': [
    'Compare the two mouth corners. The inward pull on one side creates an indentation beside the lip and makes the shape asymmetric.',
    'Compara ambas comisuras. La tracción hacia dentro en un lado crea una hendidura junto al labio y vuelve asimétrica la forma de la boca.',
  ],
  'au10-unilateral': [
    'Compare the distance from the upper lip to the nose on either side. The raised side shortens that gap more than the other.',
    'Compara a ambos lados la distancia del labio superior a la nariz. El lado elevado acorta ese espacio más que el otro.',
  ],
};

const body = {
  cardiovascular: [
    'Look at the visible skin and posture cues separately from cardiovascular activity. Skin tone is an appearance cue. Pulse and blood flow require measurement over time.',
    'Observa por separado las señales visibles de la piel y la postura y la actividad cardiovascular. El tono es un rasgo de apariencia. El pulso y el flujo sanguíneo requieren mediciones en el tiempo.',
  ],
  respiratory: [
    'Compare the position of the shoulders and chest with the opening of the mouth. These landmarks help describe the pose. Breathing rate and depth require observing successive breaths.',
    'Compara la posición de los hombros y el pecho con la apertura de la boca. Estos puntos ayudan a describir la postura. La frecuencia y la profundidad respiratorias requieren observar varias respiraciones.',
  ],
  gastrointestinal: [
    'Note the position of the torso and where any hand contact occurs. A hand over the abdomen shows the location of a gesture. Digestive movement and internal sensations need separate information.',
    'Observa la posición del torso y dónde se apoya la mano, si aparece. Una mano sobre el abdomen indica la ubicación de un gesto. Los movimientos digestivos y las sensaciones internas requieren información adicional.',
  ],
  musculoskeletal: [
    'Follow the joint positions and the body’s support points. Compare what bends, extends or bears weight. A still pose shows alignment, while movement reveals how that alignment changes.',
    'Sigue la posición de las articulaciones y los puntos de apoyo. Compara qué se flexiona, se extiende o soporta peso. Una pose fija muestra la alineación, y el movimiento permite ver cómo cambia.',
  ],
  integumentary_thermal: [
    'Compare skin texture, tone and moisture across the visible area. These are separate features. Temperature and how the skin changes over time need their own observations.',
    'Compara la textura, el tono y la humedad de la piel visible. Son características distintas. La temperatura y los cambios de la piel a lo largo del tiempo requieren sus propias observaciones.',
  ],
  neurosensory: [
    'Compare where the head points, where the eyes point and how open the lids are. Each can change independently. Use them as separate landmarks when comparing poses.',
    'Compara hacia dónde apunta la cabeza, hacia dónde miran los ojos y cuánto se abren los párpados. Cada rasgo puede cambiar por separado y sirve como referencia al comparar posturas.',
  ],
};

const specific = {
  'anger-full-face': [
    'Compare the brow and eye opening separately. The brows move down and inward while the upper lids rise. Then compare the lips with the isolated tightening and pressing units.',
    'Compara por separado las cejas y la abertura de los ojos. Las cejas bajan y se juntan mientras suben los párpados superiores. Después compara los labios con las unidades aisladas de tensión y presión.',
  ],
  'surprise-full-face': [
    'Trace three movements in parallel: the brow arch rises, the upper lids lift and the jaw lowers. Compare the last movement with simple lip separation in AU25.',
    'Sigue tres movimientos en paralelo: se arquean las cejas, se elevan los párpados superiores y baja la mandíbula. Compara este último movimiento con la simple separación de los labios en AU25.',
  ],
  'fear-act-2': [
    'Follow the elbows as the hands rise between the body and the space ahead. Palm orientation helps distinguish this posture from an open-handed reach.',
    'Sigue los codos mientras las manos se elevan entre el cuerpo y el espacio de delante. La orientación de las palmas ayuda a distinguir esta postura de un gesto de alcance con las manos abiertas.',
  ],
  'anger-cardiovascular-0': [
    'Compare the visible color across the temples, neck and chest. Changes in skin color and changes in cardiovascular measures are different observations. The study statement concerns the measured activity.',
    'Compara el color visible en las sienes, el cuello y el pecho. Los cambios de color y las variaciones en las mediciones cardiovasculares son observaciones distintas. La afirmación del estudio se refiere a la actividad medida.',
  ],
  'fear-respiratory-0': [
    'Use the collarbones as landmarks for upper-chest movement. Over a series of breaths, their displacement and the time between breaths answer different questions about the pattern.',
    'Usa las clavículas como referencia para el movimiento de la parte superior del pecho. En una serie de respiraciones, su desplazamiento y el intervalo entre respiraciones aportan información distinta sobre el patrón.',
  ],
  'awe-integumentary_thermal-0': [
    'Compare the direction of the hairs with the texture of the skin around their bases. Raised hairs and small bumps are the visible features used to describe piloerection.',
    'Compara la dirección del vello con la textura de la piel alrededor de su base. El vello erizado y los pequeños relieves son los rasgos visibles que permiten describir la piloerección.',
  ],
};

export function explainSystem(system, locale) {
  return body[system][locale === 'es' ? 1 : 0];
}

export function explainRecord(record, context, locale) {
  const key = record.image_key.split('/')[1];
  const language = locale === 'es' ? 1 : 0;
  if (specific[key]) return specific[key][language];
  if (Object.hasOwn(body, context)) {
    return somaticExplanations[key]?.[language] || describePhoto(record, locale);
  }
  if (context === 'face') {
    if (facialExplanations[key]) return facialExplanations[key][language];
    const unit = key.match(/-(au.*)$/)?.[1];
    return movement[unit]?.[language] || describePhoto(record, locale);
  }
  return actionExplanations[key]?.[language] || describePhoto(record, locale);
}
