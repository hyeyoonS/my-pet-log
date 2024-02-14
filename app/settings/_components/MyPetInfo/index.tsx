import calculateAge from "@/app/_utils/calculateAge";
import { profile, container, info } from "./style.css";
import NoPetProfileImage from "@/public/images/pet-profile-default.svg?url";
import { getPetInfo } from "@/app/_api/pets";
import { useQuery } from "@tanstack/react-query";

//타입 추후에 다른 파일로 빼기
interface StyleProps {
  styles?: {
    profileBorderColor: string;
    nameTextColor: string;
    breedTextColor: string;
  };
}

const petId = 7;

const MyPetInfo = ({ styles }: StyleProps) => {
  // 프롭 안넘겨줄 시 기본값들
  const { profileBorderColor = "var(--MainOrange)", nameTextColor = "var(--Black)", breedTextColor = "var(--Gray81)" } = styles || {};

  const { data: petInfo, isLoading } = useQuery({
    queryKey: ["petInfo", petId],
    queryFn: () => getPetInfo(petId),
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(petInfo);
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
