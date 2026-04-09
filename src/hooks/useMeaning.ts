import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../lib/axios";
import { MeaningCreate, MeaningUpdate } from "../types/api";
import fnErrorMessage from "../utils/fnErrorMessage";

export const useEditMeaning = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: MeaningUpdate }) => {
      await api.put(`/meanings/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word"] });
      message.success("Significado atualizado!");
      onSuccess?.();
    },
    onError: (error) => {
      message.error(fnErrorMessage(error));
    },
  });
};

export const useCreateMeaning = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id: word_id,
      data,
    }: {
      id?: string;
      data: MeaningCreate;
    }) => {
      await api.post(`/words/${word_id}/meanings/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word"] });
      message.success("Significado adicionado!");
      onSuccess?.();
    },
    onError: (error) => {
      message.error(fnErrorMessage(error));
    },
  });
};

export const useDeleteMeaning = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (meaningId: number) => {
      await api.delete(`/meanings/${meaningId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["word"] });
      message.success("Significado excluído!");
    },
    onError: (error) => {
      message.error(fnErrorMessage(error));
    },
  });
};
