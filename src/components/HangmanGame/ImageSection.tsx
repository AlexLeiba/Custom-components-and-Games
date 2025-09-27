import hang1 from "../../assets/hangman/hangman-0.svg";
import hang2 from "../../assets/hangman/hangman-1.svg";
import hang3 from "../../assets/hangman/hangman-2.svg";
import hang4 from "../../assets/hangman/hangman-3.svg";
import hang5 from "../../assets/hangman/hangman-4.svg";
import hang6 from "../../assets/hangman/hangman-5.svg";
import hang7 from "../../assets/hangman/hangman-6.svg";
import { useHangmanStore } from "../../store/hangmanStore";

type FailImagesType = {
  [key: number]: string;
};

const FAILED_IMAGES: FailImagesType = {
  0: hang1,
  1: hang2,
  2: hang3,
  3: hang4,
  4: hang5,
  5: hang6,
  6: hang7,
};
export function ImageSection() {
  const { failed } = useHangmanStore();
  return (
    <div className="flex flex-1">
      <img
        className="w-full md:h-full h-[100px] object-contain"
        src={FAILED_IMAGES[failed]}
        alt=""
      />
    </div>
  );
}
