import React from "react"
import { withTranslation } from "react-i18next"
import Swal from "sweetalert2"

const ProductListDelete = ({ t, onClickDeleteAllBtn }) => (
  <button className="toolbar-delete-all mx-2 md:mx-3 p-1 bg-red-50 dark:bg-gray-300 hover:bg-red-400 dark:hover:bg-white duration-200 rounded-lg shadow dark:shadow-white" onClick={() => {
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
    <img className="max-h-7 aspect-square" src="images/delete-sweep-icon.svg" alt="Delete All" />
  </button>
)

export default withTranslation()(ProductListDelete)