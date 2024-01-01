import React from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { getSafetyCode } from "../../../../utils/data"

const LargeDeviceDisplayList = ({ t, index, productName, vendor, dateCreated, nameTag, colorTag, pagePosition, itemsPerPage, i, onClickEditBtn, onClickDeleteBtn }) => i % 2 === 0
  ? (
    <tr className="content__product-item hidden md:table-row divide-x divide-black dark:divide-white duration-200 lg:text-lg md:text-base text-justify align-middle text-gray-800 dark:text-gray-100 animate__animated animate__fadeInUp bg-gray-300 dark:bg-gray-700">
      <td className="text-center px-1 py-4">{i + 1 + itemsPerPage * (pagePosition - 1)}</td>
      <td className="p-1">{productName}</td>
      <td className="p-1">{vendor}</td>
      <td className="border border-x-black dark:border-x-white p-1 text-white" style={{ backgroundColor: `${colorTag}`}}>{nameTag}</td>
      <td className="p-1 text-center">{dateCreated}</td>
      <td className="p-1">
        <span className="grid grid-flow-col gap-4 items-center justify-center">
          <button className="edit-btn border border-gray-700 p-1 bg-gray-700 duration-200 hover:bg-gray-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickEditBtn(index)}>
            <img className="max-h-6 aspect-square" src="images/edit-icon.svg" alt="Edit Button" />
          </button>
          <button className="delete-btn border border-red-700 p-1 bg-red-700 duration-200 hover:bg-red-500 rounded-lg shadow dark:shadow-white" onClick={() => {
            Swal.fire({
              title: `${t('delete_title_alert.0')} "${productName}"?`,
              text: t('delete_text_alert.0'),
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: 'green',
              cancelButtonColor: 'red',
              confirmButtonText: t('question_tag_confirmation.0'),
              cancelButtonText: t('question_tag_confirmation.1'),
            }).then(result => {
              if (result.isConfirmed) {
                const confirmedInput = async () => {
                  const { value: password } = await Swal.fire({
                    title: t('confirmation_title_alert.0'),
                    input: 'password',
                    text: `${t('confirmation_text_alert.0')} ${getSafetyCode()}`,
                    inputPlaceholder: t('confirmation_placeholder'),
                    confirmButtonColor: 'green'
                  })
                  if (password === getSafetyCode()) {
                    Swal.fire({
                      icon: 'success',
                      title: t('delete_title_alert.2'),
                      text: `${t('delete_text_alert.2')} "${productName}"`,
                      confirmButtonColor: 'green',
                    })
                    onClickDeleteBtn(index)
                  } else Swal.fire(t('confirmation_title_alert.1'), t('confirmation_text_alert.1'), 'error')
                }
                return confirmedInput()
              }
            })
          }}>
            <img className="max-h-6 aspect-square" src="images/delete-icon.svg" alt="Delete Button" />
          </button>
        </span>
      </td>
    </tr>
    )
  : (
    <tr className="content__product-item hidden md:table-row divide-x divide-black dark:divide-white lg:text-lg md:text-base text-justify align-middle text-gray-800 dark:text-gray-100 animate__animated animate__fadeInUp bg-white dark:bg-black">
      <td className="text-center px-1 py-4">{i + 1 + itemsPerPage * (pagePosition - 1)}</td>
      <td className="p-1">{productName}</td>
      <td className="p-1">{vendor}</td>
      <td className="border border-x-black dark:border-x-white p-1 text-white" style={{ backgroundColor: `${colorTag}`}}>{nameTag}</td>
      <td className="p-1 text-center">{dateCreated}</td>
      <td className="p-1">
        <span className="grid grid-flow-col gap-4 items-center justify-center">
          <button className="edit-btn border border-gray-700 p-1 bg-gray-700 duration-200 hover:bg-gray-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickEditBtn(index)}>
            <img className="max-h-6 aspect-square" src="images/edit-icon.svg" alt="Edit Button" />
          </button>
          <button className="delete-btn border border-red-700 p-1 bg-red-700 duration-200 hover:bg-red-500 rounded-lg shadow dark:shadow-white" onClick={() => {
            Swal.fire({
              title: `${t('delete_title_alert.0')} "${productName}"?`,
              text: t('delete_text_alert.0'),
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: 'green',
              cancelButtonColor: 'red',
              confirmButtonText: t('question_tag_confirmation.0'),
              cancelButtonText: t('question_tag_confirmation.1'),
            }).then(result => {
              if (result.isConfirmed) {
                const confirmedInput = async () => {
                  const { value: password } = await Swal.fire({
                    title: t('confirmation_title_alert.0'),
                    input: 'password',
                    text: `${t('confirmation_text_alert.0')} ${getSafetyCode()}`,
                    inputPlaceholder: t('confirmation_placeholder'),
                    confirmButtonColor: 'green',
                    confirmButtonText: t('confirmation_text')
                  })
                  if (password === getSafetyCode()) {
                    Swal.fire({
                      icon: 'success',
                      title: t('delete_title_alert.2'),
                      text: `${t('delete_text_alert.2')} "${productName}"`,
                      confirmButtonColor: 'green',
                      confirmButtonText: t('confirmation_text')
                    })
                    onClickDeleteBtn(index)
                  } else Swal.fire(t('confirmation_title_alert.1'), t('confirmation_text_alert.1'), 'error')
                }
                return confirmedInput()
              }
            })
          }}>
            <img className="max-h-6 aspect-square" src="images/delete-icon.svg" alt="Delete Button" />
          </button>
        </span>
      </td>
    </tr>
    )

export default withTranslation()(LargeDeviceDisplayList)