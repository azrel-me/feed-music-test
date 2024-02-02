import ScrollPage from "@/components/ScrollPage";

const sleep = async () => {
  return await new Promise((resolve) => setTimeout(resolve, 2000));
};

export const dynamic = "force-dynamic";

export default async function Home() {
  await sleep();

  return (
    <>
      <ScrollPage />
    </>
  );
}
