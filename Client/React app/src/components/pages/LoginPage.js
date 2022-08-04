import React, { useEffect, useState, useContext }from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { AppContext } from '../../AppContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import '../../App.css'


export default function SignInPage(props) {
    const {appvalue, setAppvalue} = useContext(AppContext);

    let history = useHistory();
    

    const [username, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [response, setShowResponse] = useState(false);
    const [test, setTest] = useState(false);

    let temp = []
    let testemp = []
    

    // let callApi = async (e) => {
    //     alert("hi there")
    //     // Simple POST request with a JSON body using fetch
    //     let testList = []
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({"username": username,"pwd": pwd})
    //     };

    //     console.log(requestOptions)
    //     alert(requestOptions)
    //     fetch('/verify_user', requestOptions)
    //         .then(data => data.json())
    //         .then(json => {
    //           testList =  json.projects
    //           temp = testList
            
    //     alert("hi there")
    //           handleState(temp);
    //           if(json.message === "success")  
    //             {
    //               setAppvalue("SanjoSHHHaju")
    //               console.log({appvalue})
    //               window.location.href = "/selectproject"
    //           }
    //           else alert(JSON.stringify(json))
            

    //         })

        

    //     setUserName("")
    //     setPwd("")
            
    //   }


    let callApi = async (e) => {
      e.preventDefault();
      let testList = []
    try {
      let res = await fetch("/verify_user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": username,"pwd": pwd}),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        testList =  resJson.projects
        temp = testList
        handleState(temp);

        setAppvalue(resJson.username)
        console.log({appvalue})
        window.location.href = "/selectproject"
      } else {
        alert("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

    function handleState(temp) {
      alert("handleState")
      testemp = temp
      console.log(testemp)
      history.push({
        pathname: "/selectproject",
        state: temp
      });
      

    }
      
    
    return (
        <div className="text-center m-5-auto">
          <h2>User Login</h2>
          <h5>Login to your account</h5>
            {/* <form onClick="return formResponse();">
                <p>
                <label>Enter User Name</label>
                <br></br>
                <input type="text" id="username" value={username}  onChange={(e) => setUserName(e.target.value)}/>
                </p>
                <label>Enter Password </label>
                <br></br>
                <input type="password" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            </form>
            

            <div>
              <p>
            <button onClick={callApi}>SUBMIT</button >
              </p>
             
            </div> */}
            <Form onSubmit={callApi}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" value={username} placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="pwd">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={pwd} placeholder=" Enter Password" onChange={(e) => setPwd(e.target.value)} />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              <Button type='submit' variant="secondary">
                Submit
              </Button>
            </Form>
        </div>
      );
   
}