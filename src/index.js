'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.ee611a5b-a423-420e-a4b1-d024b95244b1"; // TODO replace with your app ID (OPTIONAL).
var pokemons = require('./pokemon-skills');
var pokepower = require('./pokemon-powers');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // alexa.dynamoDBTableName = 'YourTableName';           // For DynamoDB calls ---> That's it! More @ https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs

    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...

    'LaunchRequest': function () {
        this.attributes['speechOutput'] = this.t("WELCOME_MESSAGE", this.t("SKILL_NAME"));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.

        this.attributes['repromptSpeech'] = this.t("WELCOME_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },

    'PokemonListIntent': function () {
        var itemSlot = this.event.request.intent.slots.Item;
        var itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        var pokemons = this.t("POKEMONS");          // Finds in pokemon-skills.js appropriate language
        var cardTitle = this.t("DISPLAY_CARD_TITLE", this.t("SKILL_NAME"), itemName);

        var pokemon_desc = pokemons[itemName];      // Find Pokemon and his description

        if (pokemon_desc) {
            this.attributes['speechOutput'] = pokemon_desc;
            this.attributes['repromptSpeech'] = this.t("REPEAT_MESSAGE");
            this.emit(':tellWithCard', pokemon_desc, this.attributes['repromptSpeech'], cardTitle, pokemon_desc);
        } else {
            var speechOutput = this.t("POKEMON_NOT_FOUND_MESSAGE");
            var repromptSpeech = this.t("POKEMON_NOT_FOUND_REPROMPT");
            if (itemName) {
                speechOutput += this.t("POKEMON_NOT_FOUND_WITH_ITEM_NAME", itemName);
            } else {
                speechOutput += this.t("POKEMON_NOT_FOUND_WITHOUT_ITEM_NAME");
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },

    'PokemonPowerIntent': function () {
        var powerSlot = this.event.request.intent.slots.Power;
        var powerName;
        if (powerSlot && powerSlot.value) {
            powerName = powerSlot.value.toLowerCase();
        }

        const pokepower = this.t("POKEMONS");          // Finds in pokemon-skills.js appropriate language
        var cardTitle = this.t("DISPLAY_CARD_TITLE", this.t("SKILL_NAME"), powerName);

        var pokemon_power = pokepower[powerName];      // Find Pokemon and his description

        if (pokemon_power) {
            this.attributes['speechOutput'] = pokemon_power;
            this.attributes['repromptSpeech'] = this.t("REPEAT_MESSAGE");
            this.emit(':tellWithCard', pokemon_desc, this.attributes['repromptSpeech'], cardTitle, pokemon_power);
        } else {
            var speechOutput = this.t("POKEMON_NOT_FOUND_MESSAGE");
            var repromptSpeech = this.t("POKEMON_NOT_FOUND_REPROMPT");
            if (powerName) {
                speechOutput += this.t("POKEMON_NOT_FOUND_WITH_ITEM_NAME", powerName);
            } else {
                speechOutput += this.t("POKEMON_NOT_FOUND_WITHOUT_ITEM_NAME");
            }
            speechOutput += repromptSpeech;

            this.attributes['speechOutput'] = speechOutput;
            this.attributes['repromptSpeech'] = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },


    'AMAZON.HelpIntent': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest':function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'Unhandled': function () {
        this.attributes['speechOutput'] = this.t("HELP_MESSAGE");
        this.attributes['repromptSpeech'] = this.t("HELP_REPROMPT");
        this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptSpeech'])
    }
};

var languageStrings = {
    "en": {
        "translation": {
            "POKEMONS": pokemons.POKEMON_EN_GB,
            "SKILL_NAME": "Pokedex Helper",
            "WELCOME_MESSAGE": "Welcome to %s. You can ask a question like, what\'s the pokemon for a chest? ... Now, what can I help you with.",
            "WELCOME_REPROMPT": "For instructions on what you can say, please say help me.",
            "DISPLAY_CARD_TITLE": "%s  - pokemon finder %s.",
            "HELP_MESSAGE": "You can ask questions such as, what\'s the pokemon, or, you can say exit...Now, what can I help you with?",
            "HELP_REPROMPT": "You can say things like, what\'s the pokemon, or you can say exit...Now, what can I help you with?",
            "STOP_MESSAGE": "Goodbye!",
            "REPEAT_MESSAGE": "Try saying repeat.",
            "POKEMON_NOT_FOUND_MESSAGE": "I\'m sorry, I currently do not know ",
            "POKEMON_NOT_FOUND_WITH_ITEM_NAME": "the pokemon for %s. ",
            "POKEMON_NOT_FOUND_WITHOUT_ITEM_NAME": "that pokemon. ",
            "POKEMON_NOT_FOUND_REPROMPT": "What else can I help with?"
        }
    },
    "en-US": {
        "translation": {
            "POKEMONS" : pokemons.POKEMON_EN_US,
            "SKILL_NAME" : "American Pokedex"
        }
    },
    "en-GB": {
        "translation": {
            "POKEMONS": pokemons.POKEMON_EN_GB,
            "SKILL_NAME": "British Pokedex"
        }
    },
    "de": {
        "translation": {
            "POKEMONS" : pokemons.POKEMON_DE_DE,
            "SKILL_NAME" : "Assistent für Pokedex in Deutsch",
            "WELCOME_MESSAGE": "Willkommen bei %s. Du kannst beispielsweise die Frage stellen: Welche Rezepte gibt es für eine Truhe? ... Nun, womit kann ich dir helfen?",
            "WELCOME_REPROMPT": "Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.",
            "DISPLAY_CARD_TITLE": "%s - Rezept für %s.",
            "HELP_MESSAGE": "Du kannst beispielsweise Fragen stellen wie „Wie geht das Rezept für“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?",
            "HELP_REPROMPT": "Du kannst beispielsweise Sachen sagen wie „Wie geht das Rezept für“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?",
            "STOP_MESSAGE": "Auf Wiedersehen!",
            "REPEAT_MESSAGE": "Sage einfach „Wiederholen“.",
            "POKEMON_NOT_FOUND_MESSAGE": "Tut mir leid, ich kenne derzeit ",
            "POKEMON_NOT_FOUND_WITH_ITEM_NAME": "das Rezept für %s nicht. ",
            "POKEMON_NOT_FOUND_WITHOUT_ITEM_NAME": "dieses Rezept nicht. ",
            "POKEMON_NOT_FOUND_REPROMPT": "Womit kann ich dir sonst helfen?"
        }
    }
};