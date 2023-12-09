import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import en from "../../../../../locales/en.json"

const FilterMenu = ({ t, filterImage }) => (
  <Menu as={"menu"} className="absolute h-8 w-8 top-2 left-2">
    <Menu.Button className="inline-flex items-center justify-center w-full h-full border border-white p-1 hover:bg-black/50 bg-black/25 backdrop-blur-sm duration-200 rounded-md shadow-inner">
      <img className="h-full object-contain" src="images/change-color-icon.svg" alt="Change Color" />
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 scale-95 -translate-y-1/4"
      enterTo="transform opacity-100 scale-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100 scale-100 translate-y-0"
      leaveTo="transform opacity-0 scale-95 -translate-y-1/4"
    >
      <Menu.Items className="absolute left-0 border border-white w-max p-1 origin-top-left grid grid-flow-row gap-1 items-center rounded-md bg-black/25 backdrop-blur-sm shadow-inner text-base">
        {en.color_changer.map((color, index) => (
          <Menu.Item as={"span"} className={"text-white bg-black/25 hover:bg-black/50 cursor-pointer rounded px-2 py-1 duration-200 animate__animated animate__fadeInLeft animate__faster"} key={index} onClick={() => filterImage(color)}>{t(`color_changer.${index}`)}</Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default withTranslation()(FilterMenu)