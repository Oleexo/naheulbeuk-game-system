import logger from './logger';

Hooks.once("ready", () => {
  game.i18n.localize = localize;
  Handlebars.registerHelper('localize', localize);
  logger.log("Overriding game.i18n.localize()");
});

function localize(key, keyAddon = null, options = null) {
  if (keyAddon != null && typeof keyAddon === 'string') {
    key = `${key}.${keyAddon}`;
  }
  return tryFormat(key, keyAddon) || tryFormat(key, options)
    || tryGetLocalisation(key, game.i18n.translations)
    || tryGetLocalisation(key, game.i18n._fallback)
    || key;
}

function tryFormat(key, options) {
  if (options != null && typeof options === 'object') {
    return game.i18n.format(key, options.hash);
  }
  return null;
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
