import {computeTotalValue, FoundryValue, ValueMinMax} from "./foundry";
import {computeStatsTotalValues, Stats} from "./stats";
import {Armor, ItemWrapper} from "./item/item";

export interface ActorWrapper {
    data: ActorCharacterData;
    type: string;
}

export interface ActorCharacterData {
    astral: ValueMinMax;
    health: ValueMinMax;
    stats: Stats
    stuff: Stuff;
    protections: Protection;
    skills: Skills;
}
export interface MagicSkills {
    physical: FoundryValue;
    psychic: FoundryValue;
    resist: FoundryValue;
}
export interface Skills {
    attack: FoundryValue;
    parade: FoundryValue;
    throw: FoundryValue;
    dodge: FoundryValue;
    magic: MagicSkills;
}

export interface Protection {
    armorMaxType: number;
    natural: FoundryValue;
    magical: FoundryValue;
    total: number;
}

export interface Stuff {
    armor: ArmorSet;
}

export interface ArmorSet {
    head?: ItemWrapper<Armor>,
    arms?: ItemWrapper<Armor>,
    chest?: ItemWrapper<Armor>,
    shield?: ItemWrapper<Armor>,
    hands?: ItemWrapper<Armor>,
    legs?: ItemWrapper<Armor>,
    boots?: ItemWrapper<Armor>,
}

export function computeSkillsTotalValues(skills: Skills) {
    computeTotalValue(skills.attack);
    computeTotalValue(skills.parade);
    computeTotalValue(skills.throw);
    computeTotalValue(skills.dodge);
    computeTotalValue(skills.magic.physical);
    computeTotalValue(skills.magic.psychic);
    computeTotalValue(skills.magic.resist);
}

export function prepareCharacterData(actorData: ActorWrapper) {
    if (actorData.type !== 'character') return;

    const data = actorData.data;

    computeStatsTotalValues(data.stats);

    let magicalProtection = (data.stats.courage.total + data.stats.intelligence.total + data.stats.strength.total) / 3
    data.skills.magic.resist.value = Math.floor(magicalProtection);

    data.skills.magic.physical.value = (data.stats.intelligence.total + data.stats.dexterity.total) / 2;
    data.skills.magic.psychic.value = (data.stats.intelligence.total + data.stats.charisma.total) / 2;

    if (data.stats.dexterity.value <= 8) {
        data.skills.attack.mod = -0.5;
        data.skills.parade.mod = -0.5;
    } else if (data.stats.dexterity.value >= 12) {
        data.skills.attack.mod = +0.5;
        data.skills.parade.mod = +0.5;
    }
    data.skills.throw.value = data.stats.dexterity.total;
    // todo
    /*
    Pour chaque point de FORCE supérieur à 12 : +1 point d’impact (dégâts des armes améliorés au corps à corps ou à distance)
  Le bonus au dégâts sera donc de +1 pour FO 13, et de +4 pour FO 16, etc.
  Et au contraire sur une carac. de FORCE de 8 ou inférieure : -1 point d’impact (dégâts des armes diminués, car mauviette)
  Contrairement au bonus, le malus ne se cumule pas car on considère que l'arme, même maniée faiblement, peut blesser.
     */
    /*
    Pour chaque point d'INTELLIGENCE supérieur à 12 : +1 point de dégâts des sorts (selon sortilège)
Le bonus au dégâts sera donc de +1 pour INT 13, et de +4 pour INT 16, etc.
Il s'applique à chaque jet de dégât de sortilège : s'il y a plusieurs cibles, il s'appliquera donc à chaque cible
Il n'y a pas de malus pour intelligence faible, car un score faible ne permet pas l'usage de la magie, quoi qu'il arrive. Et
puis, le sort est déjà doué d'une vie propre..
     */

    computeSkillsTotalValues(data.skills);
}


