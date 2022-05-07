import React, { useEffect, FC } from "react"
import ReactAudioPlayer from "react-audio-player"
import axios from "axios"

import { paramsType } from "./types/paramsType";
import { RecomendTrackItem } from "./types/RecomendTrackItem"

type SpotifyRecommendResponse = {
  tracks: RecomendTrackItem[];
}

type Props = {
  token: string;
  artists: string;
  setRecommendTrack: any;
  recommendTrack: RecomendTrackItem[];
  params: paramsType;
  type: string;
}


export const RecommendSongs: FC<Props> = (props) => {
  const { token, artists, setRecommendTrack, recommendTrack, params, type } = props
  useEffect(() => {
    /* 似ている曲を取得 START */
    axios.get<SpotifyRecommendResponse>(`https://api.spotify.com/v1/recommendations?limit=10&market=US`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        seed_artists: artists,
        max_valence: params.max_valence,
        min_valence: params.min_valence,
        min_danceability: params.min_danceability,
        min_energy: params.min_energy,
        max_energy: params.max_energy,
        target_mode: params.target_mode,
        max_key: params.max_key,
        min_key: params.min_key,
      },
    })
      .then((reaponse) => {
        // console.log(reaponse.data.tracks)
        setRecommendTrack(reaponse.data.tracks);
      })
      .catch((err) => {
        console.log("err:", err);
      });

  }, [artists, token]);

  return (
    <div className="text-gray-400 flex-row col" style={{ width: "100vw", height: "100vh" }}>
      <h2 className="text-green-800 text-3xl font-bold">{type} Songs</h2>
      {recommendTrack.map(({ id, artists, name, preview_url, album }) => (

        <div
          className="mt-10"
          key={id}
        >
          <div className="flex flex-row bd-highlight mt-5 mb-3 text-muted">

            <img src={album.images[1].url} style={{ height: "64px", width: "64px" }} alt="アルバム画像" />
            <div className="mx-4">
              <div className="text-gray-400">{artists[0].name}</div>
              <div className="text-gray-400">{name}</div>
            </div>
          </div>

          {preview_url
            ? <ReactAudioPlayer
              src={preview_url}
              controls
            />
            : <p>No preview music</p>}
        </div>
      ))}
    </div>
  )
}