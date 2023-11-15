import axios from "axios";
const config = {
  maxBodyLength: Infinity,
  headers: {
    Cookie:
      "GeoIP=VN:HN:Hanoi:21.03:105.85:v4; WMF-Last-Access-Global=15-Nov-2023; NetworkProbeLimit=0.001; WMF-Last-Access=15-Nov-2023",
    "Api-User-Agent":
      "MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)",
  },
};
function fetchSearhResult(language: string, key: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/search/page?q=${key}&limit=1`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function fetchSearhPage(language: string, key: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/search/page?q=${key}&limit=20`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function fetchSearchAutoComplete(language: string, key: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/search/title?q=${key}&limit=6`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data.pages)
    .catch((error) => console.log(error));
}
export default { fetchSearchAutoComplete, fetchSearhPage, fetchSearhResult };
