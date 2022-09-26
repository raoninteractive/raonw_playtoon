import React, { useCallback, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/pro-solid-svg-icons";

/**
 * 
 * 이미지 파일 drag n drop, preivew 컴포넌트 
  <ImageUpload
    ref={refCoverImage}
    className={"small"}
    preview={imageUrl}
    id={"filebox2"}
    name={"coverImage"}                     
    text={text.drag_drop}    
    />
  
  ex) 이미지 파일 정보 가져오기 file, preview, hash
    refCoverImage.current.getImageFile();
  ex) hash 정보 input에 넣기 
    refCoverImage.current.setImageHash(hash);
  ex) image file 정보 input에 넣기 
    refCoverImage.current.setImage(fileUrl, hash);
 * @version 1.0.0
 * @author 2hyunkook
 * @param ref image file 접근을 위한 reference 
 * @param className box_drag 와 같이 쓰일 class name
 * @param preview image preview
 * @param id file input tag id
 * @param name upload parameter name (hash값을 가진 input tag name)
 * @param text 평소에 보여질 drag n drop text
 */
export default forwardRef(function ImageUpload(props, ref) {
  // file : 컴퓨터에서 선택된 file, preview : preview로 보여질 이미지(file url, data url), hash : 파일 업로드 후 받아온 hash
  const initImageObject = {file: undefined, preview: undefined, hash: undefined};
  const { className, preview, text, name, id } = props;
  const [image, setImageFile] = useState(initImageObject);

  
  /**
  *
     업로드 전 preview 생성
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {*} file
  */
  const setPreviewImage = (file) => {
    const reader = new FileReader();

    if(file){
      reader.readAsDataURL(file);
    }
    
    reader.onload = () => {
      setImageFile({
        ...image,
        file: file,
        preview: reader.result
      });
    };
  };

  //=============== file drag n drop 설정 ===============
  const onDrop = useCallback(async (acceptedFiles) => {
    setPreviewImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, } = useDropzone({ onDrop }); //isDragActive
  const InputProps = {
    ...getInputProps(),
    multiple: false,
    accept: "image/gif, image/jpg, image/jpeg, image/png",
    type: "file"
  };
  const RootProps = {
    ...getRootProps(),
  };
  //==============================================================================

  const handlePreviewClose = () => {
    setImageFile(initImageObject);
  };

  useImperativeHandle(ref, () => ({
    setImageHash: (hash) => {
      setImageFile({...image, hash: hash});
    },
    setImage: (fileUrl, hash) => {
      setImageFile({...image, preview: fileUrl, hash: hash});
    },
    getImageFile: () => {
      return image;
    }
  }));

  useEffect(() => {
    setImageFile({
      ...image,
      preview : preview
    });
  }, [preview]);

  return (
    <div 
      className={`${className}`}
       >
        {/* upload에 쓰일 hash 값 저장 */}
      <input type={"text"} name={name} defaultValue={image?.hash} style={{display: "none"}} />  
        {/* file input tag */}
      <input {...InputProps} id={id} />
      {
        image?.preview === undefined ? (
          <label htmlFor={id} className="filetxt">
            <div 
              {...RootProps} 
              maxsize={100} 
              multiple={false} 
              className={`image_upload`} >
                {
                  text === undefined ? 
                    <div className="ico"><FontAwesomeIcon icon={faCirclePlus} /></div>
                    :
                    <div className="txt">
                      <div className="ico"><FontAwesomeIcon icon={faCirclePlus} /></div>
                      <p className="t">{text}</p>
                    </div>
                }
                
            </div>
          </label>
        ) : (
          <div className={"fileview"}>
            <div><img src={image?.preview} alt="preview" /></div>
            <button type="button" className="btn_del" title="削除">
              <FontAwesomeIcon 
                    icon={faCircleXmark}
                    onClick={handlePreviewClose}
                    />
              </button>
          </div>
        )
      }
    </div>
  );
});