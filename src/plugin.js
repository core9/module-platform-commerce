angular.module( 'core9Dashboard.commerce', [
  'core9Dashboard.commerce.config',
  'templates-module-platform-commerce'
  ])

;

angular.module('core9Dashboard.admin.dashboard').requires.push('core9Dashboard.commerce');