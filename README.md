# タイトル
Recommend By Tune With Spotify
# 概要
アーティスト検索からそのアーティストに基づいたレコメンドトラックとその楽曲の特徴量をSpotify Apiから取得し、曲調ごとに表示してくれるWebアプリ
<br>
react-recommend-spotifyapiをJavascript->Typescript, Bootstrap->tailwindcssで書き直しました。
# URL
https://react-recommend-spotifyapi-typescript-tailwindcss-cxo6fyskr.vercel.app/
> note
> <br>
> 2021/05/27における、Spotify Apiのプラットフォームの変更により、新しいアプリは「開発モード」になり、ユーザーが25人以下の場合アクセスが制限されます 。そのため、現状ユーザーが本アプリにアクセスするには、開発者がダッシュボードにおいて、ユーザーの名前とメールアドレスを追加する必要があります。
> <br />
> (ユーザ数が25人以上になった場合、Spotifyに制限を解除するレビューをリクエストすることができます。)
> <br />
> <br />
> URL:https://developer.spotify.com/community/news/2021/05/27/improving-the-developer-and-user-experience-for-third-party-apps/

# GIF
![RecommendByTune](https://user-images.githubusercontent.com/72216137/166636649-4ef0c8ee-1041-42e6-858d-dc5725daff8b.gif)

# 使用技術
- Typescript
- React
- Spotify Api
- tailwindcss

# 目指した課題解決
既存の音楽配信アプリでは、全ユーザで共通した、曲調ごとのプレイリストしか存在しない。そこで、ユーザ個々人の嗜好を反映した上で、曲調ごとに分類して楽曲を表示する機能を実装した。
# 機能一覧
- login機能
- logout機能
- アーティスト検索による、そのアーティストの周辺曲のレコメンド
- happy, sad, emoの曲調ごとに表示してくれる機能
- preview musicを聴ける

