export interface ItemWrapper<T> {
    _id: string;
    data: T;
    effect: any;
    flags: any;
    folder: any;
    img: string;
    name: string;
    permission: any;
    sort: number;
    type: string;
}
export interface SimpleStats{
    courage: number,
    intelligence: number,
    charisma: number,
    dexterity: number,
    strength: number,
}
export interface Item {
    description: string;
}

export interface SimpleSkills {
    attack: number;
    parade: number;
}
export interface Protection {
    natural: number;
    magical: number;
    // PR value
    type: number;
}
export interface Armor extends Item {
    stats: SimpleStats;
    skills: SimpleSkills;
    break: number;
    position: "head" | "arms"| "chest"| "shield"| "hands"| "legs"| "boots";
    protections: Protection;
}