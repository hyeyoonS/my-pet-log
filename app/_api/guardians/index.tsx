"use server";

import instance from "@/app/_api/axios";
import { GuardianForLogsType } from "@/app/_types/guardians/types";

export const getGuardians = async (petId: number) => {
  try {
    const response = await instance.get(`/my/guardians/${petId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    console.error(error.response.data);
  }
};

export const getGuardiansForLogs = async (petId: number): Promise<GuardianForLogsType[]> => {
  try {
    const response = await instance.get(`/pets/${petId}/guardians`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
    return [];
  }
};

export const postInviteGuardian = async (petId: number, email: string) => {
  try {
    const response = await instance.post(`/my/guardians/${petId}/invite`, {
      email,
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error: any) {
    console.error(error.response.data);
    throw new Error(error.response.data.message);
  }
};

export const deleteGuardians = async (petId: number, guardianId: number) => {
  try {
    const response = await instance.delete(`/my/guardians/${petId}`, {
      data: { guardianId },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    console.error(error.response.data);
    return null;
  }
};
