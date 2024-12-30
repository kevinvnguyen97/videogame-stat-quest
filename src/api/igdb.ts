const BASE_URL = "http://localhost:8080/http://api.igdb.com/v4";

export enum IGDBEndpoint {
  GAMES = "games",
  COVERS = "covers",
  PLATFORMS = "platforms",
}

export async function getIGDBRecords<T>(args: {
  endpoint: IGDBEndpoint;
  search?: string;
  ids?: number[];
}): Promise<T[]> {
  const { endpoint, search, ids = [] } = args;
  const url = `${BASE_URL}/${endpoint}${
    ids.length > 0 ? `/${ids.join(",")}` : ""
  }?fields=*${search ? `&search=${search}` : ""}`;
  const encodedUrl = encodeURI(url);
  const fetchRecords = await fetch(encodedUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
    },
  });
  const records = (await fetchRecords.json()) as T[];
  console.log("RECORDS:", records);
  return records;
}
