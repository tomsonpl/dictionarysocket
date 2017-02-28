import axios from 'axios';

axios.get(`https://od-api.oxforddictionaries.com/api/v1/languages`, {
  headers: {
    app_id: '<your_app_id>',
    app_key: '<your_app_key'
  }
})
  .then((response) => response.data.results)
  .then((results) => {
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    const languages = results.map(result => result.sourceLanguage);
    const uniqueLanguages = languages.filter(onlyUnique);
    const list = uniqueLanguages.map(lang => {
      return `Language code for ${lang.language} is ${lang.id} `
    })

    setResponse(new HttpResponse(200, JSON.stringify(list)));
  })

  .catch((error) => {
    setResponse(new HttpResponse(400, error, 'text/plain'));
    setResponse(new HttpResponse(404, "There is not such a word in our database, please try again with a different term", 'text/plain'));
  });
