import React, {Fragment, useState} from "react";
import {Col, Form, Modal, message, Avatar} from "antd/lib/index";
import play from '../../assets/images/play.png'
import  {intlMessages} from "../../util/IntlMessages";
import {Button} from "antd";
import user from "../../assets/images/placeholder.jpg";
import picture from "../../assets/images/picture.png";
import {apiFileUrl} from '../../util/constants'
export const FileUpload = ({file, types,fileTypeMessage, size, name, onChangeFile, colLayout, formItemLayout, title}) => {
    const [showModal, setShowModal] = useState(false);

    const isValid = (file) => {
        let fileType = types?types.includes(file.type):true;
        let fileSize = file.size / 1024 / 1024 < size;
        if (!fileType) {
            message.error(intlMessages({
                en: `File type ${file.type.toString()} ! Please, please upload a ${fileTypeMessage?fileTypeMessage.toString():types.toString()} type file!`,
                ru: `Тип файла ${file.type.toString()} ! Пожалуйста, загрузите файл типа ${fileTypeMessage?fileTypeMessage.toString():types.toString()}!`,
                uz: `Fayl turi ${file.type.toString()} ! Iltimos, ${fileTypeMessage?fileTypeMessage.toString():types.toString()} turidagi faylni yuklang!`
            }));
        }

        if (!fileSize) {
            message.error(intlMessages({
                en: `File size ${size} ! Please note that the file size should not exceed ${size} !`,
                ru: `Размер файла ${size} ! Обратите внимание, что размер файла не должен превышать ${size} !`,
                uz: `Fayl hajmi ${size} ! Iltimos, fayl hajmi ${size} dan oshmasligi lozim!`
            }));
        }
        return fileType === true && fileSize === true;
    };
    const onChangeFileUpload = (e) => {
        if (isValid(e.target.files[0])) {
            onChangeFile({fileUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files, fileStatus: "update"})
        }
    };
    const uploadButton = (<Fragment>
        <label htmlFor={name} className="d-block m-0">
            <div className={'nnb-upload-block nnb-empty-block'}>
                <div className={'text-block'}>
                    <span className={'icon icon-upload d-block'}/>
                </div>
            </div>
        </label>
        <input type="file" name={name} id={name} onChange={onChangeFileUpload} hidden={true}/>
    </Fragment>);
    const viewFile = (<div className={'nnb-upload-block d-block nnb-img-block'}>
        <img src={file && file.fileUrl} alt="File"/>
        <div className="action-block">
            <span className="icon icon-eye" onClick={() => setShowModal(true)}/>
            <span className="icon icon-trash"
                  onClick={() => onChangeFile({fileUrl: null, file: null, fileStatus: "delete"})}/>
        </div>
    </div>);
    return (<Col {...colLayout}>
        <Form.Item key="file" className="mb-0 ant-form-item-label-upload" label={title} hasFeedback {...formItemLayout}>
            <div className={'nnb-upload'}>
                {file && file.file ? viewFile : uploadButton}
                <Modal
                    footer={null}
                    visible={showModal}
                    onCancel={() => setShowModal(false)}
                >
                    <img src={file && file.fileUrl && file.fileUrl} alt="File"/>
                </Modal>
            </div>
        </Form.Item>
    </Col>)
};
export const MultipleFileUpload = ({files, types, title, size, name, fileUploadCount, onChangeFile, colLayout, formItemLayout}) => {
    const [showModal, setShowModal] = useState(false);
    const [stateFile, setFile] = useState(null);
    const isValid = (file) => {
        let fileType = types.includes(file.type);
        let fileSize = file.size / 1024 / 1024 < size;
        if (!fileType) {
            message.error(intlMessages({
                en: `File type ${types.toString()} ! Please, please upload a ${types.toString()} type file!`,
                ru: `Тип файла ${types.toString()} ! Пожалуйста, загрузите файл типа ${types.toString()}!`,
                uz: `Fayl turi ${types.toString()} !Iltimos, ${types.toString()} turidagi faylni yuklang!`
            }));
        }
        if (!fileSize) {
            message.error(intlMessages({
                en: `File size ${size} ! Please note that the file size should not exceed ${size} !`,
                ru: `Размер файла ${size}! Обратите внимание, что размер файла не должен превышать ${size} !`,
                uz: `Fayl hajmi ${size} ! Iltimos, fayl hajmi ${size} dan oshmasligi lozim!`
            }));
        }
        return fileType === true && fileSize === true;
    };

    const onChangeFileUpload = (e) => {
        let fileList = e.target.files;
        let resultFiles = [];
        let count = 0;
        for (let i in fileList) {
            if (typeof fileList[i] === "object") {
                if (isValid(fileList[i]) && count < fileUploadCount) {
                    resultFiles.push({
                        fileUrl: URL.createObjectURL(fileList[i]),
                        file: fileList[i],
                        fileStatus: "update"
                    });
                    count++
                }
            }
        }
        onChangeFile([...files, ...resultFiles])
    };
    const onDeleteFile = (dataItem) => {
        let resultFiles = files.filter(item => item.fileUrl !== dataItem.fileUrl);
        onChangeFile(resultFiles);
    };
    const uploadButton = (
        <Fragment>
            <label htmlFor={name} className="d-inline-block m-0">
                <div className={'nnb-upload-block nnb-empty-block'}>
                    <div className={'text-block'}>
                        <span className={'icon icon-upload d-block'}/>
                    </div>
                </div>
            </label>
            <input type="file" name={name} id={name} multiple={true} onChange={onChangeFileUpload} hidden={true}/>
        </Fragment>
    );
    const viewFiles = (files) => {
        if (files.length !== 0) {
            return files.map((item) => (
                <div className={'nnb-upload-block nnb-img-block d-inline-block'} key={item.fileUrl}>
                    <img src={item.fileUrl} alt="File"/>
                    <div className="action-block">

                        <span className="icon icon-eye" onClick={() => {
                            setShowModal(true);
                            setFile(item.fileUrl)
                        }}/>

                        <span className="icon icon-trash" onClick={() => onDeleteFile(item)}/>
                    </div>
                </div>
            ))
        }
    };

    return (
        <Col {...colLayout}>
            <Form.Item key="file" className="mb-0" label={title} hasFeedback {...formItemLayout}>
                <div className={'nnb-upload'}>
                    {viewFiles(files)}
                    {files.length < fileUploadCount && uploadButton}
                    <Modal footer={null} visible={showModal} onCancel={() => {
                        setShowModal(false);
                        setFile(null)
                    }}>
                        <img src={stateFile} alt="File"/>
                    </Modal>
                </div>
            </Form.Item>
        </Col>
    )

};
export const MultipleFileVideoUpload = ({files, types, title, size, name, fileUploadCount, onChangeFile, colLayout, formItemLayout}) => {
    const [showModal, setShowModal] = useState(false);
    const [stateVideo, setVideo] = useState(null);

    const isValid = (file) => {
        let fileType = types.includes(file.type);
        let fileSize = file.size / 1024 / 1024 < size;
        if (!fileType) {
            message.error(intlMessages({
                en: `File type ${types.toString()} ! Please, please upload a ${types.toString()} type file!`,
                ru: `Тип файла ${types.toString()} ! Пожалуйста, загрузите файл типа ${types.toString()}!`,
                uz: `Fayl turi ${types.toString()} ! Iltimos, ${types.toString()} turidagi faylni yuklang!`
            }));
        }
        if (!fileSize) {
            message.error(intlMessages({
                en: `File size ${size} ! Please note that the file size should not exceed ${size} !`,
                ru: `Размер файла ${size}! Обратите внимание, что размер файла не должен превышать ${size} !`,
                uz: `Fayl hajmi ${size} ! Iltimos, fayl hajmi ${size} dan oshmasligi lozim!`
            }));
        }
        return fileType === true && fileSize === true;
    };

    const onChangeFileUpload = (e) => {
        let fileList = e.target.files;
        let resultFiles = [];
        let count = 0;
        for (let i in fileList) {
            if (typeof fileList[i] === "object") {
                if (isValid(fileList[i]) && count < fileUploadCount) {
                    resultFiles.push({
                        fileUrl: URL.createObjectURL(fileList[i]),
                        file: fileList[i],
                        fileStatus: "update"
                    });
                    count++;
                }
            }
        }
        onChangeFile([...files, ...resultFiles])
    };
    const onDeleteFile = (dataItem) => {
        let resultFiles = files.filter(item => item.fileUrl !== dataItem.fileUrl);
        onChangeFile(resultFiles)
    };
    const uploadButton = (
        <Fragment>
            <label htmlFor={name} className="d-inline-block m-0">
                <div className={'nnb-upload-block nnb-empty-block'}>
                    <div className={'text-block'}>
                        <span className={'icon icon-upload d-block'}/>
                    </div>
                </div>
            </label>
            <input type="file" name={name} id={name} multiple={true} onChange={onChangeFileUpload} hidden={true}/>
        </Fragment>
    );
    const viewFiles = (files) => {
        if (files.length !== 0) {
            return files.map((item) => (
                <div className={'nnb-upload-block nnb-img-block d-inline-block'} key={item.fileUrl}>
                    <img src={play} style={{width: "100%", height: "100%"}} alt="File"/>
                    <div className="action-block">
                        <span className="icon icon-eye" onClick={() => {
                            setShowModal(true);
                            setVideo(item.fileUrl)
                        }}/>
                        <span className="icon icon-trash" onClick={() => onDeleteFile(item)}/>
                    </div>
                </div>
            ))
        }
    };

    return (
        <Col {...colLayout}>
            <Form.Item key="file" className="mb-0" label={title} hasFeedback {...formItemLayout}>
                <div className={'nnb-upload'}>
                    {viewFiles(files)}
                    {files.length < fileUploadCount && uploadButton}
                    <Modal
                        footer={null}
                        visible={showModal}
                        onCancel={() => setShowModal(false)}
                    >
                        <video src={stateVideo} controls style={{width: "100%", height: "100%"}}/>
                    </Modal>
                </div>
            </Form.Item>
        </Col>
    )

};
export const FileView = ({fileId, defaultView}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Fragment>
            <Button className="bg-transparent border-0 mb-0" onClick={() => setShowModal(true)}>
                <Avatar src={defaultView==="user"?user:picture} alt={"File"}/>
            </Button>
            <Modal
                footer={null}
                width={700}
                visible={showModal}
                onCancel={() => setShowModal(false)}
            >
                {fileId===null?<img src={defaultView==="user"?user:picture} alt="File"/>:<img src={apiFileUrl + fileId} alt="File"/>}
            </Modal>
        </Fragment>

    )
};
