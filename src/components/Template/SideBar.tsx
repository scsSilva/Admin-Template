import useAppData from "../../data/hook/useAppData";
import useAuthData from "../../data/hook/useAuthData";
import { AdjustmentsIcon, BellIcon, HomeIcon, LogoutIcon } from "../Icons";
import ButtonChangeTheme from "./ButtonChangeTheme";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideBar() {
  const { theme, changeTheme } = useAppData();
  const { logout } = useAuthData();

  return (
    <aside className="flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20">
        <Logo />
      </div>

      <ul className="flex-grow">
        <div className="lg:hidden md:hidden mt-5 mb-5 flex items-center justify-center">
          <ButtonChangeTheme
            visible={true}
            theme={theme!}
            changeTheme={changeTheme!}
          />
        </div>
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
