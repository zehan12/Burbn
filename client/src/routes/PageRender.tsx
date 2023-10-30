import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {NotFound} from "../pages";

const generatePage = async (pageName: string) => {
  const component = () => import(`../pages/${pageName}`).then(module => ({ default: module.default }));
  const renderChild = await component();
  return renderChild.default;
};

const PageRender: React.FC = () => {
  const { page, id } = useParams<{ page: string; id?: string }>();
  const auth = { token: true };

  let pageName = "";

  if (auth?.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  const [pageComponent, setPageComponent] = useState<ReactElement | null>(null);

  useEffect(() => {
    generatePage(pageName)
      .then(component => {
        setPageComponent(React.createElement(component));
      })
      .catch(() => {
        // Handle errors here
        setPageComponent(<NotFound />);
      });
  }, [pageName]);

  return <>{pageComponent}</>;
};

export default PageRender;
