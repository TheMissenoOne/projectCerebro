/**
 * X-MEN TTRPG - Cache Module
 * localStorage caching with TTL and memory fallback
 */

(function() {
  var PREFIX = 'xc_';
  var DEFAULT_TTL = 120000;

  var memoryCache = {};

  function getStorageKey(type, id) {
    return PREFIX + type + '_' + id;
  }

  function isExpired(item) {
    if (!item || !item.ts) return true;
    return Date.now() - item.ts > (item.ttl || DEFAULT_TTL);
  }

  window.cache = {
get: function(type, id) {
      var key = getStorageKey(type, id);
      var mem = memoryCache[key];
      if (mem && !isExpired(mem)) return mem.val;

      try {
        var stored = localStorage.getItem(key);
        if (!stored) return null;
        var item = JSON.parse(stored);
        if (isExpired(item)) {
          localStorage.removeItem(key);
          return null;
        }
        memoryCache[key] = item;
        return item.val;
      } catch (e) {
        console.warn('[cache] get error:', e);
        return null;
      }
    },

    set: function(type, id, val, ttl) {
      var key = getStorageKey(type, id);
      var item = { val: val, ts: Date.now(), ttl: ttl || DEFAULT_TTL };
      memoryCache[key] = item;
      try {
        localStorage.setItem(key, JSON.stringify(item));
      } catch (e) {
        console.warn('[cache] set error:', e);
      }
    },

    set: function(type, id, val, ttl) {
      var key = getStorageKey(type, id);
      var item = { val: val, ts: Date.now(), ttl: ttl || DEFAULT_TTL };
      memoryCache[key] = item;
      try {
        localStorage.setItem(key, JSON.stringify(item));
      } catch (e) {
        console.warn('[cache] set error:', e);
      }
    },

    invalidate: function(type, id) {
      var key = getStorageKey(type, id);
      delete memoryCache[key];
      localStorage.removeItem(key);
    },

    invalidatePattern: function(pattern) {
      Object.keys(memoryCache).forEach(function(k) {
        if (k.indexOf(PREFIX + pattern) === 0) delete memoryCache[k];
      });
      var i = localStorage.length;
      while (i--) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX + pattern) === 0) localStorage.removeItem(k);
      }
    },

    clear: function() {
      memoryCache = {};
      var i = localStorage.length;
      while (i--) {
        var k = localStorage.key(i);
        if (k && k.indexOf(PREFIX) === 0) localStorage.removeItem(k);
      }
    }
  };
})();