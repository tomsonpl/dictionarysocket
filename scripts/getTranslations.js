
import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/translations=${ARGS.target_language}`, {
  headers: {
    app_id: CONFIG.app_id || '9c302467',
    app_key: CONFIG.app_key || '36cbe55236155429a3f34480bc1fae39'
  }
})
  .then((response) => response.data)
  .then((data) => {
    const translations = data.results[0].lexicalEntries[0].entries[0];

    setResponse(new HttpResponse(200, JSON.stringify(translations)));
  })
  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
  });
