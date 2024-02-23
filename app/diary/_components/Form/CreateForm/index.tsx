"use client";

import { postDiary, postDiaryVideo } from "@/app/_api/diary";
import BackHeader from "@/app/_components/BackHeader";
import { showToast } from "@/app/_components/Toast";
import { diaryImagesAtom } from "@/app/_states/atom";
import { getPrettyToday } from "@/app/_utils/getPrettyToday";
import DateInput from "@/app/diary/_components/Input/DateInput";
import { FormInput } from "@/app/diary/_components/Form/EditForm";
import { ContentInput, TitleInput } from "@/app/diary/_components/Input/FormInput";
import ImageInput from "@/app/diary/_components/Input/ImageInput";
import VideoInput from "@/app/diary/_components/Input/VideoInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as styles from "./style.css";
import { useState } from "react";
import Loading from "@/app/diary/_components/Loading";

interface Diary {
  title: string;
  content: string;
  date: string;
  uploadedVideoIds?: string[];
}

const CreateForm = ({ petId }: { petId: number }) => {
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const queryClient = useQueryClient();

  //일기 생성
  const {
    mutate: postDiaryMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (formData: FormData) => postDiary({ formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries", petId] });
      router.push("/diary");
      setDiaryImages([]);
    },
    onError: () => {
      showToast("일기 생성에 실패했습니다.", false);
    },
  });

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
    handleSubmit,
  } = useForm<FormInput>({ mode: "onChange", defaultValues: { date: getPrettyToday() } });

  const [diaryImages, setDiaryImages] = useAtom(diaryImagesAtom);

  const router = useRouter();

  return (
    <>
      <BackHeader title="육아일기 글작성" styleTop="0" />
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

            const blob = new Blob([JSON.stringify(request)], { type: "application/json" });
            formData.append("request", blob);

            if (diaryImages) {
              diaryImages.forEach((v) => formData.append("images", v.file));
            }

            postDiaryMutation(formData);
          })}
        >
          <TitleInput register={register} watch={watch} errors={errors} />
          <DateInput register={register} setValue={setValue} getValue={getValues} />
          <ImageInput register={register} setValue={setValue} />
          <VideoInput register={register} setValue={setValue} />
          <ContentInput register={register} watch={watch} errors={errors} />

          <button className={styles.button}>작성하기</button>
        </form>
      </div>
      {(isPending || isVideoUploading || isSuccess) && <Loading />}
    </>
  );
};

export default CreateForm;
