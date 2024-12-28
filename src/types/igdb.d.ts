enum Category {}

enum Status {}

declare type Game = {
  id: number;
  age_ratings?: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names?: number[];
  artworks?: number[];
  bundles?: number[];
  category?: Category;
  checksum?: string;
  collection?: number;
  collections?: number[];
  cover: number;
  created_at: string;
  dlcs?: number[];
  expanded_games?: number[];
  expansions?: number[];
  external_games?: number[];
  first_release_date: string[];
  follows?: number;
  forks?: number[];
  franchise?: number;
  franchises?: number[];
  game_engines?: number[];
  game_localizations?: number[];
  game_modes?: number[];
  genres?: number[];
  hypes?: number;
  involved_companies?: number[];
  keywords?: number[];
  language_supports?: number[];
  multiplayer_modes?: number[];
  name: string;
  parent_game?: number;
  platforms?: number[];
  player_perspectives?: number[];
  ports?: number[];
  rating?: number;
  rating_count?: number;
  release_dates: number[];
  remakes?: number[];
  remasters?: number[];
  screenshots?: number[];
  similar_games?: number[];
  slug?: string;
  standalone_expansions?: number[];
  status?: Status;
  storyline?: string;
  summary?: string;
  tags?: number[];
  themes?: number[];
  total_rating?: number;
  total_rating_count?: number;
  updated_at?: number;
  url?: string;
  version_parent?: number;
  version_title?: string;
  videos?: number[];
  websites?: number[];
};

declare type Cover = {
  id: number;
  url: string;
  game?: number;
  width: number;
  height: number;
  image_id: string;
  alpha_channel: boolean;
  animated: boolean;
};
