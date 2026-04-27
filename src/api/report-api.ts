import axiosInstance from "./axios-instance";

export const getReports = async (nickname: string) => {
  const { data } = await axiosInstance.get(
    `/maple-characters/${encodeURIComponent(nickname)}/reports`
  );
  return data;
};

export const createReport = async (nickname: string, sourceUrl: string) => {
  const { data } = await axiosInstance.post(
    `/maple-characters/${encodeURIComponent(nickname)}/reports`,
    { sourceUrl }
  );
  return data;
};
