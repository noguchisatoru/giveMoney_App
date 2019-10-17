# givemoneyapp

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

##実装内容
・ログイン機能
・ダッシュボードでは、自身のユーザ名とウォレット（残高）が表示
・ダッシュボードでは、自分以外の登録ユーザが一覧表示
・ユーザを選択し渡す通貨の量を入力後、投げ銭可能
・投げ銭後は即時にウォレットへ反映される
・ダッシュボードにログアウトボタン配置
・ログアウトボタン押下で、ログアウトされログイン画面へ遷移
・ログアウトされた状態でダッシュボードへアクセスすると、ログイン画面へリダイレクト

Nuxt.jsとFirebaseで実装
