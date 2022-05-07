import { RollType } from './utils/roll-type';

class ChatService {
  private templates = {
    [RollType.ABILITY]: "systems/naheulbeuk/templates/chat/ability-roll.html",
    [RollType.SKILL]: "systems/naheulbeuk/templates/chat/skill-roll.html",
  };

  async sendRoll(type: RollType, roll: Roll, context: any) {
    await roll.evaluate();
    const html = await renderTemplate(this.templates[type], {
      roll: {
        result: roll.result,
        total: roll.total,
      },
      ...context
    });

    const rollMode = game.settings.get("core", "rollMode");
    await ChatMessage.create({
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      rollMode,
      roll,
      whisper: this.getWhisper(rollMode),
      content: html,
    })
    AudioHelper.play({ src: 'sounds/dice.wav', loop: false }, true);
  }

  private getWhisper(rollMode: string): string[] {
    if ("selfroll" === rollMode) {
      return [game.user];
    }
    if (["blindroll", "gmroll"].includes(rollMode)) {
      return ChatMessage.getWhisperRecipients("GM");
    }
    return null;
  }
}

export let chatService = new ChatService();

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    chatService = newModule.chatService;
  }); 
}
