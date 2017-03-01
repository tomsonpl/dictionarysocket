import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/entries/${ARGS.source_language}/${ARGS.word}/translations=${ARGS.target_language}`, {
  headers: {
    app_id: CONFIG.app_id || '<your_app_id>',
    app_key: CONFIG.app_key || '<your_app_key>'
  }
})
  .then((response) => response.data)
  .then((data) => {

    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    const translations = data.results[0].lexicalEntries[0].entries[0].senses[0].translations.map(term => term.text);
    const uniqueTranslations = translations.filter(onlyUnique);
    const translated = JSON.stringify(uniqueTranslations);

    setResponse(new HttpResponse(200, `Translations for ${ARGS.word}: ${translated}`, 'text/plain'));
  })
  .catch((error) => {
    setResponse(new HttpResponse(404, "There is not such a term in our database, please try again with a different term", 'text/plain'));
  });
