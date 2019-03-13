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

  function getProducts(page = 1, limit = 20, departmentId?): Promise<{ rows, count }>{
    let url = `${root}/products`;
    if(departmentId) url += `/inDepartment/${departmentId}`;

    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .query({ page, limit })
        .then(res => {
          // map thumbnail paths to complete URL
          if(res.body.rows) res.body.rows = res.body.rows.map(elem => {
            elem.thumbnail = imagesRoot + elem.thumbnail;
            return elem;
          });

          // fix error in /inDepartment response
          if(res.body.count && res.body.count.count) res.body.count = res.body.count.count;
          resolve(res.body);
        }, reject);
    });
  }

  function getHelper(resource: string, query = {}, cacheMaxTime = 0, ): Promise<any>{
    return new Promise((resolve, reject) => {
      let cache = localStorage.getItem(resource);
      let cacheTime = parseInt(localStorage.getItem(`${resource}_time`) || '');
      
      let timeNow = Date.now();

      let getResource = () => {
        return request
          .get(`${root}/${resource}`)
          .set('Accept', 'application/json')
          .query(query)
          .then(res => {
            // only necesary for cache
            if(cacheMaxTime){
              localStorage.setItem(resource, JSON.stringify(res.body));
              localStorage.setItem(`${resource}_time`, timeNow + '')
            }
            resolve(res.body);
          }, reject);
      }

      // if there's no cacheMaxTime it means cache should not be used, just request resource
      if(!cacheMaxTime) {
        getResource();
        return;
      } 
      // else verify the cache existence and time difference
      else {
        if(!cache || (!isNaN(cacheTime) && timeNow - cacheTime > cacheMaxTime)){
          getResource();
        } else {
          resolve(JSON.parse(cache));
        }
      }

    });
  }

  function getCategories(): Promise<{rows, count}>{
    // cache time for categories = 1 day
    return getHelper(
      'categories',
      { order: 'name,ASC' },
      hoursToMillis(24)
    );
  }

  function getDepartments(): Promise<any>{
    // cache time for departments = 1 day
    return getHelper(
      'departments',
      {},
      hoursToMillis(24)
    );
  }

  return {
    getProducts,
    getCategories,
    getDepartments,
  }
}

function hoursToMillis(hours){
  return hours * 60 * 60 * 1000;
}

export default api();