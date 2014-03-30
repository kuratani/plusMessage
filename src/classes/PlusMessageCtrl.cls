public with sharing class PlusMessageCtrl {
	public String languageLocaleKey {
		set;
		get {
			if(languageLocaleKey == null) {
				languageLocaleKey = [select LanguageLocaleKey, LocaleSidKey from User where Id = :UserInfo.getUserId()].LanguageLocaleKey;
			}
			return languageLocaleKey;
		}
	}

	@RemoteAction
	public static String getConversation(String conversationId) {
		ConnectApi.ChatterConversation conv = ConnectApi.ChatterMessages.getConversation(conversationId);
		ConnectApi.ChatterMessages.markConversationRead(conversationId, true);
		return JSON.serialize(conv);
	}

	@RemoteAction
	public static String getConversations() {
		ConnectApi.ChatterConversationPage page = ConnectApi.ChatterMessages.getConversations();
		return JSON.serialize(page);
	}

	@RemoteAction
	public static String replyToMessage(String text, String inReplyTo) {
		ConnectApi.ChatterMessage msg = ConnectApi.ChatterMessages.replyToMessage(text, inReplyTo);
		return JSON.serialize(msg);
	}

	@RemoteAction
	public static String sendMessage(String text, String recipients) {
		ConnectApi.ChatterMessage msg = ConnectApi.ChatterMessages.sendMessage(text, recipients);
		return JSON.serialize(msg);
	}

	@RemoteAction
	public static String getUsers() {
        ConnectApi.UserPage users = ConnectApi.ChatterUsers.getUsers(null);
		return JSON.serialize(users);
	}

	@RemoteAction
	public static String searchUsers(String query) {
		ConnectApi.UserPage users = ConnectApi.ChatterUsers.searchUsers(null, query);
		return JSON.serialize(users);
	}
}