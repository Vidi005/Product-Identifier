import { Menu, Switch, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const HeaderContainer = ({ headerTitle, changeLanguage, setDisplayMode, isDarkModeEnabled }) => (
  <header className="identifier-app__header relative flex flex-nowrap items-center justify-between w-full bg-green-700 p-1 shadow-xl">
    <h3 className="grow font-serif text-white p-1">{headerTitle}</h3>
    <section className="w-fit flex items-center pl-1">
      <Switch
        checked={isDarkModeEnabled}
        onChange={setDisplayMode}
        className={`${isDarkModeEnabled ? "bg-green-900" : "bg-green-500"} relative inline-flex h-6 w-12 px-1 items-center rounded-full cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1`}
      >
        <span className="sr-only">Enable Dark Mode</span>
        <span className={`${isDarkModeEnabled ? "translate-x-6" : "translate-x-0"} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`}></span>
      </Switch>
      <Menu as={"menu"} className="inline-block h-10 pl-2">
        <Menu.Button className="inline-flex w-full items-center justify-center h-full p-2 hover:bg-green-900 focus-visible:ring-2 focus-visible:ring-white/75 duration-200 rounded-md">
          <img className="h-full object-contain" src="images/lang-icon.svg" alt="Languages" />
          <img className="h-full object-contain" src="images/expand-icon.svg" alt="Expand" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95 -translate-y-1/2"
          enterTo="transform opacity-100 scale-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100 translate-y-0"
          leaveTo="transform opacity-0 scale-95 -translate-y-1/2"
        >
          <Menu.Items className={"absolute right-1 mt-2 w-40 p-1 origin-top-right grid grid-flow-row gap-1 items-center rounded-lg bg-green-700 shadow-lg text-base z-20"}>
            <Menu.Item as={"span"} className={"text-white hover:bg-green-200 hover:text-green-900 cursor-pointer rounded-md p-2 duration-200 animate__animated animate__fadeInRight animate__faster"} onClick={() => changeLanguage("en")}>
              English
            </Menu.Item>
            <Menu.Item as={"span"} className={"text-white hover:bg-green-200 hover:text-green-900 cursor-pointer rounded-md p-2 duration-200 animate__animated animate__fadeInRight animate__faster"} onClick={() => changeLanguage("id")}>
              Indonesia
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  </header>
)

export default HeaderContainer