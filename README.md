＋Message
==================
Salesforce1でChatterメッセージを利用するためのアプリケーション

はじめに
--------
これまでSalesforce1でChatterメッセージを利用できないことで、社員間のメッセージングがLINEなどのコンシューマ向けサービスなどのシャドーITで行われ、セキュリティリスクになっていました。

＋Messageは、Salesforce1でChatterメッセージを利用できるようにするためのアプリケーションであり、シャドーITによるセキュリティリスクを緩和します。加えて、メッセージングも含めてSalesforce1上で完結できるようになり、ユーザとしての利便性も向上します。

+Messageを利用することで、メンバーとやりとりしている会話一覧を表示し、会話中でやりとりしているメッセージを手軽に見たり、メッセージを投稿したりすることができます。新たに会話を始める場合、宛先となるメンバーをリスト中からタップして選ぶことができます。


デモンストレーション
--------
* [動画](https://www.youtube.com/watch?v=yWpZnFTSmZM)
* [非管理パッケージ](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t10000000Fc2v)
* [管理パッケージ](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t10000000Fc2w)


インストール方法
--------
1. ソースコードを組織にデプロイします。
1. [設定]>[管理]>[トランスレーションワークベンチ]>[翻訳設定]で言語=「日本語」を有効にします。
1. [設定]>[管理]>[モバイル管理]>[モバイルナビゲーション]で「メッセージ」をナビゲーションメニュー項目に追加します。

※ ユーザの言語を「日本語」以外に設定することで英語表示に切り替わります。


アーキテクチャ
--------
Salesforce1で動作するHTML5アプリケーションです。
画面はVisualforceで実装し、JavaScript Remoting経由でChatter in Apexを呼び出しています。

利用している主なライブラリは以下のとおりです。
* [AngularJS](http://angularjs.org/)
* [angular translate](https://github.com/angular-translate/angular-translate)
* [UI Bootstrap](http://angular-ui.github.io/bootstrap/)
* [Bootstrap](http://getbootstrap.com/)
* [jQuery](http://jquery.com/)

利用しているツールは以下のとおりです。
* [Ant](http://ant.apache.org/)
* [Sass](http://sass-lang.com/)
* [Compass](http://compass-style.org/)


ライセンス
--------
Copyright &copy; 2014 Akira.Kuratani.

[MIT License](http://www.opensource.org/licenses/mit-license.php)