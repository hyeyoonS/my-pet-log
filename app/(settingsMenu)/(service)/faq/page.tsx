import { NotionAPI } from "notion-client";
import Service from "@/components/Setting/Service";
import pageInfoMap from "@/components/Setting/Service/PageInfo";

const Page = async () => {
  const notion = new NotionAPI();

  const { pageId } = pageInfoMap.faq;
  const recordMap = await notion.getPage(pageId);

  return (
    <section>
      <Service pageType="faq" recordMap={recordMap} />
    </section>
  );
};

export default Page;