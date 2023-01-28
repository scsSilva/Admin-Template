import useAuthData from "../../data/hook/useAuthData";
import { AdjustmentsIcon, BellIcon, HomeIcon, LogoutIcon } from "../Icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideBar() {
  const { logout } = useAuthData();

  return (
    <aside className="flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20">
        <Logo />
      </div>

      <ul className="flex-grow">
        <MenuItem url="/" text="Início" icon={HomeIcon} />
        <MenuItem url="/settings" text="Configurações" icon={AdjustmentsIcon} />
        <MenuItem url="/notifications" text="Notificações" icon={BellIcon} />
      </ul>

      <ul>
        <MenuItem
          text="Sair"
          icon={LogoutIcon}
          onClink={logout}
          className="text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white dark:hover:text-white"
        />
      </ul>
    </aside>
  );
}
