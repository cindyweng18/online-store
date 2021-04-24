import React from "react";
import Nav from "./Nav";


function Desktop() {
  const [valueOS, setValueOS] = React.useState("");
  const [valueMP, setValueMP] = React.useState("");
  const [valueA, setValueA] = React.useState("");
  const handleOSChange = (event) => {
    setValueOS(event.target.value);
  };
  const handleMPChange = (event) => {
    setValueMP(event.target.value);
  };
  const handleAChange = (event) => {
    setValueA(event.target.value);
  };


  return (
    <>
      <Nav />
      <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold"> Select Operating System </h1>
        <div class="col-lg-6 mx-auto">
          <div class="d-grid gap-2 d-sm justify-content-sm-center lead mb-4">
            <div class="form-check">
              <input class="form-check-input" value="Windows" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  onChange={handleOSChange}/>
              <label class="form-check-label" for="flexRadioDefault1"> Windows </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="macOS" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  onChange={handleOSChange} />
              <label class="form-check-label" for="flexRadioDefault1"> macOS </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="Linux" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  onChange={handleOSChange} />
              <label class="form-check-label" for="flexRadioDefault1"> Linux </label>
            </div>
          </div>
        </div>
        <h1 class="display-5 fw-bold"> Select Main Purpose </h1>
        <div class="col-lg-6 mx-auto">
          <div class="d-grid gap-2 d-sm justify-content-sm-center lead mb-4">
            <div class="form-check">
              <input class="form-check-input" value="Business" type="radio" name="flexRadioDefault2" id="flexRadioDefault2"  onChange={handleMPChange}/>
              <label class="form-check-label" for="flexRadioDefault2"> Business </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="Gaming" type="radio" name="flexRadioDefault2" id="flexRadioDefault2"  onChange={handleMPChange} />
              <label class="form-check-label" for="flexRadioDefault2"> Gaming </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="Scientific" type="radio" name="flexRadioDefault2" id="flexRadioDefault2"  onChange={handleMPChange} />
              <label class="form-check-label" for="flexRadioDefault2"> Scientific </label>
            </div>
          </div>
        </div>
        <h1 class="display-5 fw-bold"> Select Architecture </h1>
        <div class="col-lg-6 mx-auto">
          <div class="d-grid gap-2 d-sm justify-content-sm-center lead mb-4">
            <div class="form-check">
              <input class="form-check-input" value="Intel" type="radio" name="flexRadioDefault3" id="flexRadioDefault3"  onChange={handleAChange}/>
              <label class="form-check-label" for="flexRadioDefault3"> Intel </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="ARM" type="radio" name="flexRadioDefault3" id="flexRadioDefault3"  onChange={handleAChange} />
              <label class="form-check-label" for="flexRadioDefault3"> ARM </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="AMD" type="radio" name="flexRadioDefault3" id="flexRadioDefault3"  onChange={handleAChange} />
              <label class="form-check-label" for="flexRadioDefault3"> AMD </label>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg px-4 me-sm-3">Next </button>
      </div>

    </>
  );
}

export default Desktop;