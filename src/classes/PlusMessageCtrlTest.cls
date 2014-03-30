@IsTest(SeeAllData=true)
private class PlusMessageCtrlTest {
	private static Profile prof = null;
	private static User userMain = null;
	private static List<User> userList = new List<User>();
	private static String recipients = null; 

	private static testMethod void testGetConversation() {
		init();

		ConnectApi.ChatterConversationPage page = null;

		System.runAs(userMain) {
			ConnectApi.ChatterMessages.sendMessage('test message', recipients);
			page = ConnectApi.ChatterMessages.getConversations();
			System.assert(page.conversations.size() > 0);
		}

		System.runAs(userList[0]) {
			ConnectApi.UnreadConversationCount cntPre = ConnectApi.ChatterMessages.getUnreadCount();
			String result = PlusMessageCtrl.getConversation(page.conversations[0].latestMessage.conversationId);
			System.assertNotEquals(result, null, result);
			System.assert(result.contains('test message'), result);

			ConnectApi.UnreadConversationCount cnt = ConnectApi.ChatterMessages.getUnreadCount();
			System.assertEquals(cntPre.unreadCount, cnt.unreadCount + 1, cnt);
		}
	}

	private static testMethod void testGetConversations() {
		init();
		
		System.runAs(userMain) {
			ConnectApi.ChatterMessages.sendMessage('test message', recipients);

			String result = PlusMessageCtrl.getConversations();
			System.assertNotEquals(result, null, result);
			System.assert(result.contains('test message'), result);
		}
	}

	private static testMethod void testSendMessage() {
		init();

		System.runAs(userMain) {
			String result = PlusMessageCtrl.sendMessage('test message', recipients);
			System.assertNotEquals(result, null, result);
			System.assert(result.contains('test message'), result);
			System.assertEquals(result.contains('Bob'), true, result);
			System.assertEquals(result.contains('Alan'), true, result);
			System.assertEquals(result.contains('Kate'), true, result);
		}
	}

	private static testMethod void testReplyToMessage() {
		init();

		System.runAs(userMain) {
			ConnectApi.ChatterMessages.sendMessage('test message', recipients);
			ConnectApi.ChatterConversationPage page = ConnectApi.ChatterMessages.getConversations();

			System.assert(page.conversations.size() > 0);
			String result = PlusMessageCtrl.replyToMessage('test reply', page.conversations[0].latestMessage.id);
			System.assertNotEquals(result, null, result);
			System.assertEquals(result.contains('test reply'), true, result);
		}
	}

	private static testMethod void testGetUsers() {
		init();

		System.runAs(userMain) {
			String result = PlusMessageCtrl.getUsers();
			System.assertNotEquals(result, null, result);
			System.assertEquals(result.contains('Bob'), true, result);
			System.assertEquals(result.contains('Alan'), true, result);
			System.assertEquals(result.contains('Kate'), true, result);
		}
	}

	private static testMethod void testSearchUsers() {
		init();

		System.runAs(userMain) {
			ConnectApi.UserPage dummy = ConnectApi.ChatterUsers.getUsers(null);
			for(Integer i=0; i<dummy.users.size(); i++) {
				if(!dummy.users[i].username.contains('plus-message-user02')) {
					dummy.users.remove(i--);
				}
			}

			ConnectApi.ChatterUsers.setTestSearchUsers(null, 'Bob', dummy);
			String result = PlusMessageCtrl.searchUsers('Bob');
			System.assertNotEquals(result, null, result);
			System.assertEquals(result.contains('Bob'), true, result);
			System.assertEquals(result.contains('Alan'), false, result);
			System.assertEquals(result.contains('Kate'), false, result);
		}
	}

	private static void init() {
		if(prof == null) {
			prof = [select id from profile where name='System Administrator' or name='システム管理者'];
		}

		userMain = new User(
					alias = 'pmu00',
					email='plus-message-user00@kuratani.github.io.test',
					emailencodingkey='UTF-8',
					lastname='Mark',
					firstname='Brown',
					languagelocalekey='ja',
					localesidkey='ja_JP',
					profileid = prof.id,
					timezonesidkey='Asia/Tokyo',
					username='plus-message-user00@kuratani.github.io.test');

		if(userList.size() == 0) {
			userList.add(new User(
					alias = 'pmu01',
					email='plus-message-user01@kuratani.github.io.test',
					emailencodingkey='UTF-8',
					lastname='Kei',
					firstname='Alan',
					languagelocalekey='ja',
					localesidkey='ja_JP',
					profileid = prof.id,
					timezonesidkey='Asia/Tokyo',
					username='plus-message-user01@kuratani.github.io.test'
				));
			userList.add(new User(
					alias = 'pmu02',
					email='plus-message-user02@kuratani.github.io.test',
					emailencodingkey='UTF-8',
					lastname='Smith',
					firstname='Bob',
					languagelocalekey='ja',
					localesidkey='ja_JP',
					profileid = prof.id,
					timezonesidkey='Asia/Tokyo',
					username='plus-message-user02@kuratani.github.io.test'
				));
			userList.add(new User(
					alias = 'pmu03',
					email='plus-message-user03@kuratani.github.io.test',
					emailencodingkey='UTF-8',
					lastname='Hudson',
					firstname='Kate',
					languagelocalekey='ja',
					localesidkey='ja_JP',
					profileid = prof.id,
					timezonesidkey='Asia/Tokyo',
					username='plus-message-user03@kuratani.github.io.test'
				));
		}
		insert userList;
		
		if(userList.size() > 0) {
			recipients = '' + userList[0].id;
			for(Integer i=1; i<userList.size(); i++) {
				recipients += ',' + userList[i].id;
			}
		}
	}

}