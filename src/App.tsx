
import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node"
import { RecommendSongs } from './RecommendSongs';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import { RecomendTrackItem } from "./types/RecomendTrackItem"
import { paramsType } from "./types/paramsType";
import { searchArtistsResponse } from "./types/searchArtistsResponse"


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})


function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"


  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

  const [token, setToken] = useState<string | null>("")
  const [search, setSearch] = useState<string>("")
  const [artists, setArtists] = useState<string>("")
  const [recommendHappyTrack, setRecommendHappyTrack] = useState<RecomendTrackItem[]>([])
  const [recommendDarkTrack, setRecommendDarkTrack] = useState<RecomendTrackItem[]>([])
  const [recommendEmoTrack, setRecommendEmoTrack] = useState<RecomendTrackItem[]>([])



  const paramsHappy: paramsType = {
    seed_artists: artists,
    min_valence: 0.8,
    max_valence: 1.0,
    min_danceability: 0.6,
    min_energy: 0.7,
    max_energy: 1.0,
    target_mode: 1,
    min_key: 1,
    max_key: 10,
  }
  const paramsSad: paramsType = {
    seed_artists: artists,
    max_valence: 0.3,
    min_valence: 0.0,
    min_danceability: 0.0,
    min_energy: 0.0,
    max_energy: 0.6,
    target_mode: 0,
    // min_key:7,
    // max_key:10,
  }
  const paramsEmo: paramsType = {
    seed_artists: artists,
    max_valence: 0.8,
    min_valence: 0.5,
    min_danceability: 0.5,
    min_energy: 0.3,
    max_energy: 0.7,
    // target_mode: 1,
    max_key: 11,
    min_key: 3,
  }


  useEffect(() => {
    const hash = window.location.hash
    // localStorageからデータを取得する,取得したいデータのkeyを指定して取り出せる
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      console.log(token)
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  useEffect(() => {
    if (!token) return
    spotifyApi.setAccessToken(token)
  }, [token])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get<searchArtistsResponse>("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: search,
        type: "artist"
      }
    })
    console.log(data)
    setArtists(data.artists.items[0].id)

  }
  // console.log(artists)

  return (
    <div className="App bg-black w-screen h-screen" >
      {/* <header className=""> */}
      <h1 className="text-green-700 text-center pt-10  pb-5 text-5xl font-bold">Recommend By Tune</h1>
      <h1 className="text-green-700 text-center text-5xl font-bold">With Spotify</h1>
      {!token ?
        <div className="m-5"><a className="flex m-auto my-52 w-48 place-content-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded" role="button" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
          "%20"
        )}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a></div>

        : <div className=""><button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex justify-center" type="button" onClick={logout}>Logout</button></div>}
      {/* </header> */}
      {token ?
        <>
          <form className="" onSubmit={searchArtists}>

            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style={{ width: "300px" }} placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type={"submit"} >Search</button>
          </form>
          <div className="flex bg-black w-screen h-screen">
            <div className="bg-black">
              <div className=" bg-black">
                <div className="bg-black m-8 my-10 py-10 w-screen h-screen flex justify-evenly content-evenly" style={{ overflowY: "auto" }}>
                  <RecommendSongs token={token} artists={artists} setRecommendTrack={setRecommendHappyTrack} recommendTrack={recommendHappyTrack} params={paramsHappy} type={"Happy"} />
                  <RecommendSongs token={token} artists={artists} setRecommendTrack={setRecommendDarkTrack}
                    recommendTrack={recommendDarkTrack} params={paramsSad} type={"Sad"} />
                  <RecommendSongs token={token} artists={artists} setRecommendTrack={setRecommendEmoTrack}
                    recommendTrack={recommendEmoTrack} params={paramsEmo} type={"Emo"} />

                </div>
              </div>
            </div>
          </div>
        </>
        : <h4 className="bg-black">Please login!</h4>}
    </div>
  )
}

export default App;
