export const initializeHandlebars = () => {
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
};

async function preloadHandlebarsTemplates() {
  return loadTemplates([
    // Actor partials.
    "systems/naheulbeuk/templates/actor/parts/actor-age.html",
    "systems/naheulbeuk/templates/actor/parts/actor-astral.html",
    "systems/naheulbeuk/templates/actor/parts/actor-effects.html",
    "systems/naheulbeuk/templates/actor/parts/actor-exp.html",
    "systems/naheulbeuk/templates/actor/parts/actor-features.html",
    "systems/naheulbeuk/templates/actor/parts/actor-health.html",
    "systems/naheulbeuk/templates/actor/parts/actor-height.html",
    "systems/naheulbeuk/templates/actor/parts/actor-items.html",
    "systems/naheulbeuk/templates/actor/parts/actor-job.html",
    "systems/naheulbeuk/templates/actor/parts/actor-origin.html",
    "systems/naheulbeuk/templates/actor/parts/actor-protection.html",
    "systems/naheulbeuk/templates/actor/parts/actor-senses.html",
    "systems/naheulbeuk/templates/actor/parts/actor-sex.html",
    "systems/naheulbeuk/templates/actor/parts/actor-spells.html",
    "systems/naheulbeuk/templates/actor/parts/actor-stats.html",
    "systems/naheulbeuk/templates/actor/parts/actor-weight.html",
  ]);
}

function registerHandlebarsHelpers() {
  Handlebars.registerHelper("gt", function (e1, e2) {
    return e1 > e2;
  });

  Handlebars.registerHelper("eq", function (e1, e2) {
    return e1 == e2;
  });

  Handlebars.registerHelper("concat", function () {
    var outStr = "";
    for (var arg in arguments) {
      if (typeof arguments[arg] != "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper("toLowerCase", function (str) {
    return str.toLowerCase();
  });
}
