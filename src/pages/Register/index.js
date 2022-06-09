import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Register now!</h1>
          <p className="lead">
            Register now and start shopping in the most affordable ecommerce
            platform
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4 offset-4">
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bold mb-3">Register</h5>
              <input
                name="fullName"
                placeholder="Full Name"
                type="text"
                className="form-control my-2"
              />
              <input
                name="username"
                placeholder="Username"
                type="text"
                className="form-control my-2"
              />
              <input
                name="email"
                placeholder="Email"
                type="text"
                className="form-control my-2"
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                className="form-control my-2"
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button className="btn btn-primary mt-2">Register</button>
                <Link to="/login">Or login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
