"use client";
import { editPetRep, getPets } from "@/app/_api/pets";
import * as styles from "@/app/_components/SelectPet/style.css";
import { PetType, PetsType } from "@/app/_types/petGroup/types";
import calculateAge from "@/app/_utils/calculateAge";
import { getImagePath } from "@/app/_utils/getPetImagePath";
import AddIcon from "@/public/icons/add.svg?url";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Pet = ({ pet, path }: { pet: PetType; path: string }) => {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => {
        editPetRep(pet.petId);
        localStorage.setItem("petId", pet.petId);
        router.push(path);
      }}
    >
      {/* <div className={styles.profile} style={{ backgroundImage: `url(${pet.petImageUrl ?? NoPetProfileImage}` }} /> */}
      <Image className={styles.profile} src={getImagePath(pet.petImageUrl)} alt="펫 프로필 사진" width={80} height={80} />
      <div className={styles.text}>
        <h3 style={{ fontSize: "1.6rem", fontWeight: "700" }}>{pet.name}</h3>
        <p style={{ fontSize: "1.3rem", fontWeight: "500" }}>
          {pet.breed} • {pet.gender === "MALE" ? "남아" : "여아"} • {calculateAge(pet.birth)}
        </p>
      </div>
    </div>
  );
};
const SelectPet = ({ type, path }: { type: string; path: string }) => {
  const { data: pets } = useQuery<PetsType | null>({ queryKey: ["pets"], queryFn: () => getPets() });

  return (
    <>
      <div className={styles.root}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
          <h3 className={styles.h3}>
            오늘은 누구의
            <br />
            {type}를 작성해볼까요?
          </h3>
          <p className={styles.p}>펫메이트로 초대받으셨나요?</p>
        </div>

        <div className={styles.petList}>
          {pets?.data.map(
            (pet) =>
              pet && (
                // <Link href={path} >
                <Pet pet={pet} path={path} key={pet.petId} />
                // </Link>
              ),
          )}
          <Link href={"/settings/pet-register"} className={styles.container} style={{ justifyContent: "center" }}>
            <div className={styles.addButton}>
              <Image src={AddIcon} alt="add icon" width={16} height={16} className={styles.addIcon} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SelectPet;
