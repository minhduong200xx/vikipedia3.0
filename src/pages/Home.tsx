import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function stringToHtml(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.firstChild;
}
const Home: React.FC = () => {
  const { key } = useParams();
  const [data, setData] = useState<string>("");
  const [raw, setRaw] = useState<string>("");
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "GeoIP=VN:HN:Hanoi:21.03:105.85:v4; WMF-Last-Access-Global=15-Nov-2023; NetworkProbeLimit=0.001; WMF-Last-Access=15-Nov-2023"
    );

    fetch(`https://zh.wikipedia.org/w/rest.php/v1/page/${key}/html`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, [key]);
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/html");
  const bodyElement = doc.querySelector("body");
  useEffect(() => {
    if (bodyElement) {
      const bodyHtml = new XMLSerializer().serializeToString(bodyElement);
      console.log(bodyHtml);
      setRaw(bodyHtml);
      console.log(raw);
    }
  }, [data]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: raw }} />
    </div>
  );
};
export default Home;
