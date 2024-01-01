import React from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"
import { getSafetyCode } from "../../../../utils/data"

const ProductListDelete = ({ t, onClickDeleteAllBtn }) => (
  <button className="toolbar-delete-all mx-2 md:mr-0 md:flex items-center p-1 md:p-2 bg-red-50 md:bg-red-700 dark:bg-gray-300 md:dark:bg-red-800 hover:bg-red-400 md:hover:bg-red-500 dark:hover:bg-white md:dark:hover:bg-red-600 duration-200 rounded-lg shadow dark:shadow-white" onClick={() => {
    Swal.fire({
      title: t('delete_title_alert.3'),
      text: t('delete_text_alert.3'),
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
              text: t('delete_text_alert.4'),
              confirmButtonColor: 'green'
            })
            onClickDeleteAllBtn()
          } else Swal.fire(t('confirmation_title_alert.1'), t('confirmation_text_alert.1'), 'error')
        }
        return confirmedInput()
      }
    })
  }}>
    <img className="md:hidden max-h-7 aspect-square md:mr-1" src="images/delete-sweep-icon.svg" alt="Delete All" />
    <img className="hidden md:block max-h-7 aspect-square md:mr-1" src="images/dark-delete-sweep-icon.svg" alt="Delete All" />
    <p className="hidden md:block text-white text-sm">{t('delete_all_data')}</p>
  </button>
)

export default withTranslation()(ProductListDelete)