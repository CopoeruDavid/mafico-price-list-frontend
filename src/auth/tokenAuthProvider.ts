import { AuthProvider, fetchUtils } from 'ra-core';

export interface Options {
  obtainAuthTokenUrl?: string;
}

function tokenAuthProvider(options: Options = {}): AuthProvider {
  const opts = {
    obtainAuthTokenUrl: '/api-token-auth/',
    ...options,
  };
  return {
    login: async ({ username, password }) => {
      const request = new Request(opts.obtainAuthTokenUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      const response = await fetch(request);
      if (response.ok) {
        localStorage.setItem('token', (await response.json()).token);
        return;
      }
      if (response.headers.get('content-type') !== 'application/json') {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      const error = json.non_field_errors;
      throw new Error(error || response.statusText);
    },
    logout: () => {
      localStorage.removeItem('token');
      return Promise.resolve();
    },
    checkAuth: () => {
      if (!localStorage.getItem('token')) {
        return Promise.reject(new Error("Authentication required"));
      }
      console.log("after");
      const body = JSON.stringify({
        query: `
          query {
            products(input: {
              plot: {
                items: 25
                page: 1
              }
              filter: {
                isPublic: true
              }
            }) {
              records {
                description
                descriptionHTML
                maficoCode
                ean
                msrp
                model
                id
                files { name url }
                width
                weight
                length
                summary
                type
                trademark { id name }
              }
              recordsTotal
            }
          }
        `,
      });
    
      return fetch('https://services.mafico.com/data-worker/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': String(localStorage.getItem('token')),
        },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.data.products === null) {
            return Promise.reject(new Error("Authentication expired. Please log in again :)"));
          } else {
            return Promise.resolve();
          }
        });
    }
    ,
    
    checkError: error => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        return Promise.reject();
      }
      return Promise.resolve();
    },
    getPermissions: () => {
      return Promise.resolve();
    },
  };
}

export function createOptionsFromToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  return {
    user: {
      authenticated: true,
      token: 'Token ' + token,
    },
  };
}

export function fetchJsonWithAuthToken(url: string, options: object) {
  return fetchUtils.fetchJson(
    url,
    Object.assign(createOptionsFromToken(), options)
  );
}

export default tokenAuthProvider;
