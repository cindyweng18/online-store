import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import {useForm} from "react-hook-form";
import { useHistory } from 'react-router-dom';


function Computer(props) {
  const history = useHistory();
  const {register, handleSubmit} = useForm();
  const { params } = props.match;
  // Save choices on variables so it gets sent to correct route
  const onSubmit = (d) => {
    var os = JSON.stringify(d).split('"')[3].toLowerCase();
    var purpose = JSON.stringify(d).split('"')[7].toLowerCase();
    var arch = JSON.stringify(d).split('"')[11].toLowerCase();
    history.push(`/${params.computer}/${os}/${purpose}/${arch}`);
  };

  return (
    <>
      <Nav />
      <div class="px-4 py-5 my-5 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-terminal-fill" viewBox="0 0 16 16">
          <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm9.5 5.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm-6.354-.354a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146z"/>
        </svg>
        <h1 class="display-5 fw-bold"> Select Operating System </h1>
        <div class="col-lg-6 mx-auto">
          <div class="d-grid gap-2 d-sm justify-content-sm-center lead mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-check">
                <label > 
                  <input {...register("OS", { required: true })}  type="radio" value="Windows" />
                  Windows
                </label>
              </div>
              <div class="form-check">
                <label> 
                  <input {...register("OS", { required: true })}  type="radio" value="macOS" />
                  macOS
                </label>
              </div>
              <div class="form-check">
                <label> 
                  <input {...register("OS", { required: true })}  type="radio" value="Linux" />
                  Linux
                </label>
              </div>
            </form>
            <br/>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-window" viewBox="0 0 16 16">
              <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
              <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z"/>
            </svg>
            <h1 class="display-5 fw-bold"> Select Main Purpose </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-check">
                <label > 
                  <input {...register("Purpose", { required: true })}  type="radio" value="Business" />
                 Business
                </label>
              </div>
              <div class="form-check">
                <label> 
                  <input {...register("Purpose", { required: true })}  type="radio" value="Gaming" />
                  Gaming 
                </label>
              </div>
              <div class="form-check">
                <label> 
                  <input {...register("Purpose", { required: true })}  type="radio" value="Scientific" />
                  Scientific
                </label>
              </div>
              <br />
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cpu-fill" viewBox="0 0 16 16">
                <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z"/>
              </svg>        
              <h1 class="display-5 fw-bold"> Select Architecture </h1>
            </form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-check">
                <label > 
                  <input {...register("Architecture", { required: true })}  type="radio" value="Intel" />
                 Intel
                </label>
              </div>
              <div class="form-check">
                <label> 
                  <input {...register("Architecture", { required: true })}  type="radio" value="ARM" />
                  ARM
                </label>
              </div>
              <div class="form-check">
                <label> 
                  <input {...register("Architecture", { required: true })}  type="radio" value="AMD" />
                  AMD
                </label>
              </div>
              <br />
              <div class="form-check">
                <input class="btn btn-primary" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default Computer;