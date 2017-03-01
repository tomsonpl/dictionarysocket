import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/synonyms`, {
  headers: {
    app_id: CONFIG.app_id,
    app_key: CONFIG.app_key
  }
})
  .then((response) => response.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses)
  .then((data) => {
    const synonyms = data.map(synonym => synonym.synonyms.map(word => word.id));

    setResponse(new HttpResponse(200, JSON.stringify(synonyms)));
  })
  .catch((error) => {
    setResponse(new HttpResponse(400, error));
  });
