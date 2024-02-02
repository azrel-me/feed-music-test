import IconLogo from "@/components/icons/icon-logo.svg";

const Loading = () => {
  return (
    <div className="bg-primary fixed inset-0 text-white flex items-center justify-center animate-in fade-out-25 ">
      <span className="block w-20 delay-150 duration-300">
        <IconLogo />
      </span>
    </div>
  );
};

export default Loading;
