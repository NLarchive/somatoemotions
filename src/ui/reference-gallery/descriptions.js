import { translateCatalog } from '../i18n/catalog.js';
import { bodyCaptions } from './body-captions.js';

// Visible details from the illustration briefs, separate from the research claims.
const descriptions = {
  'fear-au4': [
    'The inner ends of the brows lift at an angle and draw together above the nose.',
    'Los extremos internos de las cejas se elevan en diagonal y se juntan sobre el entrecejo.',
  ],
  'sadness-au4': [
    'Oblique inner brows frame the vertical lines between the eyebrows.',
    'Los extremos internos de las cejas quedan oblicuos y enmarcan los pliegues verticales del entrecejo.',
  ],
  'fear-au5': [
    'The upper lids lift slightly, with tension visible along their edges.',
    'Los párpados superiores se elevan un poco y sus bordes se ven tensos.',
  ],
  'surprise-au5': [
    'The eyelids are wide apart, leaving the iris exposed.',
    'Los párpados están muy separados y dejan el iris visible.',
  ],
  'awe-au5': [
    'The raised upper lid leaves the rounded iris clearly visible.',
    'El párpado superior elevado deja bien visible el iris redondeado.',
  ],
  'anxiety-au24': [
    'The lips press together in a straight, tight line.',
    'Los labios se presionan entre sí y forman una línea recta y tensa.',
  ],
  'sadness-au1': [
    'The raised inner brow corners form a peaked shape beneath creases in the forehead.',
    'Los extremos internos de las cejas forman un pico bajo los pliegues de la frente.',
  ],
  'disgust-au15': [
    'The mouth corners dip slightly, alongside wrinkling near the nose.',
    'Las comisuras bajan ligeramente y aparecen pliegues cerca de la nariz.',
  ],
  'shame-au15': [
    'The corners of the lips turn slightly downward.',
    'Las comisuras de los labios se curvan ligeramente hacia abajo.',
  ],
  'love-au6': [
    'The cheeks lift gently and fine creases form at the outer corners of the eyes.',
    'Las mejillas se elevan suavemente y se forman líneas finas en los extremos externos de los ojos.',
  ],
  'pride-au12': [
    'The corners lift slightly in a small smile with the lips closed.',
    'Las comisuras se elevan un poco en una leve sonrisa de labios cerrados.',
  ],
  'love-au12': [
    'Both corners pull upward on a diagonal in a gentle, symmetrical smile.',
    'Ambas comisuras suben en diagonal y forman una sonrisa suave y simétrica.',
  ],
  'awe-au1-2': [
    'The brow arches across a smooth forehead above a wide gaze.',
    'Las cejas se arquean sobre una mirada abierta, con la frente lisa.',
  ],
  'panic-au26': [
    'The jaw hangs slack and the mouth is open.',
    'La mandíbula cae sin tensión y la boca queda abierta.',
  ],
  'awe-au26': [
    'The jawline softens as the mouth hangs slightly open.',
    'El contorno de la mandíbula se suaviza y la boca queda ligeramente abierta.',
  ],
  'anger-act-0': [
    'The body leans forward from the ankles, shifting weight toward the balls of the feet.',
    'El cuerpo se inclina hacia delante desde los tobillos y el peso se desplaza hacia la parte delantera de los pies.',
  ],
  'anger-act-1': [
    'One person steps closer with their chest forward while the other leans back.',
    'Una persona se acerca con el pecho hacia delante mientras la otra se inclina hacia atrás.',
  ],
  'anger-act-2': [
    'The mouth is caught mid-speech, with the lips parted.',
    'La boca aparece en pleno gesto de habla, con los labios separados.',
  ],
  'anger-act-3': [
    'The hands brace against a surface as the arms bear weight.',
    'Las manos se apoyan con firmeza sobre una superficie mientras los brazos soportan el peso.',
  ],
  'fear-act-0': [
    'The person holds back rather than stepping forward.',
    'La persona se queda atrás sin dar un paso al frente.',
  ],
  'fear-act-1': [
    'The torso tilts away while the feet stay planted.',
    'El torso se inclina hacia atrás mientras los pies permanecen apoyados.',
  ],
  'fear-act-2': [
    'Both hands lift with the palms facing outward.',
    'Ambas manos se elevan con las palmas hacia fuera.',
  ],
  'sadness-act-0': [
    'The shoulders curl inward and the arms stay near the torso.',
    'Los hombros se cierran hacia dentro y los brazos permanecen cerca del torso.',
  ],
  'sadness-act-1': [
    'The person sits still with the arms at rest.',
    'La persona permanece sentada e inmóvil, con los brazos en reposo.',
  ],
  'sadness-act-2': [
    'The arms wrap around the torso in a seated pose.',
    'Los brazos rodean el torso en una postura sentada.',
  ],
  'happiness-act-0': [
    'The arms spread to either side of the body.',
    'Los brazos se abren a ambos lados del cuerpo.',
  ],
  'happiness-act-1': [
    'One foot lifts in a light step while the body stays upright.',
    'Un pie se eleva en un paso ligero mientras el cuerpo permanece erguido.',
  ],
  'happiness-act-2': [
    'The person moves forward in an open approach gesture.',
    'La persona avanza con un gesto de acercamiento abierto.',
  ],
  'disgust-act-0': [
    'The head turns away from the direction the torso faces.',
    'La cabeza se aparta de la dirección hacia la que apunta el torso.',
  ],
  'disgust-act-1': [
    'One hand sweeps outward and away from the body.',
    'Una mano se desplaza hacia fuera y se aleja del cuerpo.',
  ],
  'disgust-act-2': [
    'The pose captures the mouth and throat during a throat-clearing gesture.',
    'La pose muestra la boca y la garganta en un gesto de carraspeo.',
  ],
  'surprise-act-0': [
    'The head turns toward a point of attention.',
    'La cabeza gira hacia un punto de atención.',
  ],
  'surprise-act-1': [
    'The body pauses partway through a gesture.',
    'El cuerpo se detiene a mitad de un gesto.',
  ],
  'anxiety-act-0': [
    'The eyes look to one side as if scanning the surroundings.',
    'Los ojos miran hacia un lado como al recorrer el entorno con la mirada.',
  ],
  'anxiety-act-1': ['One hand touches the person’s own body.', 'Una mano toca el propio cuerpo.'],
  'anxiety-act-2': [
    'The figure is shown mid-stride in a pacing pose.',
    'La figura aparece a mitad de un paso, como al caminar de un lado a otro.',
  ],
  'panic-act-0': [
    'The body turns and moves toward an exit.',
    'El cuerpo gira y se dirige hacia una salida.',
  ],
  'panic-act-1': [
    'The hands rise toward the collar and upper chest.',
    'Las manos se elevan hacia el cuello de la ropa y la parte superior del pecho.',
  ],
  'panic-act-2': [
    'The body lowers close to the floor.',
    'El cuerpo desciende hasta quedar cerca del suelo.',
  ],
  'shame-act-0': [
    'The chin drops while the gaze moves away from the viewer.',
    'El mentón baja mientras la mirada se aparta de quien observa.',
  ],
  'shame-act-1': [
    'The hands rise to cover the face.',
    'Las manos se elevan para cubrir el rostro.',
  ],
  'shame-act-2': [
    'The figure draws the shoulders and arms inward to take up less space.',
    'La figura recoge los hombros y los brazos para ocupar menos espacio.',
  ],
  'pride-act-0': [
    'The torso stays tall and the stance takes up space.',
    'El torso se mantiene erguido y la postura ocupa espacio.',
  ],
  'pride-act-1': [
    'The figure takes a measured step with the torso upright.',
    'La figura da un paso pausado con el torso erguido.',
  ],
  'pride-act-2': [
    'The eyes face the viewer directly.',
    'Los ojos miran directamente hacia quien observa.',
  ],
  'contempt-act-0': [
    'The shoulders and torso rotate away from the point of attention.',
    'Los hombros y el torso giran en sentido contrario al punto de atención.',
  ],
  'contempt-act-1': [
    'A hand flicks outward in a dismissive gesture.',
    'Una mano se mueve hacia fuera con un gesto de desdén.',
  ],
  'awe-act-0': [
    'The body holds still while facing a point of interest.',
    'El cuerpo permanece quieto y orientado hacia un punto de interés.',
  ],
  'awe-act-1': [
    'The hands rest open with the fingers loose.',
    'Las manos descansan abiertas con los dedos relajados.',
  ],
  'love-act-0': [
    'An open hand reaches toward another person.',
    'Una mano abierta se extiende hacia otra persona.',
  ],
  'love-act-1': [
    'The two figures face each other and meet each other’s gaze.',
    'Las dos figuras se colocan frente a frente y cruzan la mirada.',
  ],
  'baseline-neutral-act-0': [
    'The figure walks with an easy stride and a relaxed face.',
    'La figura camina con un paso natural y el rostro relajado.',
  ],
  'baseline-neutral-act-1': [
    'The figure stands at ease with the arms at rest.',
    'La figura está de pie en una posición cómoda, con los brazos en reposo.',
  ],
  'anger-gastrointestinal-0': [
    'A hand rests just below the breastbone.',
    'Una mano descansa justo debajo del esternón.',
  ],
  'sadness-gastrointestinal-0': [
    'A hand lies loosely across the abdomen.',
    'Una mano descansa suavemente sobre el abdomen.',
  ],
  'sadness-gastrointestinal-1': [
    'The hand rests high on the abdomen and the brows draw slightly together.',
    'La mano se apoya en la parte alta del abdomen y las cejas se juntan un poco.',
  ],
  'sadness-neurosensory-0': [
    'The eyes angle down beneath slightly lowered lids.',
    'Los ojos miran hacia abajo bajo los párpados ligeramente caídos.',
  ],
  'happiness-gastrointestinal-0': [
    'The palm lies comfortably against the relaxed abdomen.',
    'La palma descansa cómodamente sobre el abdomen relajado.',
  ],
  'disgust-gastrointestinal-0': [
    'The hand rests on the stomach as the person poses with a tense expression.',
    'La mano descansa sobre el estómago mientras la persona posa con el rostro tenso.',
  ],
  'surprise-gastrointestinal-0': [
    'One hand moves toward the abdomen while the eyes open wide.',
    'Una mano se acerca al abdomen mientras los ojos se abren mucho.',
  ],
  'anxiety-gastrointestinal-0': [
    'The hand rests on the upper abdomen beneath a slightly furrowed brow.',
    'La mano se apoya sobre la parte superior del abdomen y el entrecejo se frunce levemente.',
  ],
  'shame-gastrointestinal-0': [
    'One hand covers the upper abdomen in a slightly folded posture.',
    'Una mano cubre la parte superior del abdomen en una postura ligeramente encorvada.',
  ],
  'shame-neurosensory-0': [
    'The gaze falls down and to the side.',
    'La mirada baja y se desvía hacia un lado.',
  ],
  'contempt-gastrointestinal-0': [
    'The abdomen stays relaxed with the torso at rest.',
    'El abdomen se mantiene relajado con el torso en reposo.',
  ],
  'love-gastrointestinal-0': [
    'The abdomen and torso are relaxed in a comfortable resting pose.',
    'El abdomen y el torso están relajados en una postura cómoda de reposo.',
  ],
  'baseline-neutral-gastrointestinal-0': [
    'The abdomen rests in a neutral posture without a visible brace.',
    'El abdomen está en reposo en una postura neutra, sin tensión visible.',
  ],
  'anger-full-face': [
    'The brows lower and draw together, the upper lids lift, and the lips form a thin line.',
    'Las cejas bajan y se juntan, los párpados superiores se elevan y los labios forman una línea fina.',
  ],
  'fear-full-face': [
    'Raised, drawn-together brows frame wide eyes above a horizontally stretched mouth.',
    'Las cejas elevadas y juntas enmarcan los ojos muy abiertos sobre una boca estirada en horizontal.',
  ],
  'sadness-full-face': [
    'The inner brows rise, the mouth corners drop, and the chin lifts slightly.',
    'La parte interna de las cejas se eleva, las comisuras bajan y el mentón se levanta ligeramente.',
  ],
  'happiness-full-face': [
    'The smile lifts both mouth corners and raises the cheeks toward the eyes.',
    'La sonrisa eleva ambas comisuras y acerca las mejillas a los ojos.',
  ],
  'disgust-full-face': [
    'Wrinkles bunch around the nose as the upper lip lifts.',
    'La piel se arruga alrededor de la nariz mientras se eleva el labio superior.',
  ],
  'surprise-full-face': [
    'Both brows arch over wide eyes, and the jaw drops with the lips parted.',
    'Ambas cejas se arquean sobre los ojos muy abiertos y la mandíbula baja con los labios separados.',
  ],
  'anxiety-full-face': [
    'The inner brows rise and draw together above lips pressed closed.',
    'La parte interna de las cejas se eleva y se junta sobre los labios apretados.',
  ],
  'panic-full-face': [
    'High brows and raised upper lids open the eye area as the jaw drops.',
    'Las cejas y los párpados superiores se elevan, abriendo la zona de los ojos mientras baja la mandíbula.',
  ],
  'shame-full-face': [
    'The head inclines forward and the eyes turn down.',
    'La cabeza se inclina hacia delante y los ojos miran hacia abajo.',
  ],
  'pride-full-face': [
    'The chin tilts up, with a steady gaze and a small closed-mouth smile.',
    'El mentón se eleva, con una mirada firme y una leve sonrisa de labios cerrados.',
  ],
  'contempt-full-face': [
    'One mouth corner pulls into a dimple while the opposite side stays relaxed.',
    'Una comisura se retrae y forma un hoyuelo mientras la otra permanece relajada.',
  ],
  'awe-full-face': [
    'Softly arched brows and open eyes accompany a slightly lowered jaw.',
    'Las cejas suavemente arqueadas y los ojos abiertos acompañan una mandíbula ligeramente baja.',
  ],
  'love-full-face': [
    'Gently lifted cheeks and a closed-mouth smile accompany direct eye contact.',
    'Las mejillas ligeramente elevadas y la sonrisa de labios cerrados acompañan una mirada directa.',
  ],
  'baseline-neutral-au0': [
    'The brows rest, the gaze faces forward, and the mouth corners stay level.',
    'Las cejas descansan, la mirada se dirige al frente y las comisuras permanecen a la misma altura.',
  ],
  'anger-cardiovascular-0': [
    'A reddish tint covers the temples, neck and upper chest.',
    'Se aprecia un tono rojizo en las sienes, el cuello y la parte superior del pecho.',
  ],
  'anger-integumentary_thermal-0': [
    'Diffuse redness across the face and forearms, with a slight sheen on the forehead.',
    'Enrojecimiento difuso en el rostro y los antebrazos, con un brillo leve en la frente.',
  ],
  'fear-cardiovascular-0': [
    'A slight sheen is visible on the skin of the face and neck.',
    'Se aprecia un ligero brillo en la piel del rostro y el cuello.',
  ],
  'fear-respiratory-0': [
    'The collarbones sit high above the chest in a shallow-breathing pose.',
    'Las clavículas se elevan sobre el pecho en una pose de respiración superficial.',
  ],
  'fear-musculoskeletal-0': [
    'The thighs and calves are braced in a ready stance.',
    'Los muslos y las pantorrillas están en tensión en una postura de preparación.',
  ],
  'sadness-cardiovascular-0': [
    'The shoulders sit low beneath the face, leaving the upper chest slightly slumped.',
    'Los hombros están bajos y la parte superior del pecho queda ligeramente hundida.',
  ],
  'sadness-respiratory-0': [
    'Raised shoulders and an expanded chest suggest the moment of a sob.',
    'Los hombros elevados y el pecho expandido evocan el momento de un sollozo.',
  ],
  'sadness-musculoskeletal-1': [
    'The arms hang beside the torso, with the hands resting low.',
    'Los brazos cuelgan a los lados del torso, con las manos bajas.',
  ],
  'happiness-musculoskeletal-1': [
    'The arms and hands are shown mid-gesture with loose wrists.',
    'Los brazos y las manos aparecen a mitad de un gesto, con las muñecas relajadas.',
  ],
  'panic-cardiovascular-0': [
    'A hand rests over the sternum as the person poses with a tense expression.',
    'Una mano se apoya sobre el esternón mientras la persona posa con el rostro tenso.',
  ],
  'panic-respiratory-0': [
    'The mouth is open and the chest lifted in a pose of labored breathing.',
    'La boca está abierta y el pecho elevado en una pose de respiración trabajosa.',
  ],
  'panic-gastrointestinal-0': [
    'The person presses a hand into the upper abdomen.',
    'La persona presiona la parte superior del abdomen con una mano.',
  ],
  'panic-musculoskeletal-0': [
    'The fingers are slightly bent at the joints.',
    'Los dedos están ligeramente flexionados en las articulaciones.',
  ],
  'panic-integumentary_thermal-0': [
    'Beads of sweat are visible on the forehead and upper chest.',
    'Se aprecian gotas de sudor en la frente y la parte superior del pecho.',
  ],
  'panic-neurosensory-0': [
    'The eyes hold a fixed gaze with enlarged pupils.',
    'Los ojos mantienen la mirada fija y las pupilas están dilatadas.',
  ],
  'shame-musculoskeletal-0': [
    'The head hangs forward and the shoulders round toward the chest.',
    'La cabeza cae hacia delante y los hombros se redondean hacia el pecho.',
  ],
  'shame-musculoskeletal-1': [
    'The arms stay close to the torso as the shoulders roll inward.',
    'Los brazos se mantienen pegados al torso mientras los hombros giran hacia dentro.',
  ],
  'pride-musculoskeletal-0': [
    'The chest opens as the shoulders pull back.',
    'El pecho se abre mientras los hombros se desplazan hacia atrás.',
  ],
  'pride-musculoskeletal-2': [
    'The hands rest on the hips with the elbows angled outward.',
    'Las manos se apoyan en las caderas y los codos apuntan hacia fuera.',
  ],
  'awe-integumentary_thermal-0': [
    'Small bumps rise on the skin around the erect hairs.',
    'La piel presenta pequeños relieves alrededor del vello erizado.',
  ],
  'love-cardiovascular-0': [
    'A hand rests over the chest beneath a softly posed face.',
    'Una mano descansa sobre el pecho bajo un rostro de expresión suave.',
  ],
};

const units = {
  au1: [
    'The inner ends of the brows rise toward the center of the forehead.',
    'Los extremos internos de las cejas se elevan hacia el centro de la frente.',
  ],
  au2: [
    'The outer ends of the brows lift above the temples.',
    'Los extremos externos de las cejas se elevan sobre las sienes.',
  ],
  au4: [
    'The brows move down and inward, narrowing the space between them.',
    'Las cejas bajan y se acercan, reduciendo el espacio entre ellas.',
  ],
  au5: [
    'The upper eyelids lift and expose more of the eyes.',
    'Los párpados superiores se elevan y dejan más superficie de los ojos a la vista.',
  ],
  au6: [
    'The cheeks rise toward the lower lids, narrowing the eye opening.',
    'Las mejillas se elevan hacia los párpados inferiores y estrechan la abertura de los ojos.',
  ],
  au7: [
    'The lids tighten around the eyes, especially along the lower edges.',
    'Los párpados se tensan alrededor de los ojos, sobre todo en los bordes inferiores.',
  ],
  au9: [
    'The bridge and sides of the nose bunch into wrinkles.',
    'La piel del puente y los lados de la nariz se pliega.',
  ],
  au10: ['The upper lip lifts toward the nose.', 'El labio superior se eleva hacia la nariz.'],
  au12: [
    'The mouth corners pull upward and outward.',
    'Las comisuras se desplazan hacia arriba y hacia fuera.',
  ],
  au15: ['Both mouth corners pull downward.', 'Ambas comisuras se desplazan hacia abajo.'],
  au16: [
    'The lower lip moves down, revealing more of the lower teeth.',
    'El labio inferior baja y deja más visibles los dientes inferiores.',
  ],
  au17: [
    'The chin rises, pushing the lower lip upward.',
    'El mentón se eleva y empuja el labio inferior hacia arriba.',
  ],
  au20: [
    'The lips stretch horizontally as the corners move apart.',
    'Los labios se estiran en horizontal al separarse las comisuras.',
  ],
  au23: [
    'The lips tighten and become visibly thinner.',
    'Los labios se tensan y se vuelven visiblemente más finos.',
  ],
  au24: [
    'The upper and lower lips press firmly together.',
    'Los labios superior e inferior se presionan entre sí.',
  ],
  au25: [
    'The lips part slightly with little change in jaw position.',
    'Los labios se separan un poco sin apenas mover la mandíbula.',
  ],
  au26: ['The jaw lowers and opens the mouth.', 'La mandíbula baja y abre la boca.'],
  au53: [
    'The head tips upward, lifting the chin and lengthening the front of the neck.',
    'La cabeza se inclina hacia arriba, elevando el mentón y alargando la parte frontal del cuello.',
  ],
  au54: [
    'The head tilts down and the chin moves toward the chest.',
    'La cabeza se inclina hacia abajo y el mentón se acerca al pecho.',
  ],
  au64: ['The eyes turn downward.', 'Los ojos se dirigen hacia abajo.'],
  'au1-2': [
    'The inner and outer sections of the brows lift together.',
    'Las zonas internas y externas de las cejas se elevan juntas.',
  ],
  'au1-4': [
    'The inner brows rise while the brows draw together.',
    'La parte interna de las cejas se eleva mientras las cejas se juntan.',
  ],
  'au1-2-5': [
    'The brows and upper eyelids lift together, widening the eye opening.',
    'Las cejas y los párpados superiores se elevan juntos y amplían la abertura de los ojos.',
  ],
  'au14-unilateral': [
    'One mouth corner pulls inward to form a dimple on that side.',
    'Una comisura se retrae y forma un hoyuelo en ese lado.',
  ],
  'au10-unilateral': [
    'One side of the upper lip lifts while the other remains relaxed.',
    'Un lado del labio superior se eleva mientras el otro permanece relajado.',
  ],
};

export function describePhoto(record, locale) {
  const [group, key] = record.image_key.split('/');
  const description =
    descriptions[key] ||
    bodyCaptions[key] ||
    (group === 'face' && units[key.slice(key.indexOf('-') + 1)]);
  return description?.[locale === 'es' ? 1 : 0] || translateCatalog(record.claim, locale);
}
