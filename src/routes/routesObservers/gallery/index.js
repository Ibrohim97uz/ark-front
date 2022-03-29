// import React, {Component} from "react";
// import {Link} from "react-router-dom";
// import IntlMessages, {intlMessages} from "../../../util/IntlMessages";
// import LightGallery from "lightgallery/react";
// // import styles
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";
//
// // If you want you can use SCSS instead of css
// import "lightgallery/scss/lightgallery.scss";
// import "lightgallery/scss/lg-zoom.scss";
// import lgZoom from "lightgallery/plugins/zoom";
// import ApiRequest from "../../../services";
// import api from '../../../services/app'
// import {apiFileUrl} from '../../../util/constants'
//
// const {getGallery} = api;
//
// class About extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       gallery: []
//     };
//   }
//
//   componentDidMount() {
//     this.getGallery()
//   }
//
//   getGallery = () => {
//     ApiRequest(getGallery).then((result) => {
//       if (result.success) {
//         this.setState({
//           gallery: result.object
//         })
//       }
//     })
//   };
//
//
//   getGalleryList = () => {
//     const {gallery} = this.state;
//     if (gallery && gallery.length !== 0) {
//       return gallery.map((item, index) => (
//         <a className="gallery-item" key={index}
//            data-src={apiFileUrl + item.attachment.id}
//         >
//           <img className="img-fluid"
//                src={apiFileUrl + item.attachment.id}
//           />
//         </a>
//       ))
//     } else {
//       return <div className="item text-center -vertical-align-middle w-100 text-center">
//         <h1><IntlMessages id={'empty'}/></h1>
//       </div>
//     }
//   }
//
//   render() {
//     return (
//       <React.Fragment>
//         <div className=" slz-title-command slz-title-command-blog-gallery page-title-area ">
//           <div className="container">
//             <div className="title-command-wrapper">
//               <h1 className="title">
//                 <IntlMessages id={"gallery"}/>
//               </h1>
//               <div className="breadcrumb-wrapper">
//                 <ol className="breadcrumb justify-content-center">
//                   <li className="breadcrumb-item">
//                     <Link className="breadcrumb-link" to={"/home"}>
//                       <IntlMessages id={"home"}/>
//                     </Link>
//                   </li>
//                   <li className="breadcrumb-item">
//                     <Link className="breadcrumb-active" to={"/gallery"}>
//                       <IntlMessages id={"gallery"}/>
//                     </Link>
//                   </li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="slz-woocommerce-setting" data-show="4"/>
//         <div className="slz-main-content ">
//           <div className="container">
//             <div className="slz-blog-detail slz-posts ">
//               <div className="row">
//                 <div
//                   id="page-content"
//                   className="col-md-12 col-sm-12 col-xs-12 slz-content-column"
//                 >
//                   <div className="page-detail-wrapper">
//                     <div className="entry-content">
//                       <div className="vc_row wpb_row vc_row-fluid">
//                         <div className="wpb_column vc_column_container vc_col-sm-12">
//                           <div className="vc_column-inner ">
//                             <div className="wpb_wrapper">
//                               <LightGallery
//
//                                 plugins={[lgZoom]} mode="fade" showZoomInOutIcons={true} actualSize={false}>
//                                 {/*{this.getGalleryList()}*/}
//                                 {
//                                   this.state.gallery.map((item, index) => (
//                                     <a className="gallery-item" key={index}
//                                        data-src={apiFileUrl + item.attachment.id}
//                                     >
//                                       <img className="img-fluid"
//                                            src={apiFileUrl + item.attachment.id}
//                                       />
//                                     </a>
//                                   ))
//                                 }
//                                 <a className="gallery-item"
//                                    data-src={apiFileUrl + "2f81fe09-e12b-49ad-acf5-75727c9e30c0"}
//                                 >
//                                   <img className="img-fluid"
//                                        src={apiFileUrl + "2f81fe09-e12b-49ad-acf5-75727c9e30c0  "}
//                                   />
//                                 </a>
//                               </LightGallery>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <footer className="entry-footer"></footer>
//                 </div>
//               </div>
//               <div className="clearfix"/>
//             </div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }
//
// export default About;

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import ApiRequest from "../../../services";
import api from "../../../services/app";
import { apiFileUrl } from "../../../util/constants";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import LazyLoad from "react-lazyload";

const { getGallery } = api;

function App() {
  const lightGallery = useRef(null);
  const [items, setItems] = useState([]);
  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const getItems = useCallback(() => {
    return items.map((item) => {
      if (item.image) {
        return (
          <a
            key={item._id}
            className="gallery-item"
            data-src={apiFileUrl + item.image}
          >
            <LazyLoad>
              <img className="img-responsive" src={apiFileUrl + item.image} />
            </LazyLoad>
          </a>
        );
      }
    });
  }, [items]);

  const apiGetGallery = () => {
    ApiRequest(getGallery).then((result) => {
      if (result.success) {
        setItems(result.galleries);
      }
    });
  };

  useEffect(() => {
    if (lightGallery && lightGallery.current) {
      lightGallery.current.refresh();
    }
  }, [items]);

  useEffect(() => {
    apiGetGallery();
  }, []);

  return (
    <React.Fragment>
      <div className=" slz-title-command slz-title-command-blog-gallery page-title-area ">
        <div className="container">
          <div className="title-command-wrapper">
            <h1 className="title">
              <IntlMessages id={"gallery"} />
            </h1>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link className="breadcrumb-link" to={"/home"}>
                    <IntlMessages id={"home"} />
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link className="breadcrumb-active" to={"/gallery"}>
                    <IntlMessages id={"gallery"} />
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="slz-woocommerce-setting" data-show="4" />
      <div className="slz-main-content ">
        <div className="container">
          <div className="slz-blog-detail slz-posts ">
            <div className="row">
              <div
                id="page-content"
                className="col-md-12 col-sm-12 col-xs-12 slz-content-column"
              >
                <div className="page-detail-wrapper">
                  <div className="entry-content">
                    <div className="vc_row wpb_row vc_row-fluid">
                      <div className="wpb_column vc_column_container vc_col-sm-12">
                        <div className="vc_column-inner ">
                          <div className="wpb_wrapper">
                            {items && items.length !== 0 ? (
                              <LightGallery
                                plugins={[lgZoom]}
                                elementClassNames="custom-class-name"
                                onInit={onInit}
                              >
                                {getItems()}
                              </LightGallery>
                            ) : (
                              <div className="item text-center -vertical-align-middle w-100 text-center mb-5">
                                <h1>
                                  <IntlMessages id={"empty"} />
                                </h1>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="entry-footer"></footer>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
