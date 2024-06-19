import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TSettings, getSettings } from "../../../services/apiSettings";

type UseGetSettingsResult = {
  settings: TSettings | undefined;
  isSettingDataLoading: boolean;
  isSettingDataError: boolean;
};

const useGetSettings = (): UseGetSettingsResult => {
  const {
    data: settings,
    isLoading: isSettingDataLoading,
    error: isSettingDataError,
  }: UseQueryResult<TSettings, boolean> = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    settings,
    isSettingDataError: !!isSettingDataError,
    isSettingDataLoading,
  };
};

export default useGetSettings;
