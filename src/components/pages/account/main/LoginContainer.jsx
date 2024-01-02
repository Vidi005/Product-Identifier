import React from "react"
import LoginInputForm from "./LoginInputForm"

const LoginContainer = ({ props, formRef, state, onUserChangeHandler, onPasswordChangeHandler, changeVisibilityPassword, onBlurHandler, onFocusHandler, enableKeepSignedIn, onSubmitHandler }) => (
  <main className="login-app__main grow w-full p-2 flex items-center justify-center overflow-auto animate__animated animate__fadeIn">
    <section className="login-form-container w-full max-w-md p-4 bg-green-100 dark:bg-gray-700 font-sans rounded-xl shadow-lg">
      <h3 className="text-center dark:text-white p-2"><b>{props.t('login')}</b></h3>
      <LoginInputForm
        t={props.t}
        formRef={formRef}
        username={state.username}
        password={state.password}
        inputType={state.inputType}
        isFocused={state.isFocused}
        isSubmitted={state.isSubmitted}
        isKeepSignedIn={state.isKeepSignedIn}
        onUserChangeHandler={onUserChangeHandler}
        onPasswordChangeHandler={onPasswordChangeHandler}
        changeVisibilityPassword={changeVisibilityPassword}
        onBlurHandler={onBlurHandler}
        onFocusHandler={onFocusHandler}
        enableKeepSignedIn={enableKeepSignedIn}
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  </main>
)

export default LoginContainer