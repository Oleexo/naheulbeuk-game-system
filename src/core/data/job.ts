import { StatRestrictions, Stats } from './stats';

export const jobs: Job[] = [{
    name: 'warrior',
    label: 'nhb.actor.job.warrior',
    restrictions:{
      courage: { min: 12, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 12, max: 999 },
    },
  }, {
    name: 'assassin',
    label: 'nhb.actor.job.assassin',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 13, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'thief',
    label: 'nhb.actor.job.thief',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 12, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'ranger',
    label: 'nhb.actor.job.ranger',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 10, max: 999 },
      dexterity: { min: 10, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'bard',
    label: 'nhb.actor.job.bard',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 12, max: 999 },
      dexterity: { min: 11, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'merchant',
    label: 'nhb.actor.job.merchant',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 12, max: 999 },
      charisma: { min: 11, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'engineer',
    label: 'nhb.actor.job.engineer',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 11, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'pirate',
    label: 'nhb.actor.job.pirate',
    restrictions:{
      courage: { min: 11, max: 999 },
      intelligence: { min: 0, max: 999 },
      charisma: { min: 0, max: 999 },
      dexterity: { min: 11, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }, {
    name: 'noble',
    label: 'nhb.actor.job.noble',
    restrictions:{
      courage: { min: 0, max: 999 },
      intelligence: { min: 10, max: 999 },
      charisma: { min: 11, max: 999 },
      dexterity: { min: 0, max: 999 },
      strength: { min: 0, max: 999 },
    },
  }];

export interface Job {
  name: string;
  label: string;
  restrictions: StatRestrictions;
}

export function getAvailableJobs(stats: Stats, origin: string): Job[] {
  return jobs.filter(job => {
    const { intelligence, strength, dexterity, courage, charisma } = job.restrictions;
    return origin === "human"
      || ((courage.min <= stats.courage.value && stats.courage.value <= courage.max)
        && (intelligence.min <= stats.intelligence.value && stats.intelligence.value <= intelligence.max)
        && (charisma.min <= stats.charisma.value && stats.charisma.value <= charisma.max)
        && (dexterity.min <= stats.dexterity.value && stats.dexterity.value <= dexterity.max)
        && (strength.min <= stats.strength.value && stats.strength.value <= strength.max));
  });
}