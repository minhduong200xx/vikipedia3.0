import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pageApi from "../api/pageApi";
import { useTranslation } from "react-i18next";

const PageDetail: React.FC = () => {
  const { key } = useParams();
  const [data, setData] = useState<string>("");
  const [anchor, setAnchor] = useState<
    {
      key: number;
      href: string;
      title: string;
    }[]
  >();
  const { t, i18n } = useTranslation(["home", "layout"]);
  useEffect(() => {
    async function get() {
      if (key) {
        const content = await pageApi.getHtmlPage(t("lang"), key);
        setData(content);
        const baseElement = document.querySelector("base");
        if (baseElement) {
          baseElement.removeAttribute("href");
        }
        const h2List = document.querySelectorAll("h2");
        const anchor = Array.from(h2List).map((item, index) => {
          const id = item.id;
          const innerText = item.innerText;
          return { key: index, href: `#${id}`, title: innerText };
        });
        setAnchor(anchor);
      }
    }
    get();
  }, [data, key, t]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 70,
      }}
    >
      <ul style={{}}>
        <b>{t("category", { ns: "home" })}</b>
        {anchor?.map((item) => (
          <li>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: data }} style={{}} />
    </div>
  );
};
export default PageDetail;
