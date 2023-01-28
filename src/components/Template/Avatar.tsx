import Link from "next/link";
import useAuthData from "../../data/hook/useAuthData";

export default function Avatar() {
  const { user } = useAuthData();

  return (
    <Link href="/profile">
      <img
        src={user?.imageUrl ?? "/images/avatar.svg"}
        alt="Avatar do usuário"
        className="h-10 w-10 rounded-full cursor-pointer ml-3"
      />
    </Link>
  );
}
