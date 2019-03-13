import request from 'superagent';
import { getEnabledCategories } from 'trace_events';

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
    });
  }

  function getCategories(): Promise<{rows, count}>{
    return new Promise((resolve, reject) => {
      let cache = localStorage.getItem('categories');
      let cacheTime = parseInt(localStorage.getItem('categories_time') || '');
      // cache time for categories = 1 day
      let cacheMaxTime = 1 * 24 * 60 * 60 * 1000;
      let timeNow = Date.now();

      if(!cache || 
        (!isNaN(cacheTime) && timeNow - cacheTime > cacheMaxTime)
        ){
        request
          .get(`${root}/categories`)
          .set('Accept', 'application/json')
          .query({ order: 'name,ASC' })
          .then(res => {
            localStorage.setItem('categories', JSON.stringify(res.body));
            localStorage.setItem('categories_time', timeNow + '')
            resolve(res.body);
          }, reject);
      } else {
        resolve(JSON.parse(cache));
      }
    });
  }

  return {
    getProducts,
    getCategories,
  }
}

export default api();