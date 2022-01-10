import { Rate, Input, Button } from "antd";
import { t } from "i18next";
import { useAppSelector } from "../../app/store/configureStore";

export default function RateProduct({onChangeRate, onChangeComment, onClick, rating}) {
  const { TextArea } = Input;
  const { status } = useAppSelector((state) => state.comment);

  return (
    <>
      <Rate onChange={onChangeRate} allowClear={false} defaultValue={5} value={rating}/>
      <TextArea
        // value={value}
        onChange={onChangeComment}
        placeholder={t("comment.TEXTAREA_COMMENT")}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <div style={{textAlign: "right"}}>
        <Button loading={status === "pendingPostComment"} className="mt-2" onClick={onClick}>{t("comment.POST")}</Button>
      </div>
    </>
  );
}
