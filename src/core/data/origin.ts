import { StatRestrictions, Stats } from './stats';

export const origins: Origin[] = [{
    name: 'human',
    label: 'nhb.actor.origin.human',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'barbarian',
    label: 'nhb.actor.origin.barbarian',
    restrictions:{
      courage: { min: 12, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 13, max: 999 },
    },
  }, {
    name: 'dwarf',
    label: 'nhb.actor.origin.dwarf',
    restrictions:{
      courage: { min: 11, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 12, max: 999 },
    },
  }, {
    name: 'hight-elf',
    label: 'nhb.actor.origin.hight-elf',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 11, max: 999 },
      charisma: { min: 12, max: 999 },
      dexterity: { min: 12, max: 999 },
      strength: { min: 0, max: 12 },
    },
  }, {
    name: 'half-elf',
    label: 'nhb.actor.origin.half-elf',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 10, max: 999 },
      dexterity: { min: 11, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'wood-elf',
    label: 'nhb.actor.origin.wood-elf',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 12, max: 999 },
      dexterity: { min: 10, max: 999 },
      strength: { min: 0, max: 11 },
    },
  }, {
    name: 'dark-elf',
    label: 'nhb.actor.origin.dark-elf',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 13, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'orc',
    label: 'nhb.actor.origin.orc',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 8 },
      charisma: { min: 0, max: 10 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 12, max: 999 },
    },
  }, {
    name: 'half-orc',
    label: 'nhb.actor.origin.half-orc',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 10 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 11 },
      strength: { min: 12, max: 999 },
    },
  }, {
    name: 'goblin',
    label: 'nhb.actor.origin.goblin',
    restrictions:{
      courage: { min: 0, max: 10 },
      intelligence: { min: 0, max: 10 },
      charisma: { min: 0, max: 8 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 0, max: 9 },
    },
  }, {
    name: 'ogre',
    label: 'nhb.actor.origin.ogre',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 9 },
      charisma: { min: 0, max: 10 },
      dexterity: { min: 0, max: 11 },
      strength: { min: 13, max: 999 },
    },
  }, {
    name: 'halfling',
    label: 'nhb.actor.origin.halfling',
    restrictions:{
      courage: { min: 12, max: 999 },
      intelligence: { min: 10, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 0, max: 10 },
    },
  }, {
    name: 'gnome',
    label: 'nhb.actor.origin.gnome',
    restrictions:{
      courage: { min: 12, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 13, max: 999 },
    },
  }
]

export interface Origin {
  name: string,
  label: string,
  restrictions: StatRestrictions,
}

export function getAvailableOrigins(stats: Stats): Origin[] {
  return origins.filter(origin => {
    const { intelligence, strength, dexterity, courage, charisma } = origin.restrictions;
    return (
      (courage.min <= stats.courage.value && stats.courage.value <= courage.max)
      && (intelligence.min <= stats.intelligence.value && stats.intelligence.value <= intelligence.max)
      && (charisma.min <= stats.charisma.value && stats.charisma.value <= charisma.max)
      && (dexterity.min <= stats.dexterity.value && stats.dexterity.value <= dexterity.max)
      && (strength.min <= stats.strength.value && stats.strength.value <= strength.max)
    );
  });
}
