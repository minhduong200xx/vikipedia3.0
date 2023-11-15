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
// function createPage(language: string, data: any) {
//   const endpoint = `https://en.wikipedia.org/w/rest.php/v1/page`;
//   const config = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer $TOKEN",
//   };
//   return axios.post(endpoint, data, config).then((response) => response);
// }
function fetchFeed(language: string) {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = ("0" + (today.getUTCMonth() + 1)).slice(-2);
  const date = ("0" + today.getUTCDate()).slice(-2);

  const endpoint = `https://${language}.wikipedia.org/api/rest_v1/feed/featured/${year}/${month}/${date}`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}
// function updatePage(language: string, data: any) {
//   const endpoint = `https://en.wikipedia.org/w/rest.php/v1/page/Wikipedia:Sandbox`;
//   const config = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer $TOKEN",
//   };
//   return axios
//     .put(endpoint, data, config)
//     .then((response) => response.data)
//     .catch((error) => console.log(error));
// }
function editSource(language: string, title: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/page/${title}`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function getHtmlPage(language: string, title: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/page/${title}/html`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
function getPageTitle(language: string, title: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/page/${title}/bare`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data.title)
    .catch((error) => console.log(error));
}
function getLangForPage(language: string, title: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/page/${title}/links/language`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getFileOnPage(language: string, title: string) {
  const endpoint = `https://${language}.wikipedia.org/w/rest.php/v1/page/${title}/links/media`;
  return axios
    .get(endpoint, config)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
export default {
  fetchFeed,
  // createPage,
  getFileOnPage,
  getHtmlPage,
  getLangForPage,
  editSource,
  // updatePage,
  getPageTitle,
};
