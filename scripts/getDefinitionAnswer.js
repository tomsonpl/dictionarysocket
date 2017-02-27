import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/definitions`, {
  headers: {
    app_id: '<your_app_id>',
    app_key: '<your_app_key'
  }
})
  .then((response) => response.data)
  .then((data) => {
    const translations = data.results[0].lexicalEntries[0].entries[0].senses[0];
    const subsenses = translations.subsenses ? 
      translations.subsenses.map(senses => senses.definitions) :
      '';
    const otherDefinitions = translations.subsenses ?
      JSON.stringify(...subsenses[0]).replace(':', '') :
      '';
    const definition = translations.definitions[0];
    const definitionOne = JSON.stringify(definition).replace(':', '');

    setResponse(new HttpResponse(200, 
     `Description for ${ARGS.word}:
       ${definitionOne}
       ${otherDefinitions}`,
     'text/plain'));
  })
  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
    setResponse(new HttpResponse(404, "There is not such a word in our database, please try again with a different term", 'text/plain'));
  });
