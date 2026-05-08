"use client"
import React from "react";
import "./form.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Page({
  isMobile,
  formSubmitTrack,
  nameValue,
  emailValue,
  phoneValue,
  setNameValue,
  setEmailValue,
  setPhoneValue,
}) {
  return (
    <form
      method="POST"
      action="https://eu.customerioforms.com/forms/submit_action?site_id=4367d44fa648e87be6fe&form_id=03855c6653bc4ec&success_url=https://artima.md/thank-you-ru"
      id="_form_1_"
      noValidate
      data-styles-version="4"
    >
      <div className="flex flex-col pt-[40rem] pb-[32rem] sm:py-[52rem] w-[366rem] sm:w-[454rem] mx-auto">
        <input
          type="text"
          id="fullname"
          className="w-full h-[45rem] sm:h-[54rem] text-[14rem] sm:text-[18rem] text-black placeholder:text-[14rem] placeholder:sm:text-[18rem] placeholder:text-[#c4c4c4] pl-[20rem] border-[1rem] border-[#c4c4c4] rounded-full focus-visible:outline-none"
          name="fullname"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          placeholder={"Имя, Фамилия"}
          required
        />
        <input
          type="email"
          id="email"
          className="w-full h-[45rem] sm:h-[54rem] text-[14rem] sm:text-[18rem] text-black placeholder:text-[14rem] placeholder:sm:text-[18rem] placeholder:text-[#c4c4c4] pl-[20rem] border-[1rem] border-[#c4c4c4] rounded-full focus-visible:outline-none mt-[20rem] sm:mt-[24rem]"
          name="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          required
          placeholder="E-mail"
        />

        <div className="flex items-center border-none rounded-[6rem] mt-[20rem] sm:mt-[24rem]">
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
              borderRadius: "35rem",
            }}
            masks={{ md: "........." }}
            country="md"
            value={phoneValue}
            onChange={setPhoneValue}
          />
        </div>

        <input type="hidden" name="language" value={"ru"} />

        <button
          id=""
          className="flex justify-center items-center w-[366rem] sm:w-[454rem] h-[70rem] sm:h-[84rem] mx-auto mt-[26rem] sm:mt-[34rem] text-[20rem] sm:text-[22rem] text-white font-bold uppercase leading-[28rem] sm:leading-[31rem] hover:bg-[#ffc231] bg-[url('/sales/button_bg.png')] bg-cover bg-no-repeat rounded-full"
          type="submit"
          disabled={
            nameValue.length < 3 ||
            !emailValue.includes(`@`) ||
            phoneValue.length > 11 ||
            phoneValue.length < 11
          }
          onClick={() => formSubmitTrack()}
        >
          Получить
          <br />
          PDF-презентацию
        </button>
      </div>
    </form>
  );
};
