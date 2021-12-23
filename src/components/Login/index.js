import React, { Component } from "react";
import { getAPIUrl } from "../../config/config";
import { withRouter } from "react-router-dom";
import {
  Input,
  Toast,
  ToastContainer,
  IconSettings,
} from "@salesforce/design-system-react";
import { setCookie } from "../../utils/cookie";
import {
  SfdcFlexColum,
  SfdcFixedLogo,
  SfdcLoginContainer,
  SfdcCardLogin,
} from "./styles";

/**
 *
 * TBD:: Deprecated since SSO
 */
class Login extends Component {
  state = {
    username: "",
    password: "",
    toast: {
      heading: "Something went wrong",
      isOpened: false,
    },
    errors: {},
  };

  componentDidMount() {
    this.setupAndFetch();
  }

  setupAndFetch = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
  };

  validations = (res) => {
    if (this.state.username === "") {
      this.setState({ errors: { username: true } });
      return true;
    }

    if (this.state.password === "") {
      this.setState({ errors: { password: true } });
      return true;
    }
  };

  login = async (e) => {
    e.preventDefault();
    let { username, password } = this.state;

    try {
      let body = { username, password };
      localStorage.setItem("userEmail", username);
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      let response = await fetch(`${this.API_URL}/login`, config);

      if (response.status === 200) {
        let { result } = await response.json();

        if (!this.validations()) {
          let { userId, role, token, name } = result;

          !userId && this.setState({ errors: { invalid: true } });

          userId && localStorage.setItem("userId", userId);
          userId && localStorage.setItem("name", name);
          userId && setCookie("userid", userId);
          userId && setCookie("username", username);
          userId && setCookie("name", name);
          token && setCookie("token", token);
          setCookie("role", role || "user");
          this.props.history.push("/home");
        }
      } else throw new Error(response);
    } catch (err) {
      this.setState({
        toast: {
          isOpened: true,
          heading: "Something went wrong, please try again",
        },
      });
      console.error(err);
    }
  };

  handleChange = (e) => {
    let errors = { ...this.state.errors };
    if (e.target.value.length === 0) {
      errors = { ...errors, [e.target.name]: true };
    } else {
      delete errors[e.target.name];
    }
    this.setState({ [e.target.name]: e.target.value, errors });
  };

  render() {
    return (
      <SfdcLoginContainer className="slds-grid slds-wrap slds-align_absolute-center">
        <SfdcFlexColum>
          <IconSettings iconPath="/assets/icons">
            <ToastContainer>
              {this.state.toast.isOpened && (
                <Toast
                  labels={{ heading: this.state.toast.heading }}
                  variant="error"
                  onRequestClose={() =>
                    this.setState({ toast: { isOpened: false } })
                  }
                  duration={4000}
                />
              )}
            </ToastContainer>
          </IconSettings>
          <SfdcFixedLogo
            className="slds-m-bottom_medium"
            src="assets/images/logo.svg"
            alt="Salesforce logo"
          />
          <article className="slds-card">
            <SfdcCardLogin className="slds-card__body slds-card__body_inner">
              <form onSubmit={(e) => this.login(e)}>
                {this.state.errors.invalid && (
                  <div className="slds-form-element slds-has-error">
                    <div
                      className="slds-form-element__help"
                      id="error-message-unique-id"
                    >
                      Invalid credentials
                    </div>
                  </div>
                )}
                <div className="slds-form-element">
                  <Input
                    placeholder="Enter username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    name="username"
                    label="Username"
                    errorText={
                      this.state.errors.username && "This field is required"
                    }
                  />
                </div>
                <div className="slds-form-element slds-m-top_small">
                  <Input
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    name="password"
                    label="Password"
                    errorText={
                      this.state.errors.password && "This field is required"
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="slds-button slds-button_brand slds-button_stretch slds-m-top_small"
                >
                  Login
                </button>
              </form>
            </SfdcCardLogin>
          </article>
        </SfdcFlexColum>
      </SfdcLoginContainer>
    );
  }
}

export default withRouter(Login);
