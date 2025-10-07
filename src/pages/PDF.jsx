import React from 'react'
import UploadPDF from '../components/UploadPDF/UploadPDF'
import FileList from '../components/FileList/FileList'
import ButtonReverse from '../components/ButtonReverse/ButtonReverse'

const Test = () => {
  return (
    <div className='p-10'>
      <ButtonReverse text={"رجوع"}/>
       
        <FileList/>
    </div>
  )
}

export default Test