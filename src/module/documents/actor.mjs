/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class naheulbeukActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags.naheulbeuk || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  _computeTotalValue(element) {
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

  _actorComputeStatsTotalValues(data) {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, element] of Object.entries(data.stats)) {
      // Calculate the modifier using d20 rules.
      //ability.mod = Math.floor((ability.value - 10) / 2);
      this._computeTotalValue(element);
    }

  }
  _actorComputeSkillsTotalValues(data) {
    this._computeTotalValue(data.skills.attack);
    this._computeTotalValue(data.skills.parade);
    this._computeTotalValue(data.skills.throw);
    this._computeTotalValue(data.skills.dodge);
    this._computeTotalValue(data.skills.magic.physical);
    this._computeTotalValue(data.skills.magic.psychic);
    this._computeTotalValue(data.skills.magic.resist);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    console.log(actorData.data);
    // Make modifications to data here. For example:
    const data = actorData.data;

    this._actorComputeStatsTotalValues(data);

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

    this._actorComputeSkillsTotalValues(data);
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const data = actorData.data;
    data.xp = (data.cr * data.cr) * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.data.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      //for (let [k, v] of Object.entries(data.abilities)) {
      //  data[k] = foundry.utils.deepClone(v);
      //}
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.data.type !== 'npc') return;

    // Process additional NPC data here.
  }

}