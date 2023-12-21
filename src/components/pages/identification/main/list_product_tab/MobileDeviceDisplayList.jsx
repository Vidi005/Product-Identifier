import React from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"

const MobileDeviceDisplayList = ({ t, index, productName, productIds, category, vendor, origin, dateCreated, nameTag, colorTag, description, alternatives, source, i, onClickDetailBtn, onClickEditBtn, onClickDeleteBtn }) => i % 2 === 0
  ? (
    <div className="content__product-item md:hidden flex items-center duration-200 animate__animated animate__fadeInUp leading-normal m-1 pr-3 border border-gray-700 bg-gray-300 dark:border-gray-200 dark:bg-gray-700 rounded-lg shadow dark:shadow-white overflow-hidden">
      <span className="item-content grow text-black dark:text-white">
        <h4 className="px-1 py-1 leading-tight">{productName}</h4>
        <p className="px-1 py-1 leading-tight">Vendor: {vendor}</p>
        <p className="px-1 py-1 leading-tight text-white rounded-tr-3xl" style={{ backgroundColor: `${colorTag}`}}>{t('name_tag')}: {nameTag}</p>
      </span>
      <button className="detail-btn border border-green-700 ml-3 p-1 bg-green-700 duration-200 active:bg-green-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickDetailBtn(index)}>
        <img className="max-h-6 aspect-square" src="images/detail-icon.svg" alt="Detail Button" />
      </button>
      <button className="edit-btn border border-gray-700 ml-3 p-1 bg-gray-700 duration-200 active:bg-gray-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickEditBtn(index)}>
        <img className="max-h-6 aspect-square" src="images/edit-icon.svg" alt="Edit Button" />
      </button>
      <button className="delete-btn border border-red-700 ml-3 p-1 bg-red-700 duration-200 active:bg-red-500 rounded-lg shadow dark:shadow-white" onClick={() => {
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
              const safetyCode = 'Product Identifier'
              const { value: password } = await Swal.fire({
                title: t('confirmation_title_alert.0'),
                input: 'password',
                text: `${t('confirmation_text_alert.0')} ${safetyCode}`,
                inputPlaceholder: t('confirmation_placeholder'),
                confirmButtonColor: 'green'
              })
              if (password === safetyCode) {
                Swal.fire({
                  icon: 'success',
                  title: t('delete_title_alert.2'),
                  text: `${t('delete_text_alert.2')} "${productName}".`,
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
    </div>
    )
  : (
    <div className="content__product-item md:hidden flex items-center duration-200 animate__animated animate__fadeInUp leading-normal m-1 pr-3 border border-gray-700 bg-white dark:border-gray-200 dark:bg-black rounded-lg shadow dar overflow-hidden">
      <span className="item-content grow text-black dark:text-white">
        <h4 className="px-1 py-1 leading-tight">{productName}</h4>
        <p className="px-1 py-1 leading-tight">Vendor: {vendor}</p>
        <p className="px-1 py-1 leading-tight text-white rounded-tr-3xl" style={{ backgroundColor: `${colorTag}`}}>{t('name_tag')}: {nameTag}</p>
      </span>
      <button className="detail-btn border border-green-700 ml-3 p-1 bg-green-700 duration-200 active:bg-green-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickDetailBtn(index)}>
        <img className="max-h-6 aspect-square" src="images/detail-icon.svg" alt="Detail Button" />
      </button>
      <button className="edit-btn border border-gray-700 ml-3 p-1 bg-gray-700 duration-200 active:bg-gray-500 rounded-lg shadow dark:shadow-white" onClick={() => onClickEditBtn(index)}>
        <img className="max-h-6 aspect-square" src="images/edit-icon.svg" alt="Edit Button" />
      </button>
      <button className="delete-btn border border-red-700 ml-3 p-1 bg-red-700 duration-200 active:bg-red-500 rounded-lg shadow dark:shadow-white" onClick={() => {
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
              const safetyCode = 'Product Identifier'
              const { value: password } = await Swal.fire({
                title: t('confirmation_title_alert.0'),
                input: 'password',
                text: `${t('confirmation_text_alert.0')} ${safetyCode}`,
                inputPlaceholder: t('confirmation_placeholder'),
                confirmButtonColor: 'green',
                confirmButtonText: t('confirmation_text')
              })
              if (password === safetyCode) {
                Swal.fire({
                  icon: 'success',
                  title: t('delete_title_alert.2'),
                  text: `${t('delete_text_alert.2')} "${productName}".`,
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
    </div>
    )

export default withTranslation()(MobileDeviceDisplayList)