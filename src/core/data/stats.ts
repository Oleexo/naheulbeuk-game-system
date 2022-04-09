import { FoundryValue } from './foundry';

export interface Stats {
  courage: FoundryValue,
  intelligence: FoundryValue,
  charisma: FoundryValue,
  dexterity: FoundryValue,
  strength: FoundryValue,
}

export interface StatRestrictions {
  courage: Range,
  intelligence: Range,
  charisma: Range,
  dexterity: Range,
  strength: Range,
}

export interface Range {
  min: number,
  max: number,
}