import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The requested page could not be found.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "The requested page could not be found.",
    url: "https://notehub.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub page not found",
      },
    ],
  },
};

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
