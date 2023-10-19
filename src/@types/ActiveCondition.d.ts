interface ActiveConditionArg {
  stickCount: number
}

interface ActiveConditionReturn {
  active: boolean
  disabledReason: string | null
}

type ActiveCondition = (arg: ActiveConditionArg) => ActiveConditionReturn
