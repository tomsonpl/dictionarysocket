import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/examples`, {
  headers: {
    app_id: CONFIG.app_id || '<your_app_id>',
    app_key: CONFIG.app_key || '<your_app_key>'
  }
})
  .then((response) => response.data)
  .then((data) => {
    const examples = data.results[0].lexicalEntries[0].entries[0].senses[0];

    setResponse(new HttpResponse(200, JSON.stringify(examples)));
  })
  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
  });
