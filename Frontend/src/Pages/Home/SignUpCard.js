
import React from "react";
import { Link, useHistory } from "react-router-dom";
function SignUpCard() {
  return (
    <div>
        <div className="container-fluid mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top mx-auto mt-3 w-50"
                  src="https://cdn-icons-png.flaticon.com/512/4264/4264818.png"
                  alt="admin"
                />
                <div className="card-body">
                  <h5 className="card-title"><b>Welcome Customer</b></h5>
                  <br />
                  <p className="card-text">
                    "Welcome Customer to our food paradise! Explore flavors that will tickle your taste buds and experience culinary delight like never before."  <br />
                  </p>
                  
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                  <div class="dropdown">
                        <button class="btn btn-info dropdown-toggle rounded-pill" type="button" id="dropdownMenuButton2"  data-bs-toggle="dropdown" aria-expanded="false">
                            Customer
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                            <li><Link class="dropdown-item active" to={"/customer/signin"}>Sign In</Link></li>
                            <li><Link class="dropdown-item active" to={"/customer/signup"}>Sign Up</Link></li>
                        </ul>
                    </div>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top mx-auto mt-3 w-50"
                  src="https://cdn-icons-png.flaticon.com/512/6008/6008873.png"
                  alt="admin"
                />
                <div className="card-body">
                  <h5 className="card-title"><b>Welcome Restaurant Manager</b></h5>
                  <p className="card-text">
                  "Greetings,esteemed! Your expertise and passion are the heartbeats of our culinary journey, and we're excited to collaborate for an exceptional dining experience."
                  </p>
                  
                </div>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">
                <div class="dropdown">
                        <button class="btn btn-info dropdown-toggle rounded-pill" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            Restaurant Manager
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                            <li><Link class="dropdown-item active" to={"/manager/signin"}>Sign In</Link></li>
                            <li><Link class="dropdown-item active" to={"/manager/signup"}>Sign Up</Link></li>
                        </ul>
                    </div>
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top mx-auto mt-3 w-50"
                  src="https://cdn-icons-png.flaticon.com/512/2830/2830312.png"
                  alt="admin"
                />
                <div className="card-body">
                  <h5 className="card-title"><b>Welcome Delivery Boy</b></h5>
                  <p className="card-text">
                    "Hello, dedicated Delivery Hero! Your swift service ensures culinary joy reaches doorsteps. Thank you for being a crucial part of our food adventure!"
                  </p>
                  
                </div>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">
                <div class="dropdown">
                        <button class="btn btn-info dropdown-toggle rounded-pill" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            Delivery Person
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                            <li><Link class="dropdown-item active" to={"/dp/signin"}>Sign In</Link></li>
                            <li><Link class="dropdown-item active" to={"/deliveryperson/signup"}>Sign Up</Link></li>
                        </ul>
                    </div>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default SignUpCard