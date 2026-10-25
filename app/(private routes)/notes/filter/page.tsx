import { redirect } from "next/navigation";

const page = () => {
  redirect("/notes/filter/all");
};

export default page;
