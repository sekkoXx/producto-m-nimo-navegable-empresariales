var API_BASE = '';

async function apiFetch(path, opts = {}) {
  const res = await fetch(API_BASE + path, Object.assign({
    headers: { 'Content-Type': 'application/json' }
  }, opts));
  const contentType = res.headers.get('content-type') || '';
  if (contentType.indexOf('application/json') !== -1) return res.json();
  return res.text();
}

window.API = {
  createUser: function(payload) { return apiFetch('/api/users', { method: 'POST', body: JSON.stringify(payload) }); },
  loginUser: function(email, password) { return apiFetch('/api/login', { method: 'POST', body: JSON.stringify({ email: email, password: password }) }); },
  getUsers: function() { return apiFetch('/api/users'); },
  getAccessHistory: function() { return apiFetch('/api/access-history'); },
  createAccessEvent: function(evt) { return apiFetch('/api/access-events', { method: 'POST', body: JSON.stringify(evt) }); },
  getIncidents: function() { return apiFetch('/api/incidents'); },
  assignIncident: function(id, payload) { return apiFetch('/api/incidents/' + id + '/assign', { method: 'POST', body: JSON.stringify(payload) }); },
  closeIncident: function(id) { return apiFetch('/api/incidents/' + id + '/close', { method: 'POST' }); }
};
