declare const CONST: any;
declare const game: {
  user: string,
  settings: {
    get(type: string, parameter: string): any
  }
}

declare function renderTemplate(template: string, data: any): Promise<string>;

//#region Roll
declare class Roll {
  static fromTerms(terms: RollTerm[], options?: any): Roll;
  evaluate(): Promise<Roll>;
  result: number;
  total: number;
}

declare class RollTerm {
  constructor({options});
}

declare class DiceTerm extends RollTerm {
  constructor({ number, faces, modifiers, results, options }: {
    number?: number,
    faces?: number,
    modifiers?: any[],
    results?: any[],
    options?: any,
  });
}
//#endregion

//#region Chat
interface MessageOption {
  type?: string;
  roll?: any;
  flags?: any;
  user?: string;
  rollMode?: string;
  content?: string;
  speaker?: string;
  whisper?: string[];
}

interface Message {
  id: string;
  update(option: MessageOption): Promise<Message>
}

declare const ChatMessage: {
  create(option: MessageOption): Promise<Message>;
  getWhisperRecipients(recipient: string): string[];
}
//#endregion

//#region Audio

declare class AudioHelper {
  static play(option: { src?: string, volume?:number, autoplay?: boolean, loop?: boolean }, push?: boolean): Promise<any>;
}
//#endregion