'use strict';

msgapp.factory('messageService', function () {
	var namespace = '';
	return {
		getConversations: function (callbackSuccess, callbackFailure) {
			Visualforce.remoting.Manager.invokeAction(
				(namespace!='' ? namespace + '.' : '') + 'PlusMessageCtrl.getConversations', 
				function(result, event) {
					if (event.status) {
						callbackSuccess(JSON.parse(result));
					} else {
						callbackFailure(event);
					}
				}, 
				{ escape: false }
			);
		},
		getConversation: function (id, callbackSuccess, callbackFailure) {
			Visualforce.remoting.Manager.invokeAction(
				(namespace!='' ? namespace + '.' : '') + 'PlusMessageCtrl.getConversation',
				id,
				function(result, event) {
					if (event.status) {
						callbackSuccess(JSON.parse(result));
					} else {
						callbackFailure(event);
					}
				}, 
				{ escape: false }
			);
		},
		sendMessage: function (text, recipients, callbackSuccess, callbackFailure) {
			Visualforce.remoting.Manager.invokeAction(
				(namespace!='' ? namespace + '.' : '') + 'PlusMessageCtrl.sendMessage',
				text,
				recipients,
				function(result, event) {
					if (event.status) {
						callbackSuccess(JSON.parse(result));
					} else {
						callbackFailure(event);
					}
				}, 
				{ escape: false }
			);
		},
		replyToMessage: function (text, inReplyTo, callbackSuccess, callbackFailure) {
			Visualforce.remoting.Manager.invokeAction(
				(namespace!='' ? namespace + '.' : '') + 'PlusMessageCtrl.replyToMessage',
				text,
				inReplyTo,
				function(result, event) {
					if (event.status) {
						callbackSuccess(JSON.parse(result));
					} else {
						callbackFailure(event);
					}
				}, 
				{ escape: false }
			);
		},
		searchUsers: function(query, callbackSuccess, callbackFailure) {
			if(query != null && query.length >= 2) {
				Visualforce.remoting.Manager.invokeAction(
					(namespace!='' ? namespace + '.' : '') + 'PlusMessageCtrl.searchUsers',
					query,
					function(result, event) {
						if (event.status) {
							callbackSuccess(JSON.parse(result));
						} else {
							callbackFailure(event);
						}
					}, 
					{ escape: false }
				);
			} else if(query == null || query.length == 0) {
				Visualforce.remoting.Manager.invokeAction(
					(namespace!='' ? namespace + '.' : '') + 'PlusMessageCtrl.getUsers',
					function(result, event) {
						if (event.status) {
							callbackSuccess(JSON.parse(result));
						} else {
							callbackFailure(event);
						}
					}, 
					{ escape: false }
				);
			} 
		}
	};
});

msgapp.factory('messageUtil', function () {
	return {
		filterConversations: function(convs) {
			for (var i=0; i<convs.conversations.length; i++) {
				convs.conversations[i].latestMessage.sentDate =
					convs.conversations[i].latestMessage.sentDate
						.replace(/-/g, "/")
						.replace('T', ' ')
						.substring(0, 16);
			}
			return convs;
		},
		filterMessage: function(userId, msg) {
			if(msg.sender.id == userId) {
				msg.msgClass = 'my';
				msg.isMine = true;
			} else {
				msg.msgClass = 'other';
				msg.isMine = false;
			}
			var utc = new Date(
				msg.sentDate
					.replace(/-/g, "/")
					.replace('T', ' ')
					.substring(0, 19) + ' GMT+0000');
			msg.sentDate =
					utc.getFullYear() + '/' +
					('0' + (utc.getMonth() + 1)).slice(-2) + '/' +
					('0' + utc.getDate()).slice(-2) + ' ' +
					('0' + utc.getHours()).slice(-2) + ':' +
					('0' + utc.getMinutes()).slice(-2) + ':' +
					('0' + utc.getSeconds()).slice(-2);
			return msg;
		},
		filterMessages: function(userId, msgs) {
			for (var i=0; i<msgs.messages.messages.length; i++) {
				if(msgs.messages.messages[i].sender.id == userId) {
					msgs.messages.messages[i].msgClass = 'my';
					msgs.messages.messages[i].isMine = true;
				} else {
					msgs.messages.messages[i].msgClass = 'other';
					msgs.messages.messages[i].isMine = false;
				}
				var utc = new Date(
					msgs.messages.messages[i].sentDate
						.replace(/-/g, "/")
						.replace('T', ' ')
						.substring(0, 19) + ' GMT+0000');
				msgs.messages.messages[i].sentDate =
					utc.getFullYear() + '/' +
					('0' + (utc.getMonth() + 1)).slice(-2) + '/' +
					('0' + utc.getDate()).slice(-2) + ' ' +
					('0' + utc.getHours()).slice(-2) + ':' +
					('0' + utc.getMinutes()).slice(-2) + ':' +
					('0' + utc.getSeconds()).slice(-2);
			}
			return msgs;
		},
		filterUsers: function(srcList, excludeList) {
			for(var i=0; i<excludeList.length; i++) {
				for(var j=0; j<srcList.length; j++) {
					if(excludeList[i] == srcList[j].id) {
						srcList.splice(j, 1);
						break;
					}
				}
			}
			return srcList;
		}
	};
});