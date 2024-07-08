import { CreateButton, Form, Label, Settings } from "../css/ScheduleFormStyle";

const FormInterview = () => {
  return (
    <Form>
      <Settings>
        <Label htmlFor="date">날짜</Label>
        <Label htmlFor="time">시간</Label>
        <Label htmlFor="term">간격</Label>
        <Label htmlFor="count">횟수</Label>
        {/* <Controller
      control={control}
      name="time"
      rules={{ required: "근무시간을 선택해주세요." }}
      defaultValue={new Date(2024, 7, 13, 9, 0)}
      render={({ field: { onChange, value } }) => (
        <TimePickerContainer>
          <DatePicker
            selected={value}
            onChange={date => onChange(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            timeCaption=""
            customInput={<TimeInput />}
            disabled={freeHour}
          />
        </TimePickerContainer>
      )}
    /> */}
      </Settings>
      <CreateButton>예약 내용 저장하기</CreateButton>
    </Form>
  );
};

export default FormInterview;
