import NextTopLoader from "nextjs-toploader";

import { APP_META_DATA } from "@/common/config/app-meta-data";
import Providers from "./(components)/_Providers";

import "../common/assets/css/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../common/assets/css/globals.css";
import "../common/assets/scss/global.scss";

export const metadata = {
  title: APP_META_DATA.title,
  description: APP_META_DATA.description,
  authors: APP_META_DATA.authors,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NextTopLoader height={5} showSpinner={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
