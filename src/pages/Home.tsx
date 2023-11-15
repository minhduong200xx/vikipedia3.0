import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import pageApi from "../api/pageApi";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const [data, setData] = useState<string>("");
  // const [anchor, setAnchor] = useState<
  //   {
  //     key: number;
  //     href: string;
  //     title: string;
  //   }[]
  // >();
  const { t } = useTranslation();
  console.log(t("lang"));

  useEffect(() => {
    async function get() {
      if (t("home")) {
        const content = await pageApi.getHtmlPage(t("lang"), t("home"));
        setData(content);
        const baseElement = document.querySelector("base");
        if (baseElement) {
          baseElement.removeAttribute("href");
          baseElement.setAttribute("href", "/page/");
        }
        // const h2List = document.querySelectorAll("h2");
        const viki = document.getElementsByTagName("h1");
        const vikiArray = Array.from(viki);
        vikiArray.forEach((element) => element.remove());
        const header = document.getElementsByClassName("main-header__left");
        const dl = Array.from(header);
        dl.forEach((element) => element.remove());
        console.log(viki);
        // const anchor = Array.from(h2List).map((item, index) => {
        //   const id = item.id;
        //   const innerText = item.innerText;
        //   return { key: index, href: `#${id}`, title: innerText };
        // });
        // setAnchor(anchor);
      }
    }
    get();
  }, [data, t]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 70,
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: data }} style={{}} />
    </div>
  );
};
export default Home;
