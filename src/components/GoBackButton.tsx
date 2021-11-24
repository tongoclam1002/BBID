import { Button } from "antd";
import { t } from "i18next";
import { useHistory } from "react-router";

export default function GoBackButton() {
  const history = useHistory();

  return (
    <div>
      <Button onClick={history.goBack}>{t("common.BACK")}</Button>
    </div>
  );
}
