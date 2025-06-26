import Link from "next/link";

interface ButtonProps {
  buttonLink: string;
  buttonText?: string;
  btnIcon?: React.ReactNode;
}

export const Button = ({ buttonLink, buttonText, btnIcon }: ButtonProps) => {
  return (
    <Link
      href={buttonLink}
      className={`flex w-fit items-center gap-x-[5px] bg-transparent border border-(--black-10) p-[10px] rounded-[50px] text-(--primary) cursor-pointer`}
    >
      {btnIcon}
      <span>{buttonText}</span>
    </Link>
  );
};
