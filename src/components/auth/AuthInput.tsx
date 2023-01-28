interface AuthInputProps {
  label: string;
  value: any;
  type: "text" | "email" | "password";
  required?: boolean;
  changeValue: (newValue: any) => void;
}

export default function AuthInput({
  label,
  value,
  type,
  required,
  changeValue,
}: AuthInputProps) {
  return (
    <div className="flex flex-col mt-4">
      <label>{label}</label>
      <input
        type={type ?? "text"}
        value={value}
        onChange={(e) => changeValue?.(e.target.value)}
        required={required}
        className="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white"
      />
    </div>
  );
}
