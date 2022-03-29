import React, {Component} from "react";
import {Card} from "antd";
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import IntlMessages from "util/IntlMessages";

class WYSISWYG extends Component {

  render() {
    return (

      <Card className="gx-card nnb-simple-card" title={<IntlMessages id={this.props.title}/>}>
        <Editor editorStyle={{
          width: '100%',
          minHeight: 100,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'lightgray'
        }}
                editorState={this.props.text===""?EditorState.createEmpty():this.props.text}
                wrapperClassName="demo-wrapper"
                onEditorStateChange={this.props.onEditorChange}
        />
    {/*    <textarea style={{width: '100%', height: 200}}
                  disabled
                  value={draftToHtml(convertToRaw(this.props.text===""?EditorState.createEmpty().getCurrentContent():this.props.text.getCurrentContent()))}
        />*/}
      </Card>
    );
  }
}

export default WYSISWYG;
