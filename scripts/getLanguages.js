import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/languages`, {
  headers: {
    app_id: CONFIG.app_id || '<your_app_id>',
    app_key: CONFIG.app_key || '<your_app_key>'
  }
})
  .then((response) => response.data.results)
  .then((languages) => {
    setResponse(new HttpResponse(200, JSON.stringify(languages)));
  })

  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
  });
