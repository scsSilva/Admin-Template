import useAppData from "../../data/hook/useAppData";
import Avatar from "./Avatar";
import ButtonChangeTheme from "./ButtonChangeTheme";
import Title from "./Title";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header(props: HeaderProps) {
  const { theme, changeTheme } = useAppData();

  return (
    <div className="flex">
      <Title title={props.title} subtitle={props.subtitle} />
      <div className="flex flex-grow justify-end items-center">
        <ButtonChangeTheme theme={theme} changeTheme={changeTheme} />
        <Avatar />
      </div>
    </div>
  );
}
