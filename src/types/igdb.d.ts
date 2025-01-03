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
  created_at: EpochTimeStamp;
  dlcs?: number[];
  expanded_games?: number[];
  expansions?: number[];
  external_games?: number[];
  first_release_date: EpochTimeStamp;
  follows?: number;
  forks?: number[];
  franchise: number;
  franchises: number[];
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
  platforms: number[];
  player_perspectives?: number[];
  ports?: number[];
  rating?: number;
  rating_count?: number;
  release_dates: EpochTimeStamp[];
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
  total_rating: number;
  total_rating_count: number;
  updated_at?: EpochTimeStamp;
  url: string;
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

declare type Platform = {
  abbreviation: string;
  alternative_name: string;
  category: string;
  checksum: string;
  created_at: EpochTimeStamp;
  generation: number;
  name: string;
  platform_family: number;
  platform_logo: number;
  slug: string;
  summary: string;
  updated_at: EpochTimeStamp;
  url: string;
  versions: number[];
  websites: number[];
};

declare type Genre = {
  checksum?: string;
  created_at: EpochTimeStamp;
  name: string;
  slug: string;
  updated_at: EpochTimeStamp;
  url: string;
};

declare type GameVideo = {
  checksum?: string;
  game: number;
  name: string;
  video_id: string;
};

declare type GameMode = {
  checksum?: string;
  created_at: EpochTimeStamp;
  name: string;
  slug: string;
  updated_at: EpochTimeStamp;
  url: string;
};

declare type Screenshot = {
  alpha_channel: boolean;
  animated: boolean;
  checksum: string;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
};

declare type InvolvedCompany = {
  checksum: number;
  company: number;
  created_at: EpochTimestamp;
  developer: boolean;
  game: number;
  porting: boolean;
  publisher: boolean;
  supporting: boolean;
  updated_at: EpochTimestamp;
};

declare type Company = {
  change_date: EpochTimeStamp;
  change_date_category: number;
  changed_company_id: number;
  checksum: string;
  country: number;
  created_at: EpochTimeStamp;
  description: string;
  developed: number[];
  logo: number;
  name: string;
  parent: number;
  published: number[];
  slug: string;
  start_date: EpochTimeStamp;
  start_date_category: number;
  updated_at: EpochTimeStamp;
  url: string;
  websites: number[];
};

declare type Franchise = {
  checksum: string;
  created_at: EpochTimeStamp;
  games: number[];
  name: string;
  slug: string;
  updated_at: EpochTimeStamp;
  url: string;
};
