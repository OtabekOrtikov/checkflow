import { Dialog } from "@headlessui/react";

interface ModalTitleProps {
  title: string;
  onClose: () => void;
}

export const ModalTitle = ({ title, onClose }: ModalTitleProps) => {
  return (
    <div className="flex justify-between items-center">
      <Dialog.Title className="text-[32px] font-[566] font-[Bounded]">
        {title}
      </Dialog.Title>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            opacity="0.5"
            d="M16.0001 29.3333C23.3639 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3639 2.66663 16.0001 2.66663C8.63628 2.66663 2.66675 8.63616 2.66675 16C2.66675 23.3638 8.63628 29.3333 16.0001 29.3333Z"
            stroke="black"
            strokeWidth="1.5"
          />
          <path
            d="M19.3334 12.6667L12.6668 19.3333M12.6667 12.6666L19.3334 19.3333"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};
