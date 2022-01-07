import * as React from "react";
import ReactDOM from "react-dom";
import {
  useForm,
  Controller,
  NestedValue,
  SubmitHandler
} from "react-hook-form";
import Header from "./Header";
import ReactDatePicker from "react-datepicker";
import NumberFormat from "react-number-format";
import ReactSelect from "react-select";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  createMuiTheme,
  Slider
} from "@material-ui/core";
import MuiAutoComplete from "./MuiAutoComplete";
import ButtonsResult from "./ButtonsResult";
import DownShift from "./DownShift";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.css";

let renderCount = 0;

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  ReactSelect: { value: "vanilla", label: "Vanilla" },
  Checkbox: false,
  switch: false,
  RadioGroup: "",
  ReactDatepicker: new Date(),
  numberFormat: 123456789,
  downShift: "apple",
  country: { code: "AF", label: "Afghanistan", phone: "93" }
};

type FormValues = {
  Native: string;
  TextField: string;
  Select: string;
  ReactSelect: NestedValue<{ value: string; label: string }>;
  Checkbox: boolean;
  switch: boolean;
  RadioGroup: string;
  MUI_Slider: string;
  ReactDatepicker: string;
  numberFormat: number;
  downShift: string;
  country: NestedValue<{ code: string; label: string; phone: string }>;
};

function App() {
  const { handleSubmit, register, reset, control, errors } = useForm<
    FormValues
  >({
    defaultValues
  });

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    alert(JSON.stringify(data));
  renderCount++;

  console.log(errors);

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Header
          renderCount={renderCount}
          description="Components that are using Controller. Render count indicate how many re-renders triggered during user interaction at the form level."
        />
        <div className="container">
          <section>
            <label>Native Input:</label>
            <input name="Native" className="input" ref={register} />
          </section>

          <section>
            <label>MUI Checkbox</label>
            <Controller
              name="Checkbox"
              control={control}
              render={(props) => (
                <Checkbox
                  onChange={(e) => props.onChange(e.target.checked)}
                  checked={props.value}
                />
              )}
            />
          </section>

          <section>
            <label>Radio Group</label>
            <Controller
              as={
                <RadioGroup aria-label="gender">
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              }
              name="RadioGroup"
              control={control}
            />
          </section>

          <section>
            <label>MUI TextField</label>
            <Controller as={TextField} name="TextField" control={control} />
          </section>

          <section>
            <label>MUI Select</label>
            <Controller
              as={
                <Select>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              }
              name="Select"
              control={control}
            />
          </section>

          <section>
            <label>MUI Switch</label>
            <Controller
              name="switch"
              control={control}
              render={(props) => (
                <Switch
                  onChange={(e) => props.onChange(e.target.checked)}
                  checked={props.value}
                />
              )}
            />
          </section>

          <section>
            <label>MUI Slider</label>
            <Controller
              name="MUI_Slider"
              control={control}
              defaultValue={[0, 10]}
              render={(props) => (
                <Slider
                  {...props}
                  onChange={(_, value) => {
                    props.onChange(value);
                  }}
                  valueLabelDisplay="auto"
                  max={10}
                  step={1}
                />
              )}
            />
          </section>

          <section>
            <label>MUI autocomplete</label>
            <MuiAutoComplete control={control} />
          </section>

          <section>
            <label>React Select</label>
            <Controller
              as={ReactSelect}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" }
              ]}
              name="ReactSelect"
              isClearable
              control={control}
            />
          </section>

          <section>
            <label>React Datepicker</label>
            <Controller
              control={control}
              name="ReactDatepicker"
              render={(props) => {
                return (
                  <ReactDatePicker
                    {...props}
                    className="input"
                    placeholderText="Select date"
                    selected={props.value}
                  />
                );
              }}
            />
          </section>

          <section>
            <label>NumberFormat</label>
            <Controller
              as={NumberFormat}
              thousandSeparator
              name="numberFormat"
              className="input"
              control={control}
            />
          </section>

          <section>
            <Controller
              control={control}
              name="downShift"
              render={({ ref, ...rest }) => <DownShift {...rest} />}
            />
          </section>
        </div>

        <ButtonsResult {...{ reset }} />
      </form>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
