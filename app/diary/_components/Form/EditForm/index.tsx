"use client";

import { getDiary, postDiaryVideo, putDiary } from "@/app/_api/diary";
import BackHeader from "@/app/_components/BackHeader";
import { showToast } from "@/app/_components/Toast";
import { deletedImagesAtom, diaryImagesAtom } from "@/app/_states/atom";
import { DiaryMediaType } from "@/app/_types/diary/type";
import * as styles from "@/app/diary/_components/Form/CreateForm/style.css";
import DateInput from "@/app/diary/_components/Input/DateInput";
import { ContentInput, TitleInput } from "@/app/diary/_components/Input/FormInput";
import ImageInput from "@/app/diary/_components/Input/ImageInput";
import VideoInput from "@/app/diary/_components/Input/VideoInput";
import Loading from "@/app/diary/_components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Diary {
  title: string;
  content: string;
  date: string;
  deletedMediaIds?: number[];
  uploadedVideoIds?: string[];
}

export interface FormInput {
  title: string;
  content: string;
  date: string;
  images?: File[] | null;
  video?: File | null;
}

const EditForm = ({ petId, diaryId }: { petId: number; diaryId: number }) => {
  const [oldImages, setOldImages] = useState<DiaryMediaType[]>([]);
  const [oldVideo, setOldVideo] = useState<DiaryMediaType[]>([]);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: diary, isSuccess } = useQuery({ queryKey: ["diary", { petId, diaryId }], queryFn: () => getDiary({ diaryId }) });

  const {
    mutate: putDiaryMutation,
    isPending,
    isSuccess: isPutSuccess,
  } = useMutation({
    mutationFn: (formData: FormData) => putDiary({ diaryId, formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries", petId] });
      queryClient.invalidateQueries({ queryKey: ["diary", { petId, diaryId }] });
      setDeletedImages([]);
      setDiaryImages([]);
      router.back();
    },
    onError: () => {
      showToast("일기 수정에 실패했습니다.", false);
    },
  });

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
    handleSubmit,
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      date: diary?.date,
    },
  });

  useEffect(() => {
    if (diary) {
      setValue("title", diary.title);
      setValue("content", diary.content);
      setValue("date", diary.date.replaceAll(".", "-"));
      setOldImages([...diary.images]);
      setOldVideo([...diary.videos]);
    }
  }, [isSuccess]);

  const [diaryImages, setDiaryImages] = useAtom(diaryImagesAtom);
  const [deletedImages, setDeletedImages] = useAtom(deletedImagesAtom);
  return (
    <>
      <BackHeader title="육아일기 수정" styleTop="0" />
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            const formData = new FormData();

            const request: Diary = {
              title: data.title,
              content: data.content,
              date: data.date,
            };
            //video가 있다면 백엔드에 등록 후 응답id를 formData에 추가
            if (data.video) {
              setIsVideoUploading(true);
              const videoFormData = new FormData();
              videoFormData.append("video", data.video);

              try {
                const res = await postDiaryVideo({ formData: videoFormData });
                request.uploadedVideoIds = [res.videoId];
              } catch {
                showToast("영상 업로드에 실패했습니다.", false);
              }
              setIsVideoUploading(false);
            }
            if (deletedImages) {
              request.deletedMediaIds = deletedImages;
            }
            const blob = new Blob([JSON.stringify(request)], { type: "application/json" });
            formData.append("request", blob);

            if (diaryImages) {
              diaryImages.forEach((v) => formData.append("images", v.file));
            }

            putDiaryMutation(formData);
          })}
        >
          <TitleInput register={register} watch={watch} errors={errors} />
          <DateInput register={register} setValue={setValue} getValue={getValues} />
          <ImageInput register={register} setValue={setValue} oldMedia={oldImages} />
          <VideoInput register={register} setValue={setValue} oldMedia={oldVideo} />
          <ContentInput register={register} watch={watch} errors={errors} />

          <button className={styles.button}>수정하기</button>
        </form>
      </div>
      {(isPending || isVideoUploading || isPutSuccess) && <Loading />}
    </>
  );
};

export default EditForm;
