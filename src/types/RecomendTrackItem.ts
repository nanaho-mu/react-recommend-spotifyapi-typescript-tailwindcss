export type RecomendTrackItem = {
  album: { href: string;
          name: string;
          images: { url: string; width: number; }[];
        };
  artists: { name: "string";
             id: "string";
             }[];
  // href: string;
  id: string;
  name: string;
  uri: string;
  preview_url?: string;

}