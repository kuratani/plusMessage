/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main ChatterMessage app module
 *
 * @type {angular.Module}
 */
var msgapp = angular.module('msgapp', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider.when('/', {
			controller: 'MessageCtrl',
			templateUrl: 'conversations.html'
		}).when('/send/', {
			controller: 'MessageCtrl',
			templateUrl: 'send-message.html'
		}).when('/:id', {
			controller: 'MessageCtrl',
			templateUrl: 'messages.html'
		}).otherwise({
			redirectTo: '/'
		});
	})
	.config(['$translateProvider', function ($translateProvider) {
		$translateProvider.translations('en_US', {
			MESSAGE: 'Message',
			MEMBER: 'Member',
			RECIPIENTS: 'Recipients',
			SEND: 'Send',
			CLOSE: 'Close',
			SENDING_MESSAGE: 'Sending...',
			NO_RECIPIENTS_MESSAGE: 'Add Recipients',
			NO_MATCH_USER_MESSAGE: 'No match user'
		});
		$translateProvider.translations('ja', {
			MESSAGE: 'メッセージ',
			MEMBER: 'メンバー',
			RECIPIENTS: '宛先',
			SEND: '投稿',
			CLOSE: '閉じる',
			SENDING_MESSAGE: '投稿中…',
			NO_RECIPIENTS_MESSAGE: '宛先を追加してください',
			NO_MATCH_USER_MESSAGE: '条件に一致するユーザが見つかりません'
		});
		$translateProvider.preferredLanguage('en_US');
	}]);