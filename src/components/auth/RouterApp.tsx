import Head from "next/head";
import router from "next/router";
import React, { ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useAuthData from "../../data/hook/useAuthData";

type RouterAppProps = {
  children: ReactNode;
};

const RouterApp: React.FunctionComponent<RouterAppProps> = ({ children }) => {
  const { loading, user } = useAuthData();

  const renderContent = () => {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie?.includes("admin-template-auth")) {window.location.href = '/authentication'}`,
            }}
          />
        </Head>
        {children}
      </>
    );
  };

  const renderLoadingContent = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#1abc9c" size={100} />
      </div>
    );
  };

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoadingContent();
  } else {
    router.push("/authentication");
    return null;
  }
};

export default RouterApp;
