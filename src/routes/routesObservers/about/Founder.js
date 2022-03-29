import React from "react";
import founder from '../../../assets/images/ark-client/images/founder.png';
import './founderStyle.css'
import IntlMessages from "../../../util/IntlMessages";
const Founder = ()=>{
    return(
        <div className="founder-wrapper">
            <img  src={founder}  alt="Company Founder"/>
            <div className="founder-text">
           <h3 className="founder-name"><IntlMessages id={"founderName"} /></h3>
                <h4 className="found-year">06.12.1977 - 19.06.2020</h4>
                <h4><IntlMessages id={"founderRole"} /></h4>
                {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta fugit quod enim tenetur odit veniam sequi incidunt. Nam earum sunt, molestias maiores laboriosam harum quod repellendus perspiciatis provident nisi itaque tenetur beatae ea reiciendis optio obcaecati cum ipsam voluptatum. Id ad fugiat harum saepe quis tenetur, inventore non dicta debitis quos nostrum excepturi nesciunt voluptatibus, doloribus libero ut temporibus repudiandae voluptatem dolore animi commodi? Quidem velit pariatur corporis. Veritatis dolor excepturi soluta ex ratione illum exercitationem nemo voluptatum fuga maiores possimus in perferendis enim modi nobis cumque labore perspiciatis ut laudantium, praesentium quibusdam eum sapiente deserunt. Aliquam unde fugiat consectetur!</p> */}
                <p class='founder-text founder-text-1'><IntlMessages id={"founderText1"} /></p>
                <p class='founder-text founder-text-2'><IntlMessages id={"founderText2"} /></p>
                <p class='founder-text founder-text-3'><IntlMessages id={"founderText3"} /></p>
            </div>
        </div>
    )
}
export default Founder;