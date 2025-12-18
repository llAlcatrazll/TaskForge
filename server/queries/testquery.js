const ANIME_QUERY = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
      genres
  }
}
`;

export default ANIME_QUERY;
