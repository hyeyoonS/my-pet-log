import calculateAge from "@/app/_utils/calculateAge";
import { profile, container, info } from "./style.css";
import NoPetProfileImage from "@/public/images/pet-profile-default.svg?url";
import { PetType } from "@/app/_types/pets/types";

//타입 추후에 다른 파일로 빼기
interface StyleProps {
  styles?: {
    profileBorderColor: string;
    nameTextColor: string;
    breedTextColor: string;
  };
}

interface MyPetProps extends StyleProps {
  petInfo: PetType;
}

const MyPetInfo = ({ petInfo, styles }: MyPetProps) => {
  // 프롭 안넘겨줄 시 기본값들
  const { profileBorderColor = "var(--MainOrange)", nameTextColor = "var(--Black)", breedTextColor = "var(--Gray81)" } = styles || {};

  const petImageUrl = petInfo.petImageUrl ?? NoPetProfileImage;

  return (
    <div className={container}>
      <div
        style={{
          backgroundImage: `url(${petImageUrl})`,
          border: `3px solid ${profileBorderColor}`,
        }}
        className={profile}
      />
      <div className={info}>
        <span style={{ fontSize: "1.8rem", fontWeight: "600", color: nameTextColor }}>{petInfo.name}</span>
        <span style={{ fontSize: "1.2rem", fontWeight: "500", color: breedTextColor }}>{petInfo.breed}</span>
        <span style={{ fontSize: "1.2rem", fontWeight: "500", color: breedTextColor }}>
          {petInfo.gender} · {calculateAge(petInfo.birth)}
        </span>
      </div>
    </div>
  );
};

export default MyPetInfo;
