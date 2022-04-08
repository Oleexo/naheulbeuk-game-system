import logger from './logger';

Hooks.once("ready", () => {
  game.i18n.localize = localize;
  logger.log("Overriding game.i18n.localize()");
});

function localize(key) {
  return tryGetLocalisation(key, game.i18n.translations)
  || tryGetLocalisation(key, game.i18n._fallback)
  || key;
}

function tryGetLocalisation(key, translations) {
  let value = translations;
  for (let part of key.split('.')) {
    if (!(part in value)) {
      return null;
    }
    value = value[part];
  }
  return value;
}
