interface Limit {
  householdSize: number | null,
  upperLimit: number,
  lowerLimit: number,
  limitName: 'ami80' | 'ami120' | 'tsahcLimit',
}

interface Program {
  program: string,
  description: string,
  upperLimit: 'ami80' | 'ami120' | 'tsahcLimit',
}

const limitsList: Limit[] = [
  {
    householdSize: 1,
    upperLimit: 58250,
    lowerLimit: 0,
    limitName: 'ami80',
  },
  {
    householdSize: 1,
    upperLimit: 87350,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 2,
    upperLimit: 66600,
    lowerLimit: 0,
    limitName: 'ami80',
  },
  {
    householdSize: 2,
    upperLimit: 99850,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 3,
    upperLimit: 74900,
    lowerLimit: 0,
    limitName: 'ami80',
  },
  {
    householdSize: 3,
    upperLimit: 112300,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 4,
    upperLimit: 83200,
    lowerLimit: 0,
    limitName: 'ami80',
  },
  {
    householdSize: 4,
    upperLimit: 124800,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 5,
    upperLimit: 89900,
    lowerLimit: 0,
    limitName: 'ami80'
  },
  {
    householdSize: 5,
    upperLimit: 134800,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 6,
    upperLimit: 96550,
    lowerLimit: 0,
    limitName: 'ami80'
  },
  {
    householdSize: 6,
    upperLimit: 144750,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 7,
    upperLimit: 103200,
    lowerLimit: 0,
    limitName: 'ami80'
  },
  {
    householdSize: 7,
    upperLimit: 154750,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: 8,
    upperLimit: 109850,
    lowerLimit: 0,
    limitName: 'ami80'
  },
  {
    householdSize: 8,
    upperLimit: 164750,
    lowerLimit: 0,
    limitName: 'ami120',
  },
  {
    householdSize: null,
    upperLimit: 156000,
    lowerLimit: 0,
    limitName: 'tsahcLimit',
  },
]

const programs: Program[] = [
  {
    program: 'City of Houston Homebuyer Assistance',
    description: ``,
    upperLimit: 'ami80',
  },
  {
    program: 'Houston Community Land Trust',
    description: ``,
    upperLimit: 'ami80',
  },
  {
    program: 'Harris County Down Payment Assistance Program',
    description: ``,
    upperLimit: 'ami120',
  },
  {
    program: 'The Texas Homebuyer Program',
    description: ``,
    upperLimit: 'ami120',
  },
  {
    program: 'Texas State Affordable Housing Corporation',
    description: ``,
    upperLimit: 'tsahcLimit',
  },
]

export function getMatchingPrograms(householdSize: number, annualIncome: number):Program[] {
  const matchingLimits = getMatchingLimits(householdSize, annualIncome)
  const matchedLimits = matchingLimits.map((limit) => (limit.limitName))

  return programs.filter((program) => (matchedLimits.includes(program.upperLimit)))
}

export function getMatchingLimits(householdSize: number, annualIncome: number):Limit[] {
  const possibleLimits = getPossibleLimits(householdSize)

  return possibleLimits.filter((limit) => (limit.lowerLimit < annualIncome && annualIncome <= limit.upperLimit))
}

export function getPossibleLimits(householdSize: number):Limit[] {
  if (householdSize < 1 ) {
    return []
  }

  if (householdSize < 9) {
    return limitsList.filter((item) => (item.householdSize === householdSize || item.householdSize === null))
  }

  const BASE_LIMIT = 4
  const overBase = householdSize - BASE_LIMIT
  const baseAMI = limitsList.filter((item) => (item.householdSize === BASE_LIMIT))

  if (baseAMI.length === 0){
    return []
  }

  return [
    ...baseAMI.map((limit) => ({
      ...limit,
      householdSize,
      upperLimit: Math.round(limit.upperLimit * (1 + overBase * 0.08)) * 50,
    })),
    ...limitsList.filter((item) => (item.householdSize === null)),
  ]
}

export function calcDownPaymentDiscount(homePrice: number):number {
  return homePrice * 0.05
}