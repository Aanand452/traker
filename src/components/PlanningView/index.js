import React, { Component, Fragment } from "react";
import moment from "moment";
import NavBar from "../NavBar";
import BudgetInput from "../BudgetInput/BudgetInput";
import update from "immutability-helper";
import { BoxShadow } from "./styles";
import "./styles.css";

import { Button } from "@salesforce/design-system-react";
import { Link } from "react-router-dom";

class PlanningView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
        {" "}
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
              FY22 H2 Master Program Plan: ESMB(ANZ)
            </h1>
          </div>
          <div style={{ margin: "10px" }} className="grid grid-cols-10">
            <div class="col-span-2">
              <div>
                <div className="owner">Parent Program</div>
                <div className="owner-name">Cat Prestipino</div>

                <div className="program">Program Overview (abstract)</div>
                <div className="program-details">
                  Salesforce is a strong partner to small business helping them
                  overcome current challenges and scale for the future, we help
                  small business find, win, keep and contact with their
                  customers where ever they are.
                </div>
                <div className="program">Program Objectives (abstract)</div>
                <div className="program-details">
                  Salesforce is a strong partner to small business helping them
                  overcome current challenges and scale for the future, we help
                  small business find, win, keep and contact with their
                  customers where ever they are.
                </div>
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
                    <span className="card-head-value">$938K</span>
                  </div>
                  <div className="grid-cols-2" style={{ display: "grid" }}>
                    <div className="budgets">
                      <div className="quarters">
                        <div> Q1</div>
                        <div className="card-head-value">$170K</div>
                      </div>
                      <div className="quarters">
                        <div> Q3</div>
                        <div className="card-head-value">$140K</div>
                      </div>
                    </div>
                    <div className="budgets">
                      <div className="quarters">
                        <div> Q2</div>
                        <div className="card-head-value">$230K</div>
                      </div>
                      <div className="quarters">
                        <div> Q4</div>
                        <div className="card-head-value">$193K</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    Persona 1 :<div className="card-head-value">Sales</div>
                  </div>
                  <div className="card-head border-t">
                    Persona 2 :
                    <div className="card-head-value">Service/Marketing</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    Industry :<div className="card-head-value">All</div>
                  </div>
                  <div className="card-head border-t">
                    Segment :<div className="card-head-value">ESMB</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-head">
                    Offer Name :<div className="card-head-value">All</div>
                  </div>

                  <div className="card-head border-t"></div>
                </div>
              </div>
              <div className="card-footer">
                <div className="parent-program">Owner</div>
                <div class="grid">
                  <div>
                    <div className="activity-head">
                      Offer Name :
                      <div className="activity-value">CRM Starter Campaign</div>
                    </div>
                    <div className="activity-head" style={{ top: "50%" }}>
                      Activities :
                    </div>
                    <ul className="list-ul">
                      <li>
                        ABM - Business Transformation Customer Council - date
                        TBC
                      </li>
                      <li>Bespoke webinar with Cyber Security Hub</li>
                      <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                    </ul>
                  </div>
                  <div>
                    <div>
                      <div className="activity-head">
                        Offer Name :
                        <div className="activity-value">
                          5th Small Business Report
                        </div>
                      </div>
                      <div className="activity-head" style={{ top: "50%" }}>
                        Activities :
                      </div>
                      <ul className="list-ul">
                        <li>
                          ABM - Business Transformation Customer Council - date
                          TBC
                        </li>
                        <li>Bespoke webinar with Cyber Security Hub</li>
                        <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="activity-head">
                        Offer Name :
                        <div className="activity-value">
                          ESMB at Strategic Events
                        </div>
                      </div>
                      <div className="activity-head" style={{ top: "50%" }}>
                        Activities :
                      </div>
                      <ul className="list-ul">
                        <li>
                          ABM - Business Transformation Customer Council - date
                          TBC
                        </li>
                        <li>Bespoke webinar with Cyber Security Hub</li>
                        <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
