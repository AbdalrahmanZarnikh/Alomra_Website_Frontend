import {saveAs} from "file-saver"

const DownloadFile = ({url,name ,text="اضغط لتحميل الصورة"}) => {

  return (
    <div >
        <button onClick={()=>{
            saveAs(url,name) 
        }} className="text-sm bg-white p-2 rounded-lg hover:bg-white/50 cursor-pointer print:hidden">{text}</button>
    </div>
  )
}

export default DownloadFile