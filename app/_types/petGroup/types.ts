/* 펫 정보 */

export interface PetType {
  petId: string;
  ownerId: string;
  inviteCode: string;
  name: string;
  type: string;
  breed: string; // 품종
  gender: string;
  isNeutered: "Y" | "N";
  birth: string; //태어난
  weight: string;
  registeredNumber: string;
  repStatus: "REPRESENTATIVE" | "NORMAL";
  petImageUrl: string | null;
}

export interface PetsType {
  count: number;
  data: PetType[];
}
