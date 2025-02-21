// import { currentUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import OnboardingForm from "../components/OnBoardingForm";
import { getBoardIdForUser } from "@/app/actions/getBoardId";

const page = async () => {
  const boardId = await getBoardIdForUser();
  const user = await currentUser();
  const userName = user?.firstName ?? "";
  return (
    <div className="bg-[url('/bg.jpeg')] h-[102vh] relative w-full bg-cover mt-[-75px] overflow-hidden">
      <OnboardingForm user={userName} boardId={null}  />
    </div>
  );
};

export default page;