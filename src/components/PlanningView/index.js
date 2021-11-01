import React, { Component, Fragment } from "react";
import moment from "moment";
import NavBar from "../NavBar";
import BudgetInput from "../BudgetInput/BudgetInput";
import update from "immutability-helper";
import { BoxShadow } from "./styles";
import "./styles.css";

// import Modal from "@salesforce/design-system-react/components/modal";
import { Button, Spinner, Modal } from "@salesforce/design-system-react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";

class PlanningView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planner: {},
      loading: true,
      modalOpen: false,
      moreActivities: false,
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
        console.log(planner_id[1]);
        // for editing
        planner_id = planner_id[1];
      } else {
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
      console.log(response);

      this.setState({
        planner: result,
        total_budget:
          (result.budgets.q1 +
            result.budgets.q2 +
            result.budgets.q3 +
            result.budgets.q4) /
          1000,
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
    const { planner, loading, total_budget } = this.state;
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

    const { offers } = planner.offers;
    return (
      <div>
        <div style={{ backgroundColor: "white" }}>
          <NavBar />
          <div class="">
            <h1
              style={{
                marginTop: "100px",
                fontSize: "40px",
                paddingBottom: "25px",
                marginLeft: "10px",
                fontWeight: 500,
              }}
            >
              {planner.programName}
            </h1>
          </div>
          <div style={{ margin: "10px" }} className="grid grid-cols-10">
            <div class="col-span-2">
              <div>
                <div className="owner">Owner</div>
                <div className="owner-name">{planner.programOwner}</div>

                <div className="program">Program Overview (abstract)</div>
                <div className="program-details">{planner.abstract}</div>
                <div className="program">Program Objectives & KPIs</div>
                <div className="program-details">{planner.otherKPIs}</div>
              </div>
            </div>
            <div class="col-span-8">
              <div class="grid grid-cols-5">
                <div className="card">
                  <div className="card-head">
                    <span>MP Target :</span>
                    <span className="card-head-value">S8M</span>
                  </div>
                  <hr style={{ marginTop: "10px", marginBottom: "10px" }} />

                  <div className="card-head">
                    <span> Budget :</span>
                    <span className="card-head-value">
                      $<span>{total_budget}</span>K
                    </span>
                  </div>
                  <div className="grid-cols-2" style={{ display: "grid" }}>
                    <div className="budgets">
                      <div className="quarters">
                        <div> Q1</div>
                        <div className="card-head-value">
                          $<span>{planner.budgets.q1 / 1000}</span>K
                        </div>
                      </div>
                      <div className="quarters">
                        <div> Q3</div>
                        <div className="card-head-value">
                          $<span>{planner.budgets.q2 / 1000}</span>K
                        </div>
                      </div>
                    </div>
                    <div className="budgets">
                      <div className="quarters">
                        <div> Q2</div>
                        <div className="card-head-value">
                          $<span>{planner.budgets.q3 / 1000}</span>K
                        </div>
                      </div>
                      <div className="quarters">
                        <div> Q4</div>
                        <div className="card-head-value">
                          $<span>{planner.budgets.q4 / 1000}</span>K
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  {planner.persona.map((item, k) => (
                    <div
                      className={k === 0 ? "card-head" : "card-head border-t"}
                    >
                      Persona {k + 1} :
                      <div className="card-head-value">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  {planner.programIndustry.map((item, k) => (
                    <div
                      className={k === 0 ? "card-head" : "card-head border-t"}
                    >
                      Industry {k + 1} :
                      <div className="card-head-value">{item.label}</div>
                    </div>
                  ))}
                  <div className="card-head border-t">
                    Segment :
                    <div className="card-head-value">
                      <span>
                        {planner.programIndustry.map((item, k) =>
                          planner.programIndustry.length - 1 === k
                            ? item.label
                            : item.label + ", "
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    APM :
                    <div className="card-head-value">
                      {planner.apm.map((item, k) => (
                        <div className={k === 0 ? "pt-2" : "border-t pt-2"}>
                          {k + 1}. {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-head border-t"></div>
                </div>
              </div>
              <div className="card-footer">
                <div className="parent-program">Parent Programs</div>
                <div class="grid">
                  {offers
                    .slice(
                      0,
                      this.state.moreActivities
                        ? this.state.moreActivities.length
                        : 3
                    )
                    .map((offer, k) => (
                      <div>
                        <div className="activity-head">
                          Offer Name :
                          <div className="activity-value">{offer.offer}</div>
                        </div>
                        <div className="activity-head" style={{ top: "50%" }}>
                          Activities :
                        </div>
                        <ul className="list-ul">
                          {offer.activities.slice(0, 5).map((item) => (
                            <li className="small">
                              {item.title} - {item.date}
                            </li>
                          ))}
                          {offer.activities.length > 4 ? (
                            <div
                              onClick={() => {
                                this.setState({
                                  selectedModal: k,
                                });
                                this.toggleModal();
                              }}
                              className="text-decoration-underline"
                            >
                              ...more
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </ul>
                      </div>
                    ))}
                </div>
                <button
                  className="my-2 text-center d-flex mx-auto"
                  onClick={() => this.setState({ moreActivities: true })}
                >
                  Show more activities
                </button>
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
              {offers[this.state.selectedModal].activities.map((item, i) => (
                <div className="">
                  {i + 1}. {item.title} - {item.date}
                </div>
              ))}
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
            <div style={{ marginLeft: "10px" }}>
              <Button label="Submit for Approval" variant="brand" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlanningView;
