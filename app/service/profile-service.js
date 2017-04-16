'use strict';

module.exports = ['$q', '$log', '$http', 'authService', profileService];

function profileService($q, $log, $http, authService) {
  $log.debug('profileService');

  let service = {};
  service.profiles = [];

  service.createProfile = function(profile) {
    $log.debug('profileService.createProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, profile, config);
    })
    .then( res => {
      $log.log('profile created');
      let profile = res.data;
      service.profiles.unshift(profile);
      return profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchProfile = function() {
    $log.debug('profileService.fetchProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${userID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('Profile Retrieved');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchProfiles = function() {
    $log.debug('profileService.fetchProfiles');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/allprofiles`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('All profiles retrieved.');
      service.profiles = res.data;
      return service.profiles;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.editProfile = function() {
    $log.debug('profileService.editProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${userID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.post(url, config);
    })
    .then( res => {
      $log.log('Profile edited successfully.');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteProfile = function() {
    $log.debug('profileService.deleteProfile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${userID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('Profile deleted.');
      service.profile = res.data;
      return service.profile;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
};
