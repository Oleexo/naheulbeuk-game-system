import {ActorCharacterData} from "./actor-character-data";

export interface FoundryValue {
  value: number;
  mod: number;
  temp: number;
  total: number
}

export interface ValueMinMax {
  value: number;
  min: number;
  max: number;
}

export interface ActorSheetContext {
  data: ActorCharacterData;
}

export function computeTotalValue(element: FoundryValue) {
  let total = 0;

  if (element.value) {
    total += element.value;
  } else {
    element.value = 0;
  }

  if (element.temp) {
    total += element.temp;
  } else {
    element.temp = 0;
  }
  if (element.mod) {
    total += element.mod;
  } else {
    element.mod = 0;
  }
  element.total = Math.floor(total);
}