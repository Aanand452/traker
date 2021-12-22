import React, { Component } from "react";
import NavBar from "../NavBar";
import "./styles.css";
// import Modal from "@salesforce/design-system-react/components/modal";
import {
  Button,
  Spinner,
  Modal,
  Icon,
  Combobox,
  IconSettings,
  Input,
} from "@salesforce/design-system-react";
import comboboxFilterAndLimit from "@salesforce/design-system-react/components/combobox/filter";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";
import Activities from "./Activities";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import { nFormatter } from "../../utils/fomatters";
import PlanningViewPrintArea from "./printArea";

class PlanningView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planner: {},
      print: false,
      planner_id: false,
      loading: true,
      modalOpen: false,
      submitModal: false,
      approvalModal: false,
      selectedModal: 0,
      mpTargetToggle: false,
      budgetToggle: false,
      raw_program: {},
      accounts: [
        {
          id: "1",
          email: "leandro.perez@salesforce.com",
          label: "Leandro Perez",
        },
        {
          id: "2",
          email: "james.clifton@salesforce.com",
          label: "James Clifton",
        },
        {
          id: "3",
          email: "rbertram@salesforce.com",
          label: "Renata Bertram",
        },
        {
          id: "4",
          email: "wwalker@salesforce.com",
          label: "Wendy Walker",
        },
        {
          id: "5",
          email: "archanasinha@salesforce.com",
          label: "Archana Sinha",
        },
        {
          id: "5",
          email: "Mairi Williamson",
          label: "mwilliamson@salesforce.com",
        },
        {
          id: "5",
          email: "trina.ng@salesforce.com",
          label: "Trina Ng",
        },
      ],
      accounts2: [
        {
          id: "1",
          email: "vcotte@salesforce.com",
          label: "Vincent Cotte",
        },
        {
          id: "2",
          email: "smccredie@salesforce.com",
          label: "Stephanie McCredie",
        },
        {
          id: "3",
          email: "cprestipino@salesforce.com",
          label: "Cat Prestipino",
        },
        {
          id: "4",
          email: "andrew.ward@salesforce.com",
          label: "Andrew Ward",
        },
        {
          id: "5",
          email: "ivy.ng@salesforce.com",
          label: "Ivy Ng",
        },
        {
          id: "5",
          email: "jkeblejohnston@salesforce.com",
          label: "James Keble-Johnston",
        },
        {
          id: "5",
          email: "shargreaves@salesforce.com",
          label: "Sarah Hargreaves",
        },
        {
          id: "5",
          email: "nichola.palmer@salesforce.com",
          label: "Nichola Palmer",
        },
        {
          id: "5",
          email: "Jeanie.sim@salesforce.com",
          label: "Jeanie Sim Seok Kuan",
        },
        {
          id: "5",
          email: "sfrank@salesforce.com",
          label: "Stuart Frank",
        },
        {
          id: "5",
          email: "lisa.noble@salesforce.com",
          label: "Lisa Noble",
        },
        {
          id: "5",
          email: "npeers@salesforce.com",
          label: "Nick Peers",
        },
      ],
      approve: {
        status: "Pending for Approval",
        note: "",
        date: new Date(),
        submittedBy: "",
      },
      approvalList: [
        {
          type: "",
          date: "21/11/2021",
          email: "harry@salesforce.com",
        },
      ],
      isUserApprover: false,
      approver1Value: "",
      approver2Value: "",
      approver1: [],
      approver2: [],
      offers: [
        {
          id: 1,
          offer: "",
          activities: [
            {
              id: 1,
              title: "",
              format: "",
              date: new Date(),
            },
          ],
        },
      ],
      errorTexts: {
        note: "",
        approver1: "",
        approver2: "",
      },
    };
  }

  _exportPdf = () => {
    this.setState({ print: true });
    // window.print();
    setTimeout(() => {
      html2canvas(document.querySelector("#printable")).then((canvas) => {
        document.body.appendChild(canvas); // if you want see your screenshot in body.
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a2");
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.save("download.pdf");
      });
      this.setState({ print: false });
    }, 300);
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleSubmitModal = () => {
    this.setState({ submitModal: !this.state.submitModal });
  };

  toggleApproveModal = () => {
    this.setState({ approvalModal: !this.state.approvalModal });
  };

  getPlannerByID = async () => {
    const userEmail = getCookie("username").replaceAll('"', "");
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    try {
      let planner_id = window.location.href.split("=");
      if (planner_id.length > 1) {
        // for editing
        planner_id = planner_id[1];
      } else {
        window.location.reload("/planner-view");
      }

      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(
        `${this.API_URL}/program-planner/${planner_id}`,
        config
      );
      let response = await request.json();

      let { result } = response;

      let raw_program = result;

      result.offers.offers = result.offers.offers.map((offer) => {
        return {
          ...offer,
          activities: offer.activities.sort((a, b) => {
            if (a.label > b.label) {
              return 1;
            } else {
              return -1;
            }
          }),
        };
      });
      if (!result.mp_target) {
        result.mp_target = {
          q1: 0,
          q2: 0,
          q3: 0,
          q4: 0,
        };
      }
      let approval_list = [],
        isUserApprover = false;
      if (result.approval) {
        approval_list.push({
          type: "Submitted By",
          date: moment(result.approval.date).format("MMMM DD, YYYY hh:mm a"),
          email: result.approval.submittedBy,
        });
        if (result.approval.approver1)
          for (let app of result.approval.approver1) {
            if (app.email === userEmail) {
              isUserApprover = true;
            }
            if (app.status.toLowerCase() !== "pending for approval") {
              approval_list.push({
                type: app.status,
                email: app.email,
                reason: app.note,
              });
            }
          }

        if (result.approval.approver2)
          for (let app of result.approval.approver2) {
            if (app.email === userEmail) {
              isUserApprover = true;
            }
            if (app.status.toLowerCase() !== "pending for approval") {
              approval_list.push({
                type: app.status,
                email: app.email,
                reason: app.note,
              });
            }
          }
      }

      this.setState({
        userEmail: userEmail,
        planner: result,
        isUserApprover,
        approve: result.approval || {
          status: "Pending for Approval",
          note: "",
          date: new Date(),
          submittedBy: "",
        },
        approvalList: approval_list,
        raw_program,
        planner_id,
        total_budget:
          result.budgets.q1 +
          result.budgets.q2 +
          result.budgets.q3 +
          result.budgets.q4,
        total_mp_target: result.mp_target
          ? parseFloat(
              result.mp_target.q1 +
                result.mp_target.q2 +
                result.mp_target.q3 +
                result.mp_target.q4
            ).toFixed(1)
          : 0,
        loading: false,
      });

      // if (response.info.code === 200) this.setState({ personas: persona });
      // else throw new Error(response.info.status);
    } catch (err) {
      console.log(err);
      // this.showError(err);
    }
  };

  componentDidMount() {
    this.getPlannerByID();
  }

  handleSubmit = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    let planner_id = window.location.href.split("=");
    if (planner_id.length > 1) {
      // for editing
      planner_id = planner_id[1];
      this.setState({ planner_id });
    }

    this.setState({ showLoader: true });

    try {
      const token = getCookie("token").replaceAll('"', "");
      const userId = getCookie("userid").replaceAll('"', "");
      let username = getCookie("username").replaceAll('"', "");
      if (!username) {
        username = localStorage.getItem("userEmail");
      }
      const body = {
        approval: {
          ...this.state.approve,
          submittedBy: username,
          date: new Date(),
          approver1: this.state.approver1.map((item) => {
            return {
              status: "Pending for Approval",
              note: "",
              email: item.email,
            };
          }),
          approver2: this.state.approver2.map((item) => {
            return {
              status: "Pending for Approval",
              note: "",
              email: item.email,
            };
          }),
        },
      };
      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...this.state.raw_program, ...body }),
      };

      const response = await fetch(
        `${this.API_URL}/program-planner/${planner_id}`,
        config
      );

      if (response.status === 200) {
        this.setState({ submitModal: !this.state.submitModal });
        // window.location.reload();
        // this.props.history.push({
        //   pathname: "/planner-view",
        //   state: { newProgram: true },
        // });
      } else {
        throw new Error("Something went wrong, please try again");
      }
    } catch (err) {
      console.log(err);
      // this.setState({ showLoader: false });
      // this.showError(err);
    }
  };

  handleApprove = async (type) => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    let planner_id = window.location.href.split("=");
    if (planner_id.length > 1) {
      // for editing
      planner_id = planner_id[1];
      this.setState({ planner_id });
    }

    this.setState({ showLoader: true });

    try {
      const token = getCookie("token").replaceAll('"', "");
      const userId = getCookie("userid").replaceAll('"', "");
      const username = getCookie("username").replaceAll('"', "");
      const body = {
        status: type === "accept" ? "Accepted" : "Rejected",
        note: this.state.approve.note,
        planner_id,
        email: username,
      };
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(
        `${this.API_URL}/planner-approve/${planner_id}`,
        config
      );

      if (response.status === 200) {
        this.setState({ approvalModal: !this.state.approvalModal });
        // window.location.reload();
        // this.props.history.push({
        //   pathname: "/planner-view",
        //   state: { newProgram: true },
        // });
      } else {
        throw new Error("Something went wrong, please try again");
      }
    } catch (err) {
      console.log(err);
      // this.setState({ showLoader: false });
      // this.showError(err);
    }
  };

  render() {
    const { planner, loading, total_budget, total_mp_target } = this.state;

    if (loading) {
      return (
        <div>
          <Spinner
            size="small"
            variant="brand"
            assistiveText={{ label: "Loading..." }}
          />
        </div>
      );
    }

    let { offers } = planner.offers;

    return (
      <div>
        <IconSettings iconPath="assets/icons">
          <div style={{ backgroundColor: "white", paddingLeft: "10px" }}>
            <NavBar />
            <div
              style={{
                marginTop: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h1
                  style={{
                    fontSize: "40px",
                    marginLeft: "10px",
                    fontWeight: 500,
                  }}
                >
                  {planner.programName}
                  {/* <span style={{ paddingLeft: "4px" }}>
                    ({planner.region[0].label})
                  </span> */}
                </h1>
                <div style={{ width: "30%" }}>
                  <div className="owner">Owner</div>
                  <div className="owner-name">{planner.programOwner}</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "25px",
                }}
              >
                <div className="program">Program Overview (abstract)</div>
                <div className="program-details">{planner.abstract}</div>
              </div>
            </div>
            <div style={{ margin: "10px" }} className="grid grid-cols-10">
              <div className="col-span-2">
                <div>
                  <div
                    className="card"
                    style={{ marginBottom: "25px", border: "none" }}
                  >
                    <div
                      className="card-head"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() =>
                        this.setState({
                          mpTargetToggle: !this.state.mpTargetToggle,
                        })
                      }
                    >
                      <div>
                        <span>MP Target :</span>
                        {this.state.mpTargetToggle && (
                          <span className="card-head-value">
                            $
                            {nFormatter(
                              parseFloat(total_mp_target).toFixed(0),
                              0
                            )}
                          </span>
                        )}
                      </div>
                      <div>
                        {this.state.mpTargetToggle ? (
                          <Button
                            style={{ border: "none", color: "black" }}
                            iconName="up"
                          />
                        ) : (
                          <Button
                            style={{ border: "none", color: "black" }}
                            iconName="down"
                          />
                        )}
                      </div>
                    </div>
                    {this.state.mpTargetToggle && (
                      <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                    )}

                    {/* <div className="card-head">
                      <span> Budget :</span>
                      <span className="card-head-value">
                        $<span>{parseFloat(total_budget).toFixed(0)}</span>K
                      </span>
                    </div> */}
                    {this.state.mpTargetToggle && (
                      <div className="grid-cols-2" style={{ display: "grid" }}>
                        <div className="budgets">
                          <div className="quarters">
                            <div> Q1</div>
                            <div className="card-head-value">
                              ${nFormatter(planner.mp_target.q1, 1)}
                            </div>
                          </div>
                          <div className="quarters">
                            <div> Q3</div>
                            <div className="card-head-value">
                              $
                              <span>{nFormatter(planner.mp_target.q3, 1)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="budgets">
                          <div className="quarters">
                            <div> Q2</div>
                            <div className="card-head-value">
                              $
                              <span>{nFormatter(planner.mp_target.q2, 1)}</span>
                            </div>
                          </div>
                          <div className="quarters">
                            <div> Q4</div>
                            <div className="card-head-value">
                              $
                              <span>{nFormatter(planner.mp_target.q4, 1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="card"
                    style={{ marginBottom: "25px", border: "none" }}
                  >
                    <div className="card-head">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <span>Budget :</span>
                          {this.state.budgetToggle && (
                            <span className="card-head-value">
                              $<span>{nFormatter(total_budget, 1)}</span>
                            </span>
                          )}
                        </div>
                        <div
                          onClick={() =>
                            this.setState({
                              budgetToggle: !this.state.budgetToggle,
                            })
                          }
                        >
                          {this.state.budgetToggle ? (
                            <Button
                              style={{ border: "none", color: "black" }}
                              iconName="up"
                            />
                          ) : (
                            <Button
                              style={{ border: "none", color: "black" }}
                              iconName="down"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {this.state.budgetToggle && (
                      <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                    )}

                    {/* <div className="card-head">
                      <span> Budget :</span>
                      <span className="card-head-value">
                        $<span>{parseFloat(total_budget).toFixed(0)}</span>K
                      </span>
                    </div> */}
                    {this.state.budgetToggle && (
                      <div className="grid-cols-2" style={{ display: "grid" }}>
                        <div className="budgets">
                          <div className="quarters">
                            <div> Q1</div>
                            <div className="card-head-value">
                              $<span>{nFormatter(planner.budgets.q1, 1)}</span>
                            </div>
                          </div>
                          <div className="quarters">
                            <div> Q3</div>
                            <div className="card-head-value">
                              $<span>{nFormatter(planner.budgets.q3, 1)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="budgets">
                          <div className="quarters">
                            <div> Q2</div>
                            <div className="card-head-value">
                              $<span>{nFormatter(planner.budgets.q2, 1)}</span>
                            </div>
                          </div>
                          <div className="quarters">
                            <div> Q4</div>
                            <div className="card-head-value">
                              $<span>{nFormatter(planner.budgets.q4, 1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">Other KPIs :</div>
                    {planner.persona.map((item, k) => (
                      <div
                        key={k}
                        className={k === 0 ? "card-head" : "card-head border-t"}
                      >
                        <div className="card-head-value">
                          {planner.otherKPIs}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-8">
                <div className="grid grid-cols-4">
                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">
                      INDUSTRY :
                      <div className="card-head-value">
                        {planner.programIndustry.map((item, k) => (
                          <div
                            key={k}
                            className={k === 0 ? "pt-2" : "border-t pt-2"}
                          >
                            {k + 1}. {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">
                      PERSONA :
                      <div className="card-head-value">
                        {planner.persona.map((item, k) => (
                          <div
                            key={k}
                            className={k === 0 ? "pt-2" : "border-t pt-2"}
                          >
                            {k + 1}. {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">
                      APM 1:
                      <div className="card-head-value">
                        {planner.apm.map((item, k) => (
                          <div
                            key={k}
                            className={k === 0 ? "pt-2" : "border-t pt-2"}
                          >
                            {k + 1}. {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">
                      Segment 1:
                      <div className="card-head-value">
                        {planner.segment.map((item, k) => (
                          <div
                            key={k}
                            className={k === 0 ? "pt-2" : "border-t pt-2"}
                          >
                            {k + 1}. {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="parent-program">Parent Programs</div>
                  <div className="grid">
                    {offers.length > 0 &&
                      offers.map((offer, k) => (
                        <div key={k}>
                          <div className="activity-head">
                            Offer Name :
                            <div className="activity-value">{offer.offer}</div>
                          </div>

                          <div className="activity-head" style={{ top: "50%" }}>
                            Activities :
                          </div>

                          <Activities
                            index={k}
                            toggleModal={() => {
                              this.setState({
                                selectedModal: k,
                              });
                              this.toggleModal();
                            }}
                            activities={offer.activities}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.toggleModal}
              size="small"
              heading="All Activities"
            >
              <div className="p-4">
                <Activities
                  all={true}
                  index={this.state.selectedModal}
                  toggleModal={() => {
                    this.setState({
                      selectedModal: this.state.selectedModal,
                    });
                    this.toggleModal();
                  }}
                  activities={
                    offers.length > 0
                      ? offers[this.state.selectedModal].activities
                      : []
                  }
                />
              </div>
            </Modal>

            {this.state.isUserApprover ? (
              <div
                style={{
                  textAlign: "center",
                  paddingBottom: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link to="/planner-view">
                  <Button label="Back to List" variant="outline-brand" />
                </Link>
                <Link
                  to={`/planner-activities?planner=${this.state.planner_id}`}
                  style={{ marginLeft: "10px" }}
                >
                  <Button
                    label="Show in Calendar View"
                    variant="outline-brand"
                  />
                </Link>

                <div style={{ marginLeft: "10px" }} onClick={this._exportPdf}>
                  <Button
                    label="Download as PDF"
                    style={{ backgroundColor: "green", color: "white" }}
                  />
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <Button
                    label="Reject"
                    variant="destructive"
                    onClick={() => this.toggleApproveModal("reject")}
                  />
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <Button
                    label="Approve"
                    variant="brand"
                    onClick={() => this.toggleApproveModal("accept")}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  paddingBottom: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link to="/planner-view">
                  <Button label="Back to List" variant="destructive" />
                </Link>
                <Link
                  to={`/planner-activities?planner=${this.state.planner_id}`}
                  style={{ marginLeft: "10px" }}
                >
                  <Button
                    label="Show in Calendar View"
                    variant="outline-brand"
                  />
                </Link>

                <div style={{ marginLeft: "10px" }} onClick={this._exportPdf}>
                  <Button
                    label="Download as PDF"
                    style={{ backgroundColor: "green", color: "white" }}
                  />
                </div>

                <div style={{ marginLeft: "10px" }}>
                  <Button
                    label="Submit for Approval"
                    variant="brand"
                    onClick={this.toggleSubmitModal}
                  />
                </div>
              </div>
            )}
            {this.state.approve && (
              <div style={{ marginLeft: "10px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
                  Approval History:{" "}
                </h2>
                <div
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    paddingBottom: "30px",
                    fontSize: "16px",
                  }}
                >
                  <ul style={{ listStyleType: "upper-roman" }}>
                    {this.state.approvalList.map((item, key) =>
                      key === 0 ? (
                        <li key={key}>
                          <span style={{ fontWeight: "600", color: "#999999" }}>
                            Submitted
                          </span>{" "}
                          by <a href={"mailto:" + item.email}>{item.email}</a>{" "}
                          on {item.date}
                        </li>
                      ) : item.type.toLowerCase() === "rejected" ? (
                        <li key={key}>
                          <span style={{ fontWeight: "600", color: "red" }}>
                            Rejected
                          </span>{" "}
                          by <a href={"mailto:" + item.email}>{item.email}</a> :
                          Reason: {item.reason}
                        </li>
                      ) : (
                        <li key={key}>
                          <span style={{ fontWeight: "600", color: "green" }}>
                            Accepted
                          </span>{" "}
                          by <a href={"mailto:" + item.email}>{item.email}</a> :
                          Reason: {item.reason}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Modal
            isOpen={this.state.submitModal}
            onRequestClose={this.toggleSubmitModal}
            size="small"
            heading="Submit for Approval"
          >
            <div className="p-4" style={{ height: "50vh", minHeight: "50vh" }}>
              <Combobox
                id="combobox-base"
                disabled={this.props.disabled}
                events={{
                  onChange: (event, { value }) => {
                    if (this.props.action) {
                      this.props.action("onChange")(event, value);
                    }
                    this.setState({ approver1Value: value });
                  },
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      approver1Value: "",
                      approver1: data.selection,
                    });
                  },
                  onSubmit: (event, { value }) => {
                    if (this.props.action) {
                      this.props.action("onChange")(event, value);
                    }
                    this.setState({
                      approver1Value: "",
                      approver1: this.state.selection,
                    });
                  },
                  onSelect: (event, data) => {
                    if (this.props.action) {
                      this.props.action("onSelect")(
                        event,
                        ...Object.keys(data).map((key) => data[key])
                      );
                    }
                    this.setState({
                      approver1Value: "",
                      approver1: data.selection,
                    });
                  },
                }}
                labels={{
                  label: "Approver 1",
                  placeholder: "Select Approver 1 Emails",
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  inputValue: this.state.approver1Value,
                  limit: 10,
                  options: this.state.accounts,
                  selection: this.state.approver1,
                })}
                selection={this.state.approver1}
                value={this.state.approver1Value}
                required
                errorText={this.state.errorTexts.approver1}
              />

              <Combobox
                id="combobox-base"
                disabled={this.props.disabled}
                events={{
                  onChange: (event, { value }) => {
                    if (this.props.action) {
                      this.props.action("onChange")(event, value);
                    }
                    this.setState({ approver2Value: value });
                  },
                  onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                      approver2Value: "",
                      approver2: data.selection,
                    });
                  },
                  onSubmit: (event, { value }) => {
                    if (this.props.action) {
                      this.props.action("onChange")(event, value);
                    }
                    this.setState({
                      approver2Value: "",
                      approver2: this.state.selection,
                    });
                  },
                  onSelect: (event, data) => {
                    if (this.props.action) {
                      this.props.action("onSelect")(
                        event,
                        ...Object.keys(data).map((key) => data[key])
                      );
                    }
                    this.setState({
                      approver2Value: "",
                      approver2: data.selection,
                    });
                  },
                }}
                labels={{
                  label: "Approver 2",
                  placeholder: "Select Approver 2 Emails",
                }}
                menuItemVisibleLength={5}
                multiple
                options={comboboxFilterAndLimit({
                  inputValue: this.state.approver2Value,
                  limit: 50,
                  options: this.state.accounts2,
                  selection: this.state.approver2,
                })}
                selection={this.state.approver2}
                value={this.state.approver2Value}
                required
                errorText={this.state.errorTexts.approver2}
              />

              <Input
                aria-describedby="error-4"
                id="unique-id-4"
                label="Note"
                onChange={(event, data) => {
                  this.setState({
                    approve: { ...this.state.approve, note: data.value },
                  });
                }}
                value={this.state.approve.note}
                required
                errorText={this.state.errorTexts.note}
                placeholder="Enter description to assist approvers"
              />

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginLeft: "auto",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Button
                    label="Submit for Approval"
                    variant="brand"
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={this.state.approvalModal}
            onRequestClose={this.toggleApproveModal}
            size="small"
            heading="Submit for Approval"
          >
            <div className="p-4">
              <Input
                aria-describedby="error-4"
                id="unique-id-4"
                label="Note"
                onChange={(event, data) => {
                  this.setState({
                    approve: { ...this.state.approve, note: data.value },
                  });
                }}
                value={this.state.approve.note}
                required
                errorText={this.state.errorTexts.note}
                placeholder="Enter description to assist approvers"
              />

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginLeft: "auto",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div>
                  <Button
                    label="Approve"
                    variant="brand"
                    onClick={() => this.handleApprove("accept")}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <Button
                    label="Reject"
                    variant="destructive"
                    onClick={() => this.handleApprove("reject")}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </IconSettings>
        {this.state.print && (
          <div id="printable">
            <PlanningViewPrintArea />
          </div>
        )}
      </div>
    );
  }
}

export default PlanningView;
