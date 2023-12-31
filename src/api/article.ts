// /* eslint-disable no-console */
// import axios from "axios";
// import Article from "../models/article";
// const headers = {};
// function fetchMedia(language: string, title) {
//   const api = `https://vi.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(
//     title
//   )}`;
//   return axios.get(api).then((response) => response.data);
// }

// function fetchLanguages(language, title) {
//   const api = `//vi.wikipedia.org/w/rest.php/v1/page/${encodeURIComponent(
//     title
//   )}/links/language`;
//   return axios.get(api, { headers }).then((response) => {
//     return response.data || [];
//   });
// }

// function fetchRevisions(language, title) {
//   const api = `//vi.wikipedia.org/w/rest.php/v1/page/${encodeURIComponent(
//     title
//   )}/history`;
//   return axios.get(api, { headers }).then((response) => {
//     return response.data?.revisions || [];
//   });
// }

// async function fetchArticle(language, title) {
//   if (!language) {
//     throw new Error("Language is null");
//   }
//   let api;
//   if (title) {
//     api = `https://vi.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(
//       title
//     )}`;
//   } else {
//     api = `https://vi.wikipedia.org/api/rest_v1/page/random/mobile-sections`;
//   }
//   const [articleData, revisions, media, languages] = await Promise.all([
//     axios.get(api, { headers }).then((response) => response.data),
//     fetchRevisions(language, title),
//     fetchMedia(language, title),
//     fetchLanguages(language, title),
//   ]);

//   return new Article({
//     pageid: articleData.lead.id,
//     namespace: articleData.lead.ns,
//     title: articleData.lead.normalizedtitle,
//     description: articleData.lead.description,
//     image: articleData.lead.image,
//     issues: articleData.lead.issues,
//     geo: articleData.lead.geo,
//     pronunciation: articleData.lead.pronunciation,
//     languagecount: articleData.lead.languagecount,
//     wikidataId: articleData.lead.wikibase_item,
//     lastmodifier: articleData.lead.lastmodifier,
//     lastmodified: articleData.lead.lastmodified,
//     revision: articleData.lead.revision,
//     language,
//     revisions,
//     languages, //Format: [{"code":"af","name":"Afrikaans","key":"Jupiter","title":"Jupiter"}]
//     media: media.items,
//     _sections: [
//       ...articleData.lead.sections,
//       ...articleData.remaining.sections,
//     ],
//   });
// }

// export default { fetchArticle };
