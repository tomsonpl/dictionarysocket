import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/translations=${ARGS.target_language}`, {
  headers: {
    app_id: '9c302467',
    app_key: '36cbe55236155429a3f34480bc1fae39'
  }
})
  .then((response) => response.data)
  .then((data) => {

    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    const translations = data.results[0].lexicalEntries[0].entries[0].senses[0].translations.map(term => term.text);
    const unique = translations.filter(onlyUnique);
    const translated = JSON.stringify(unique);

    setResponse(new HttpResponse(200, `Possible translations for ${ARGS.word} are : ${translated}`, 'text/plain'));
  })
  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
  });
