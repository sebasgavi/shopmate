import request from 'superagent';

/**
 * helper to call API
 * 
 * All functions should return a promise with the body of the response, or reject on error.
 * Images should have the complete URL, to avoid extra logic in the components.
 */

const api = function(){
  const root = 'https://backendapi.turing.com';
  const imagesRoot = 'https://backendapi.turing.com/images/products/';

  function getProducts(page = 1, limit = 20): Promise<{ rows, count }>{
    return new Promise((resolve, reject) => {
      request
        .get(`${root}/products`)
        .set('Accept', 'application/json')
        .query({ page, limit })
        .then(res => {
          // map thumbnail paths to complete URL
          if(res.body.rows) res.body.rows = res.body.rows.map(elem => {
            elem.thumbnail = imagesRoot + elem.thumbnail;
            return elem;
          });
          resolve(res.body);
        }, reject);
    })
  }

  return {
    getProducts,
  }
}

export default api();