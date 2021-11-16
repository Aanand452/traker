import React, { Component } from "react";
import NavBar from "../NavBar";
import "./styles.css";
// import Modal from "@salesforce/design-system-react/components/modal";
import {
  Button,
  Spinner,
  Modal,
  IconSettings,
} from "@salesforce/design-system-react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";
import Activities from "./Activities";

class PlanningView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planner: {},
      planner_id: false,
      loading: true,
      modalOpen: false,
      selectedModal: 0,
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
    };
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  getPlannerByID = async () => {
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
      console.log(result);
      this.setState({
        planner: result,
        planner_id,
        total_budget:
          (result.budgets.q1 +
            result.budgets.q2 +
            result.budgets.q3 +
            result.budgets.q4) /
          1000,
        total_mp_target: result.mp_target
          ? parseFloat(
              (result.mp_target.q1 +
                result.mp_target.q2 +
                result.mp_target.q3 +
                result.mp_target.q4) /
                1000
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
                  <span style={{ paddingLeft: "4px" }}>
                    ({planner.region[0].label})
                  </span>
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
              <div class="col-span-2">
                <div>
                  <div
                    className="card"
                    style={{ marginBottom: "25px", border: "none" }}
                  >
                    <div className="card-head">
                      <span>MP Target :</span>
                      <span className="card-head-value">
                        ${parseFloat(total_mp_target).toFixed(0)}K
                      </span>
                    </div>
                    <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

                    {/* <div className="card-head">
                      <span> Budget :</span>
                      <span className="card-head-value">
                        $<span>{parseFloat(total_budget).toFixed(0)}</span>K
                      </span>
                    </div> */}
                    <div className="grid-cols-2" style={{ display: "grid" }}>
                      <div className="budgets">
                        <div className="quarters">
                          <div> Q1</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.mp_target.q1 >= 1000
                                ? parseFloat(
                                    planner.mp_target.q1 / 1000
                                  ).toFixed(0)
                                : parseFloat(
                                    planner.mp_target.q1 / 1000
                                  ).toFixed(1)}
                            </span>
                            K
                          </div>
                        </div>
                        <div className="quarters">
                          <div> Q3</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.mp_target.q3 >= 1000
                                ? parseFloat(
                                    planner.mp_target.q3 / 1000
                                  ).toFixed(0)
                                : parseFloat(
                                    planner.mp_target.q3 / 1000
                                  ).toFixed(1)}
                            </span>
                            K
                          </div>
                        </div>
                      </div>
                      <div className="budgets">
                        <div className="quarters">
                          <div> Q2</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.mp_target.q2 >= 1000
                                ? parseFloat(
                                    planner.mp_target.q2 / 1000
                                  ).toFixed(0)
                                : parseFloat(
                                    planner.mp_target.q2 / 1000
                                  ).toFixed(1)}
                            </span>
                            K
                          </div>
                        </div>
                        <div className="quarters">
                          <div> Q4</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.mp_target.q4 >= 1000
                                ? parseFloat(
                                    planner.mp_target.q4 / 1000
                                  ).toFixed(0)
                                : parseFloat(
                                    planner.mp_target.q4 / 1000
                                  ).toFixed(1)}
                            </span>
                            K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="card"
                    style={{ marginBottom: "25px", border: "none" }}
                  >
                    <div className="card-head">
                      <span>Budget :</span>
                      <span className="card-head-value">
                        ${parseFloat(total_budget).toFixed(0)}K
                      </span>
                    </div>
                    <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

                    {/* <div className="card-head">
                      <span> Budget :</span>
                      <span className="card-head-value">
                        $<span>{parseFloat(total_budget).toFixed(0)}</span>K
                      </span>
                    </div> */}
                    <div className="grid-cols-2" style={{ display: "grid" }}>
                      <div className="budgets">
                        <div className="quarters">
                          <div> Q1</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.budgets.q1 >= 1000
                                ? parseFloat(planner.budgets.q1 / 1000).toFixed(
                                    0
                                  )
                                : parseFloat(planner.budgets.q1 / 1000).toFixed(
                                    1
                                  )}
                            </span>
                            K
                          </div>
                        </div>
                        <div className="quarters">
                          <div> Q3</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.budgets.q3 >= 1000
                                ? parseFloat(planner.budgets.q3 / 1000).toFixed(
                                    0
                                  )
                                : parseFloat(planner.budgets.q3 / 1000).toFixed(
                                    1
                                  )}
                            </span>
                            K
                          </div>
                        </div>
                      </div>
                      <div className="budgets">
                        <div className="quarters">
                          <div> Q2</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.budgets.q2 >= 1000
                                ? parseFloat(planner.budgets.q2 / 1000).toFixed(
                                    0
                                  )
                                : parseFloat(planner.budgets.q2 / 1000).toFixed(
                                    1
                                  )}
                            </span>
                            K
                          </div>
                        </div>
                        <div className="quarters">
                          <div> Q4</div>
                          <div className="card-head-value">
                            $
                            <span>
                              {planner.budgets.q4 >= 1000
                                ? parseFloat(planner.budgets.q4 / 1000).toFixed(
                                    0
                                  )
                                : parseFloat(planner.budgets.q4 / 1000).toFixed(
                                    1
                                  )}
                            </span>
                            K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">Other KPIs :</div>
                    {planner.persona.map((item, k) => (
                      <div
                        className={k === 0 ? "card-head" : "card-head border-t"}
                      >
                        <div className="card-head-value">
                          {k + 1}. {planner.otherKPIs}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div class="col-span-8">
                <div class="grid grid-cols-4">
                  <div className="card" style={{ border: "none" }}>
                    <div className="card-head">
                      INDUSTRY :
                      <div className="card-head-value">
                        {planner.programIndustry.map((item, k) => (
                          <div className={k === 0 ? "pt-2" : "border-t pt-2"}>
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
                          <div className={k === 0 ? "pt-2" : "border-t pt-2"}>
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
                          <div className={k === 0 ? "pt-2" : "border-t pt-2"}>
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
                          <div className={k === 0 ? "pt-2" : "border-t pt-2"}>
                            {k + 1}. {item.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="parent-program">Parent Programs</div>
                  <div class="grid">
                    {offers.length > 0 &&
                      offers.map((offer, k) => (
                        <div>
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
                style={{ marginLeft: "5px" }}
              >
                <Button label="Show in Calander View" variant="outline-brand" />
              </Link>
              {/* <div style={{ marginLeft: "10px" }}>
                <Button label="Submit for Approval" variant="brand" />
              </div> */}
            </div>
          </div>
        </IconSettings>
      </div>
    );
  }
}

export default PlanningView;
