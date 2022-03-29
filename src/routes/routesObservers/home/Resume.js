import React, { Component } from "react";
import { Modal } from "antd";
import { FileUpload } from "../../../components/CustomComponents";

import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class Resume extends Component {
  render() {
    const {
      file,
      fileStatus,
      vacancy,
      onChangeFile,
      currentData,
      onChange,
      modalVisible,
      isEmailValid,
      onSubmit,
      onCancel,
    } = this.props;

    const vacancyList = vacancy.map((item) => {
      return (
        <option value={item._id} key={item._id} id={item._id}>
          {item.title.en}
        </option>
      );
    });
    return (
      <div>
        <Modal
          className="nnb-resume-modal"
          visible={modalVisible}
          bodyStyle={{ height: 400, overflowY: "auto", opacity: 0.9 }}
          destroyOnClose={true}
          width={700}
          onCancel={onCancel}
          footer={null}
          wrapClassName={"vertical-center-modal"}
        >
          <div className="col-md-12">
            <div className="wpb_column vc_column_container vc_col-sm-9 vc_col-has-fill">
              <div id="comments" className="comments-area mt-0">
                <div id="respond" className="comment-respond mt-4">
                  <form id="commentform" className="comment-form">
                    <div
                      className="comment-form-author"
                      style={{
                        width: "100%",
                        display: "block",
                        paddingRight: 0,
                      }}
                    >
                      <label htmlFor="author">
                        <IntlMessages id={"fullName"} />
                        <span className="required">*</span>
                      </label>
                      <input
                        id="author"
                        name="fullName"
                        type="text"
                        onChange={(e) =>
                          onChange({ name: "fullName", value: e.target.value })
                        }
                        value={
                          currentData.fullName === null
                            ? ""
                            : currentData.fullName
                        }
                        aria-required="true"
                        required="required"
                      />
                      <div
                        className={
                          currentData.fullName === null
                            ? "input-error-msg "
                            : "input-error-msg hide"
                        }
                        id="author-err-required"
                      >
                        <IntlMessages id={"placName"} />
                      </div>
                    </div>
                    <div
                      className="comment-form-email"
                      style={{
                        width: "100%",
                        display: "block",
                        paddingLeft: 0,
                      }}
                    >
                      <label htmlFor="email">
                        <IntlMessages id={"email"} />
                        <span className="required">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        onChange={(e) =>
                          onChange({
                            name: "email",
                            value: e.target.value,
                          })
                        }
                        value={
                          currentData.email === null ? "" : currentData.email
                        }
                        type="email"
                        size={30}
                        aria-required="true"
                        required="required"
                      />
                      <div
                        className={
                          isEmailValid
                            ? "input-error-msg"
                            : "input-error-msg hide"
                        }
                        id="email-err-required"
                      >
                        <IntlMessages id={"placEmail"} />
                      </div>
                      <div
                        className={
                          currentData.email === null
                            ? "input-error-msg "
                            : "input-error-msg hide"
                        }
                        id="email-err-valid"
                      >
                        <IntlMessages id={"placValidEmail"} />
                      </div>
                    </div>
                    <div className="comment-form-url">
                      <label htmlFor="phoneNumber">
                        <IntlMessages id={"phoneNumber"} />
                        <span className="required">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={(e) =>
                          onChange({
                            name: "phoneNumber",
                            value: e.target.value,
                          })
                        }
                        value={
                          currentData.phoneNumber === null
                            ? ""
                            : currentData.phoneNumber
                        }
                        aria-required="true"
                        required="required"
                      />
                      <div
                        className={
                          currentData.phoneNumber === null
                            ? "input-error-msg "
                            : "input-error-msg hide"
                        }
                        id="author-err-required"
                      >
                        <IntlMessages id={"placePhone"} />
                      </div>
                    </div>
                    <div className="comment-form-vacancy5">
                      <label htmlFor="vacancy">
                        {intlMessages({
                          en: "Vacancy",
                          ru: "Вакансия",
                          uz: "Bo'sh joy",
                        })}
                        <span className="required">*</span>
                      </label>

                      <select
                        className="nnb-select form-contro"
                        id="vacancy"
                        name="vacancy"
                        onChange={(e) =>
                          onChange({ name: "vacancyId", value: e.target.value })
                        }
                        value={currentData.vacancyId}
                        aria-required="true"
                        required="required"
                      >
                        {vacancyList}
                      </select>
                      <div
                        className={
                          currentData.vacancyId === null
                            ? "input-error-msg "
                            : "input-error-msg hide"
                        }
                        id="author-err-required"
                      >
                        <IntlMessages id={"placeVacancy"} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-5">
                        <FileUpload
                          name={"main-img"}
                          types={[
                            "application/pdf",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            "file.type application/msword",
                          ]}
                          fileTypeMessage={[" .doc", " .docx ", " .pdf"]}
                          title={<IntlMessages id="mainFile" />}
                          size={50}
                          formItemLayout={formItemLayout}
                          file={file}
                          onChangeFile={onChangeFile}
                        />
                        <div
                          className={
                            fileStatus
                              ? "input-error-msg"
                              : "input-error-msg hide"
                          }
                          id="author-err-required"
                        >
                          <IntlMessages id={"resumeFileNotUploaded"} />
                        </div>
                      </div>
                      <div className="col-md-6 mb-5">
                        <div className="form-submit nnb-btn-block ">
                          <button
                            name="submit"
                            id="submit"
                            type="submit"
                            onClick={onSubmit}
                            className="submit submit px-5 py-2 "
                          >
                            <IntlMessages id={"send"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Resume;
