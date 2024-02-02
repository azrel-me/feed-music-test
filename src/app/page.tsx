import ScrollPage from "@/components/ScrollPage";

const loading = async () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

export default async function Home() {
  await loading();

  return (
    <>
      <ScrollPage />
    </>
  );
}
