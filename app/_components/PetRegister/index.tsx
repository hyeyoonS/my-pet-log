"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { PET_NAME_RULES, PET_WEIGHT_RULES, PET_REGISTNUMBER_RULES, PET_PLACEHOLDER } from "@/app/_constants/inputConstant";
import { useState, useEffect, useRef } from "react";
import * as styles from "./style.css";
import DefaultImage from "@/public/icons/user.svg?url";
import cameraIcon from "@/public/icons/camera.svg?url";
import Image from "next/image";
import TitleHeader from "@/app/_components/TitleHeader/index";
import PetDateInput from "./PetDateInput";
import { petOptions } from "@/public/data/petOptions";
import ErrorMessage from "@/app/_components/ErrorMessage";
import DropdownIcon from "@/public/icons/drop-down-icon.svg";

interface IFormInput {
  petName: string;
  image: string;
  type: string;
  breed: string;
  weight: number;
  registNumber: number;
}

const PetRegister = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedNeutering, setSelectedNeutering] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<IFormInput>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setValue("image", URL.createObjectURL(files[0]));
  };

  //드롭다운 외부 클릭시 닫히게 하기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  //드롭다운
  const handleTypeClick = (type: string) => {
    setValue("type", type);
    setSelectedType(type);
    setSelectedBreed("");
    setTypeOpen(false);
  };

  const handleBreedClick = (breed: string) => {
    setValue("breed", breed);
    setSelectedBreed(breed);
    setDropdownOpen(false);
  };

  //중성화
  const handleNeuteringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNeutering(e.target.id);
  };

  //성별
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGender(e.target.id);
  };

  return (
    <div>
      <TitleHeader title={"마이펫 정보 입력"} redirectPath={"/"} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label className={styles.profile} htmlFor="image">
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${watch("image") || DefaultImage})`,
            }}
          >
            <Image className={styles.cameraIcon} src={cameraIcon} alt="camera icon" width={40} height={40} />
          </div>
        </label>

        <input id="image" type="file" accept="image/*" {...register("image")} onChange={handleImageChange} style={{ display: "none" }} />

        {/* 이름 */}
        <label className={styles.label}>이름*</label>
        <input className={styles.writeInput} {...register("petName", PET_NAME_RULES)} placeholder={PET_PLACEHOLDER.name} />
        {errors.petName && <ErrorMessage message={errors.petName.message} />}

        {/* 타입 */}
        <label className={styles.label}>타입*</label>
        <button className={`${styles.selectBox} ${typeOpen ? styles.selectBoxOpen : ""}`} onClick={() => setTypeOpen(!typeOpen)}>
          {selectedType || "타입을 선택하세요"}
          <DropdownIcon className={`${styles.dropdownIcon} ${typeOpen ? styles.dropdownIconOpen : ""}`} />
        </button>

        {typeOpen && (
          <ul className={styles.optionsList}>
            {Object.keys(petOptions).map((type: string, index: number) => (
              <li key={index} value={type}>
                <button type="button" className={styles.optionButton} onClick={() => handleTypeClick(type)} {...register("type")}>
                  {type}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* {selectedType === "기타" && (
          <>
            <input
              className={styles.inputBox}
              placeholder="품종을 직접 입력하세요"
              {...register("type", {
                required: "내용을 입력해주세요",
                // maxLength: { value: MAX_LENGTH.subtype, message: `최대 ${MAX_LENGTH.subtype}자까지 작성할 수 있습니다.` },
              })}
              autoFocus
            />
          </>
        )} */}

        {/* 품종 */}
        <label className={styles.label}>품종*</label>
        <button className={`${styles.selectBox} ${dropdownOpen ? styles.selectBoxOpen : ""}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
          {selectedBreed || "품종을 선택하세요"}
          <DropdownIcon className={`${styles.dropdownIcon} ${dropdownOpen ? styles.dropdownIconOpen : ""}`} />
        </button>

        {dropdownOpen && (
          <ul className={styles.optionsList}>
            {petOptions[selectedType]?.map((breed: string, index: number) => (
              <li key={index} value={breed}>
                <button type="button" className={styles.optionButton} onClick={() => handleBreedClick(breed)} {...register("breed")}>
                  {breed}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* 성별 */}
        <label className={styles.label}>성별*</label>
        <div className={styles.radioContainer}>
          <div className={styles.leftRadio}>
            <input type="radio" id="male" name="gender" checked={selectedGender === "male"} onChange={handleGenderChange} />
            <label className={`${styles.radioOption} ${selectedGender === "male" && styles.leftSelected}`} htmlFor="male">
              남
            </label>
          </div>
          <div className={styles.rightRadio}>
            <input type="radio" id="female" name="gender" checked={selectedGender === "female"} onChange={handleGenderChange} />
            <label className={`${styles.radioOption} ${selectedGender === "female" && styles.rightSelected}`} htmlFor="female">
              여
            </label>
          </div>
        </div>

        {/* 중성화 여부 */}
        <label className={styles.label}>중성화 여부</label>
        <div className={styles.radioContainer}>
          <div className={styles.leftRadio}>
            <input type="radio" id="yes" name="neutering" checked={selectedNeutering === "yes"} onChange={handleNeuteringChange} />
            <label className={`${styles.radioOption} ${selectedNeutering === "yes" && styles.leftSelected}`} htmlFor="yes">
              했어요
            </label>
          </div>
          <div className={styles.rightRadio}>
            <input type="radio" id="no" name="neutering" checked={selectedNeutering === "no"} onChange={handleNeuteringChange} />
            <label className={`${styles.radioOption} ${selectedNeutering === "no" && styles.rightSelected}`} htmlFor="no">
              안했어요
            </label>
          </div>
        </div>

        {/* 생일  */}
        <label className={styles.label}>생일</label>
        <PetDateInput id="birthday" register={register} setValue={setValue} getValue={getValues} />

        {/* 처음 만난 날  */}
        <label className={styles.label}>처음 만난 날</label>
        <PetDateInput id="first-meet" register={register} setValue={setValue} getValue={getValues} />

        {/* 몸무게 */}
        <label className={styles.label}>몸무게*</label>
        <input className={styles.writeInput} {...register("weight", PET_WEIGHT_RULES)} placeholder={PET_PLACEHOLDER.weight} />
        {errors.weight && <ErrorMessage message={errors.weight.message} />}

        {/* 동물등록번호 */}
        <label className={styles.label}>동물등록번호*</label>
        <input className={styles.writeInput} {...register("registNumber", PET_REGISTNUMBER_RULES)} placeholder={PET_PLACEHOLDER.registNumber} />
        {errors.registNumber && <ErrorMessage message={errors.registNumber.message} />}

        <button className={styles.button} type="submit">
          시작하기
        </button>
      </form>
    </div>
  );
};

export default PetRegister;
