export type ApiResponse<TData> = {
  isSuccess: boolean;
  message: string;
  data: TData;
};
