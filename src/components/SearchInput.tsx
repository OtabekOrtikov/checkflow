"use client";

import SearchIcon from "@/assets/icons/searchIcon.svg";

interface SearchInputProps {
  id: string;
  placeholder?: string;
  isSlashVisible?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

export const SearchInput:
  | React.FC<SearchInputProps>
  | React.FunctionComponent<SearchInputProps> = ({
  id,
  placeholder,
  isSlashVisible,
  onChange,
  value,
  className,
}: SearchInputProps) => {
  return (
    <div className="relative w-full 2xl:min-h-[60px] h-fit">
      <label
        htmlFor={id}
        className="absolute top-[50%] translate-y-[-50%] left-[20px]"
      >
        <SearchIcon className="search-icon" />
      </label>

      <input
        type="search"
        name="search"
        id={id}
        placeholder={placeholder ? placeholder : "Поиск..."}
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className={`w-full outline-0 pl-[54px] font-semibold min-h-[60px] h-fit p-[10px] 
          rounded-[15px] border-[1px] border-(--black-10) ${className || ""}`}
        autoComplete="off"
      />

      {isSlashVisible && (
        <div className="absolute right-[10px] top-[50%] translate-y-[-50%] aspect-square w-[40px] bg-(--black-05) rounded-[10px] flex items-center justify-center">
          <p className="text-(--black-50) font-medium">/</p>
        </div>
      )}
    </div>
  );
};
