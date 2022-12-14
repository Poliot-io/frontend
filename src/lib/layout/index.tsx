import Sidebar from "lib/components/Sidebar";
import type { ReactNode } from "react";

import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Sidebar>
      <Meta />
      {children}
    </Sidebar>
  );
};

export default Layout;
