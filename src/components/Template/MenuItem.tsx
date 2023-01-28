import Link from "next/link";

interface MenuItemProps {
  url?: string;
  text: string;
  icon: any;
  className?: string;
  onClink?: (event: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  const renderLink = () => (
    <a
      className={`flex flex-col justify-center items-center h-20 w-20 dark:text-gray-200 ${props.className}`}
    >
      {props.icon}

      <span className="text-xs font-light">{props.text}</span>
    </a>
  );

  return (
    <li
      onClick={props.onClink}
      className="hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800"
    >
      {props.url ? (
        <Link href={props.url} legacyBehavior>
          {renderLink()}
        </Link>
      ) : (
        renderLink()
      )}
    </li>
  );
}
