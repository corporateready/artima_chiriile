"use client";
import React from "react";
// import styles from "./form.module.scss";
import "./form.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Page = ({
  formSubmitTrack,
  nameValue,
  emailValue,
  phoneValue,
  setNameValue,
  setEmailValue,
  setPhoneValue,
  userLocation,
  isMobile,
}) => {
 
  return (
    <form
      method="POST"
      action="https://eu.customerioforms.com/forms/submit_action?site_id=4367d44fa648e87be6fe&form_id=03855c6653bc4ec&success_url=https://artima.md/thank-you"
      id="_form_1_"
      className=""
      // onSubmit={handleSubmit}
      noValidate
      data-styles-version="4"
    >
      <div className="w-[352rem] sm:w-[454rem] mx-auto pb-[32rem] sm:pb-[50rem]">
        <input
          type="text"
          id="fullname"
          className="inline-flex h-[45rem] sm:h-[56rem] w-full rounded-[23rem] sm:rounded-[28rem] border-[1rem] border-[#c4c4c4] mt-[23rem] sm:mt-[44rem] placeholder:text-[#979794] text-[14rem] sm:text-[18rem] text-black placeholder:text-[14rem] placeholder:sm:text-[18rem] pl-[16rem] sm:pl-[20rem] focus-within:outline-none"
          name="fullname"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          placeholder={"Nume, Prenume"}
          required
        />
        <input
          type="email"
          id="email"
          className="inline-flex h-[45rem] sm:h-[56rem] w-full rounded-[23rem] sm:rounded-[28rem] border-[1rem] border-[#c4c4c4] mt-[18rem] sm:mt-[24rem] placeholder:text-[#979794] text-[14rem] sm:text-[18rem] text-black placeholder:text-[14rem] placeholder:sm:text-[18rem] pl-[16rem] sm:pl-[20rem] focus-within:outline-none"
          name="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
          placeholder="E-mail"
        />
        <div className="flex items-center border-none mt-[18rem] sm:mt-[24rem]">
          <PhoneInput
            isValid={(value, country) => {
              if (value.match(/3730/)) {
                setPhoneValue("+373");
              } else {
                return true;
              }
            }}
            inputProps={{
              id: "phone",
              name: "phone",
            }}
            inputStyle={{
              fontSize: isMobile ? "12rem" : "18rem",
              borderRadius: "30rem",
            }}
            masks={{ md: "........." }}
            country="md"
            value={phoneValue}
            onChange={setPhoneValue}
          />
        </div>
        <input type="hidden" name="language" value={"ro"} />

        <button
          id="_form_1_submit"
          className="inline-flex justify-center items-center text-[20rem] sm:text-[22rem] font-bold leading-[24rem] sm:leading-[31rem] text-white bg-[url('/sales/button_bg.png')] bg-cover bg-no-repeat mt-[26rem] sm:mt-[34rem] w-[354rem] sm:w-[454rem] h-[70rem] sm:h-[85rem] rounded-[48rem]"
          type="submit"
          onClick={() => {
            formSubmitTrack();
          }}
          disabled={
            nameValue.length < 3 ||
            !emailValue.includes(`@`) ||
            phoneValue.length > 11 ||
            phoneValue.length < 11
          }
        >
          ACCESEAZĂ ACUM
          <br />
          PREZENTAREA PDF
        </button>
      </div>
    </form>
  );
};

export default Page;
