import React, { useEffect, useState } from "react";
import { Empty, Image, List, Popover } from "antd";
import useDebounce from "../hooks/useDebounce";
import searchApi from "../api/searchApi";
import useClickOutside from "../hooks/useClickOutside";
import { useNavigate, Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import AutoCompleteSearch from "../types/types";
import { useTranslation } from "react-i18next";
export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const { show, setShow, nodeRef } = useClickOutside();
  //   const pages = useGetAllPage();
  const [data, setData] = useState<AutoCompleteSearch[]>();
  const onChange = (value: string) => {
    setSearch(value);
  };
  const { t, i18n } = useTranslation();
  const searchDebounce = useDebounce(search, 1000);
  useEffect(() => {
    async function fetch() {
      if (searchDebounce) {
        const result = await searchApi.fetchSearchAutoComplete(
          t("lang"),
          searchDebounce
        );
        setData(result);
        setShow(!show);
      }
    }
    fetch();
  }, [searchDebounce]);
  const onSearch = (value: string) => {
    navigate(`/pages/${value}`);
  };

  const content =
    data && data.length > 0 ? (
      <List
        itemLayout="horizontal"
        dataSource={data}
        size={"small"}
        style={{ width: 350 }}
        renderItem={(i) => (
          <Link to={`/page/${i.key}`}>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    height={60}
                    width={80}
                    preview={false}
                    src={i.thumbnail.url}
                  />
                }
                title={<b>{i.title}</b>}
                description={i?.description}
              />
            </List.Item>
          </Link>
        )}
      />
    ) : (
      <Empty style={{ width: 400 }} />
    );

  return (
    <div
      style={{ width: "fit-content", display: "flex", flexDirection: "column" }}
    >
      <Search
        placeholder={t("search")}
        enterButton
        className="bg-gray-300 rounded-lg"
        style={{ width: 400 }}
        loading={false}
        onSearch={onSearch}
        onChange={(e) => onChange(e.target.value)}
      ></Search>
      <div
        className="bg-gray-300 rounded-lg"
        style={{ width: 500, overflowY: "scroll" }}
      >
        <Popover
          content={content}
          open={show}
          ref={nodeRef}
          style={{ height: 300 }}
          onOpenChange={() => setShow(!show)}
          placement={"bottomLeft"}
        ></Popover>
      </div>
    </div>
  );
};
export default SearchBar;
