type IgdbID = number;

enum Category {}

enum Status {}

declare type Game = {
  id: IgdbID;
  age_ratings?: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names?: number[];
  artworks?: IgdbID[];
  bundles?: IgdbID[];
  category?: Category;
  checksum?: string;
  collection?: IgdbID;
  collections?: IgdbID[];
  cover: IgdbID;
  created_at: EpochTimeStamp;
  dlcs?: IgdbID[];
  expanded_games?: IgdbID[];
  expansions?: IgdbID[];
  external_games?: IgdbID[];
  first_release_date: EpochTimeStamp;
  follows?: IgdbID;
  forks?: IgdbID[];
  franchise: IgdbID;
  franchises: IgdbID[];
  game_engines?: IgdbID[];
  game_localizations?: IgdbID[];
  game_modes?: IgdbID[];
  genres?: IgdbID[];
  hypes?: number;
  involved_companies?: IgdbID[];
  keywords?: IgdbID[];
  language_supports?: IgdbID[];
  multiplayer_modes?: IgdbID[];
  name: string;
  parent_game?: IgdbID;
  platforms: IgdbID[];
  player_perspectives?: IgdbID[];
  ports?: IgdbID[];
  rating?: number;
  rating_count?: number;
  release_dates: EpochTimeStamp[];
  remakes?: IgdbID[];
  remasters?: IgdbID[];
  screenshots?: IgdbID[];
  similar_games?: IgdbID[];
  slug?: string;
  standalone_expansions?: IgdbID[];
  status?: Status;
  storyline?: string;
  summary?: string;
  tags?: IgdbID[];
  themes?: IgdbID[];
  total_rating: number;
  total_rating_count: number;
  updated_at?: EpochTimeStamp;
  url: string;
  version_parent?: IgdbID;
  version_title?: string;
  videos?: IgdbID[];
  websites?: IgdbID[];
};

declare type Cover = {
  id: IgdbID;
  url: string;
  game?: IgdbID;
  width: number;
  height: number;
  image_id: string;
  alpha_channel: boolean;
  animated: boolean;
};

declare type Platform = {
  id: IgdbID;
  abbreviation: string;
  alternative_name: string;
  category: string;
  checksum: string;
  created_at: EpochTimeStamp;
  generation: number;
  name: string;
  platform_family: IgdbID;
  platform_logo: IgdbID;
  slug: string;
  summary: string;
  updated_at: EpochTimeStamp;
  url: string;
  versions: IgdbID[];
  websites: IgdbID[];
};

declare type Genre = {
  id: IgdbID;
  checksum?: string;
  created_at: EpochTimeStamp;
  name: string;
  slug: string;
  updated_at: EpochTimeStamp;
  url: string;
};

declare type GameVideo = {
  id: IgdbID;
  checksum?: string;
  game: IgdbID;
  name: string;
  video_id: string;
};

declare type GameMode = {
  id: IgdbID;
  checksum?: string;
  created_at: EpochTimeStamp;
  name: string;
  slug: string;
  updated_at: EpochTimeStamp;
  url: string;
};

declare type Screenshot = {
  id: IgdbID;
  alpha_channel: boolean;
  animated: boolean;
  checksum: string;
  game: IgdbID;
  height: number;
  image_id: string;
  url: string;
  width: number;
};

declare type InvolvedCompany = {
  id: IgdbID;
  checksum: string;
  company: IgdbID;
  created_at: EpochTimestamp;
  developer: boolean;
  game: IgdbID;
  porting: boolean;
  publisher: boolean;
  supporting: boolean;
  updated_at: EpochTimestamp;
};

declare type Company = {
  id: IgdbID;
  change_date: EpochTimeStamp;
  change_date_category: number;
  changed_company_id: number;
  checksum: string;
  country: number;
  created_at: EpochTimeStamp;
  description: string;
  developed: IgdbID[];
  logo: IgdbID;
  name: string;
  parent: IgdbID;
  published: IgdbID[];
  slug: string;
  start_date: EpochTimeStamp;
  start_date_category: number;
  updated_at: EpochTimeStamp;
  url: string;
  websites: IgdbID[];
};

declare type Franchise = {
  id: IgdbID;
  checksum: string;
  created_at: EpochTimeStamp;
  games: IgdbID[];
  name: string;
  slug: string;
  updated_at: EpochTimeStamp;
  url: string;
};

declare type LanguageSupport = {
  id: IgdbID;
  checksum: string;
  created_at: EpochTimeStamp;
  game: IgdbID;
  language: IgdbID;
  language_support_type: IgdbID;
  updated_at: EpochTimeStamp;
};

declare type Language = {
  id: IgdbID;
  checksum: string;
  created_at: EpochTimeStamp;
  locale: string;
  name: string;
  native_name: string;
  updated_at: EpochTimeStamp;
};
