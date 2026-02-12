import PersonaStep01 from '../../assets/diagrams/persona--i-dont-know-where-to-start'
import PersonaStep02 from '../../assets/diagrams/persona--money-puzzle'
import PersonaStep03 from '../../assets/diagrams/persona--challenges'

import Compass from '../../assets/diagrams/compass'
import HomeWhere from '../../assets/diagrams/home-where'
import Mortgage from '../../assets/diagrams/mortgage'


export function PersonaStep01Diagram() {
  return <PersonaStep01/>
}

export function PersonaStep02Diagram() {
  return <PersonaStep02/>
}

export function PersonaStep03Diagram() {
  return <PersonaStep03/>
}

export default {
  'PersonaStep01Diagram': PersonaStep01Diagram,
  'PersonaStep02Diagram': PersonaStep02Diagram,
  'PersonaStep03Diagram': PersonaStep03Diagram,
  '': () => (null),
  null: () => (null),

  '🧭': Compass,
  '🧮': () => HomeWhere,
  '💸': () => Mortgage,
}