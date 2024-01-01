import React from "react"

const LoginInputForm = ({ t, formRef, username, password, inputType, isFocused, isKeepSignedIn, isSubmitted, onUserChangeHandler, onPasswordChangeHandler, changeVisibilityPassword, onBlurHandler, onFocusHandler, enableKeepSignedIn, onSubmitHandler }) => {
  let userCharLimit = ''
  if (username.length >= 50) userCharLimit = 'Limit reached'
  else userCharLimit = `${username.length} / 50`
  return (
    <form ref={formRef}>
      <label className="w-full text-sm dark:text-gray-100" htmlFor="username">Username</label>
      <input
        className="input-username w-full my-1 p-2 border border-green-900 dark:border-gray-50 bg-green-50 dark:bg-gray-900 text-base dark:text-white rounded-lg"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={username}
        onChange={onUserChangeHandler}
        onFocus={() => onFocusHandler()}
        onBlur={() => onBlurHandler()}
        required
      />
      <br />
      {
        isFocused
          ? (
            username.length >= 50
              ? <label className="text-justify leading-tight text-sm text-red-700 dark:text-red-500" htmlFor="input-username">{userCharLimit}</label>
              : <label className="text-justify leading-tight text-sm text-green-700 dark:text-green-200" htmlFor="input-username">{userCharLimit}</label>
            )
          : null
      }
      <br />
      <label className="w-full text-sm dark:text-gray-100" htmlFor="password">Password</label>
      <div className="input-password flex items-center w-full my-1 border border-green-900 dark:border-gray-50 bg-green-50 dark:bg-gray-900 dark:text-white rounded-lg overflow-hidden">
        <input
          className="dark:bg-gray-900 grow mr-1 p-2 text-base"
          type={inputType}
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={onPasswordChangeHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          required
        />
        <button className="p-2" type="button" onClick={() => changeVisibilityPassword()}>
          {inputType === 'password'
            ? <img className="max-h-6 object-contain dark:invert" src="images/show-icon.svg" alt="Show Password" />
            : <img className="max-h-6 object-contain dark:invert" src="images/hide-icon.svg" alt="Hide Password" />
          }
        </button>
      </div>
      <br />
      <div className="flex items-center">
        <input type="checkbox" name="keep-signed-in" onChange={() => enableKeepSignedIn()} checked={isKeepSignedIn} className="accent-green-700 dark:accent-gray-200 mx-1 p-2" />
        <label className="text-base text-green-900 dark:text-white" htmlFor="keep-signed-in">Keep Signed In</label>
      </div>
      <br />
      {
        isSubmitted
          ? (
            <button className="flex items-center justify-center w-1/2 border border-green-900 dark:border-green-700 bg-green-700 dark:bg-green-500 mx-auto my-4 p-2 text-white rounded-lg shadow-lg dark:shadow-white/50" type="submit" disabled>
              <span className="mx-1 p-2 border-x-2 border-green-100 rounded-full animate-spin"></span>
              <span className="mx-1 p-1">Signing in...</span>
            </button>
            )
          : (
            <a className="flex items-center justify-center w-1/2 border border-green-900 dark:border-green-700 bg-green-700 dark:bg-green-500 hover:bg-green-900 dark:hover:bg-green-700 mx-auto my-4 p-2 text-white rounded-lg shadow-lg dark:shadow-white/50" href="#" onSubmit={() => formRef.current} onClick={() => onSubmitHandler()}>
              <input type="submit" value="Login" required/>
            </a>
            )
      }
    </form>
  )
}

export default LoginInputForm