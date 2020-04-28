import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button,Card} from 'react-bootstrap';
import { IoMdRefreshCircle } from 'react-icons/io';
import axios from 'axios';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export class Pick extends Component {
    constructor(props){
        super(props);
        this.state={
            photo:undefined,
            photoURI:'',
            buttonText:'Upload Image',
            nameIdentified:'',
            desc:'',
            iserror:false,
            loading:false
        }
    }


    recognize=()=>{
        this.setState({
            loading:true
        })
        var formData = new FormData();
        formData.append('image',this.state.photo);

        axios.post(`http://52.77.226.241:8080/image/identify`,formData)
      .then(res => {
        console.log(res.data);
        if(res.data.message != undefined)
        {
            this.setState({
                nameIdentified:res.data.message,
                desc:'',
                iserror:true,
                loading:false
            })
            
        }
        else{
            this.setState({
                nameIdentified:res.data.name,
                desc:res.data.des,
                iserror:false,
                loading:false
            }) 
        }
      })
    }

    handleChange=(e)=>{
        e.preventDefault();
        // this.setState({
        //     loading:true
        // })
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend =()=>{

        
        this.setState({
            photo:file,
            photoURI:reader.result,
            buttonText:"Take Again",
            // loading:false
        })
        //console.log(e.target.files.length)

        }
        if(e.target.files.length>0){reader.readAsDataURL(file);}
        
    }

    render() {
        return (
            <div>
                
                {/* <h1 style={{color:"red"}}>{this.state.photoURI}</h1> */}
                <Card >
                    
                    <div>
                        <br></br>
                        <label className="label-text">Pick Image to verify</label><br></br>
                        
                        <input className ="label-button" 
                        onChange={(e)=>this.handleChange(e)}
                        type="file" name="uploadfile" id="img" style={{ display:"none"}}/>
                    
        <Button style={{padding: "0px",marginTop:"40px",borderRadius:"60px", border:"none"}} variant="primary"><label className="label-button" for="img"><a>{this.state.buttonText}</a></label></Button>

                    </div>
        
                 </Card>

                 {this.state.photoURI.length>0 && <div>
                    <Card >
                        <p className="preview-text">Preview:</p>
                        <img className="preview-image" src={this.state.photoURI}/>
                    </Card>
                    <Button className="label-button" variant="dark" onClick={this.recognize}>Recognize</Button>
                 </div>}
                <div style={{marginTop:"30px"}}>
                <PacmanLoader 
                        css={override}
                        size={25}
                        color={"#0DFFA4"}
                        loading={this.state.loading}
                        />
                </div>
                 

                 {this.state.nameIdentified.length>0 &&     <div className="datat-fetch">
                
                   <h5 style={{color:"#0DFFA4",fontSize:"22px"}}> Details fetched from server :</h5>
                 {!this.state.iserror && <h1 style={{color:"white",fontSize:"20px",color:"#0DFFA4"}}>Name : <span style={{color:'white'}}>{this.state.nameIdentified}</span></h1>}
                 {this.state.iserror && <h1 style={{color:"white",fontSize:"20px",color:"#0DFFA4"}}>Message : <span style={{color:"white"}}> {this.state.nameIdentified}</span></h1>}

                 {!this.state.iserror && <h1 style={{color:"white",fontSize:"20px",color:"#0DFFA4"}}>Quote : <span style={{color:"white"}}> {this.state.desc}</span></h1>}

                </div>}
            </div>
        )
    }
}

export default Pick
