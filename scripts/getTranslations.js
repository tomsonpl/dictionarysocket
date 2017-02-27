import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/translations=${ARGS.target_language}`, {
  headers: {
    app_id: '<your_app_id>',
    app_key: '<your_app_key'
  }
})
  .then((response) => response.data)
  .then((data) => {
    const translations = data.results[0].lexicalEntries[0].entries[0];

    setResponse(new HttpResponse(200, JSON.stringify(translations)));
  })
  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
    setResponse(new HttpResponse(404, "There is not such a term in our database, please try again with a different term", 'text/plain'));
  });