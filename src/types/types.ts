interface AutoCompleteSearch {
  description: string | null;
  excerpt: string;
  id: number;
  key: string;
  matched_title: string | null;
  thumbnail: {
    mimetype: string;
    width: number;
    height: number;
    duration: null | string;
    url: string;
  };
  title: string;
}
export default AutoCompleteSearch;
