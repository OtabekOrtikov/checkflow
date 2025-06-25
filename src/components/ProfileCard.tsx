import Link from "next/link";
import { ProfileInfo } from "@/types/profile.t";

export const ProfileCard = (user: ProfileInfo | null) => {
  return (
    <div className="mt-auto">
      <Link
        href="/profile"
        className={`flex items-center 
            rounded-[50px] justify-start 
            gap-x-[10px] text-[20px] font-semibold 
            p-[10px] min-h-[60px] w-full 
            bg-(--background)
            `}
      >
        <img
          src={user?.avatarUrl || "/assets/user.jpg"}
          alt={user?.fullName || "Профиль"}
          className="w-[60px] aspect-square rounded-full"
        />
        <div>
          <p className="font-[Bounded] text-[24px] font-[566]">
            {user?.fullName
              .split(" ")
              .map((w, i) => (i === 0 ? w[0] + "." : w))
              .join(" ")}
          </p>
          <p className="text-[15px] opacity-[0.5] font-normal">
            {user?.position || "Пользователь"}
          </p>
        </div>
      </Link>
    </div>
  );
};
