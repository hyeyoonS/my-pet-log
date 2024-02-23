"use client";

import BackIcon from "@/public/icons/chevron-left.svg?url";
import Illust from "@/public/images/illustration-404.png";
import Background from "@/public/images/illustration-bg-404.png";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LostPet from "./_components/LostPet";
import * as styles from "./page.css";

const Page = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.backIcon} onClick={() => router.back()}>
          <Image src={BackIcon} alt="backward icon" width={25} height={25} />
        </div>
      </header>
      <Image className={styles.bg} src={Background} alt="배경 이미지" />
      <div className={styles.backHomeWrapper}>
        <Image src={Illust} alt="강아지와 사람 일러스트" width={200} height={140} />
        <div className={styles.backHomeText}>
          <p>길을 잃었어요!</p>
          <p>다시 홈으로 돌아갈까요?</p>
        </div>
        <Button className={styles.homeButton} onClick={() => router.push("/home")}>
          마이펫로그 홈 가기
        </Button>
      </div>
      <LostPet />
    </div>
  );
};

export default Page;
