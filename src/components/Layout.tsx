import React, { useState, useEffect } from "react";
import {
  FileSearchOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Select } from "antd";
import SearchBar from "./SearchBar.tsx";
const { Header, Sider, Content } = Layout;

import { Footer } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import { Outlet, useNavigate, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import pageApi from "../api/pageApi.ts";
import useDocumentTitle from "../hooks/useDocumentTitle.tsx";

const LayoutWeb: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const { key } = useParams();
  useEffect(() => {
    async function get() {
      if (key) {
        const content = await pageApi.getPageTitle(t("lang"), key);
        setTitle(content);
      }
    }
    get();
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  useDocumentTitle(title);
  const navigate = useNavigate();
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Sider trigger={null} hidden={!hidden}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: t("home"),
              onClick: () => navigate("/"),
            },
            {
              key: "2",
              icon: <StarOutlined />,
              label: t("selective content"),
              onClick: () => navigate("/contents/post"),
            },
            {
              key: "3",
              icon: <FileSearchOutlined />,
              label: t("random article"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              height: 64,
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={hidden ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setHidden(!hidden)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Link
              to={"/"}
              style={{
                height: 64,
                fontWeight: "bold",
                fontSize: 20,
                lineHeight: 28,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                color: "black",
              }}
            >
              <img style={{ height: 32, width: 32 }} /> VIKIPEDIA
            </Link>
            <SearchBar />
          </div>
          <div
            style={{
              display: "flex",
              marginRight: "2.5rem",
              flexDirection: "row",
              gap: "0.75rem",
              alignItems: "center",
              height: "4rem",
            }}
          >
            <Select
              defaultValue={"vi"}
              style={{ width: 120 }}
              onChange={changeLanguage}
              suffixIcon={<ZhihuOutlined />}
            >
              <Option value={"vi"}>Tiếng Việt</Option>
              <Option value={"en"}>English</Option>
              <Option value={"ja"}>日本語</Option>
              <Option value={"zh"}>中文</Option>
              <Option value={"ko"}>한국어</Option>
            </Select>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <Button style={{ backgroundColor: "#10B981", color: "white" }}>
                  <Link to={"/register"}>{t("register")}</Link>
                </Button>
                <Button style={{ backgroundColor: "#3B82F6", color: "white" }}>
                  <Link to={"/login"}>{t("login")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Header>
        {/* <Watermark content="VIKIPEDIA" zIndex={1}> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            width: "100%",
            background: colorBgContainer,
            zIndex: 9,
            minHeight: 768,
          }}
        >
          <div
            style={{
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h1 style={{ fontWeight: "bolder", marginLeft: 200 }}>{title}</h1>
            <Outlet />
          </div>
        </Content>
        {/* </Watermark> */}
        <Footer
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          Vikipedia ©2023 {t("createdBy")} TDN
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutWeb;
