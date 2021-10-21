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
      <div class="grid-container">
        <NavBar />
        <div class="item1">
          <h1 style={{ marginTop: "70px" }}>
            FY22 H2 Master Program Plan: ESMB(ANZ)
          </h1>
        </div>
        <div class="item2">
          <div>
            <div className="owner">Parent Program</div>
            <div className="owner-name">Cat Prestipino</div>

            <div className="program">Program Overview (abstract)</div>
            <div className="program-details">
              Salesforce is a strong partner to small business helping them
              overcome current challenges and scale for the future, we help
              small business find, win, keep and contact with their customers
              where ever they are.
            </div>
            <div className="program">Program Overview (abstract)</div>
            <div className="program-details">
              Salesforce is a strong partner to small business helping them
              overcome current challenges and scale for the future, we help
              small business find, win, keep and contact with their customers
              where ever they are.
            </div>
          </div>
        </div>
        <div class="item3">
          <div className="card">
            <div className="card-head">
              MP Target :<div className="card-head-value">S8M</div>
            </div>
            <hr className="hr1" />
            <div className="card-head">
              Budget :<div className="card-head-value">$938K</div>
            </div>
            <div>
              <div className="card-head">
                Q1 :<div className="card-head-value">$170K</div>
              </div>
              <div className="card-head">
                Q3 :<div className="card-head-value">$170K</div>
              </div>
            </div>
            <div style={{ flex: "right" }}>
              <div className="card-head">
                Q2 :<div className="card-head-value">$170K</div>
              </div>
              <div className="card-head">
                Q4 :<div className="card-head-value">$170K</div>
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
        <div class="item5">
          <div className="card-footer">
            <div className="parent-program">Owner</div>
            <div class="grid">
              <div>
                <div className="activity-head">
                  Offer Name :<div className="activity-value">All</div>
                </div>
                <div className="activity-head" style={{ top: "50%" }}>
                  Activities :
                </div>
                <ul className="list-ul">
                  <li>
                    ABM - Business Transformation Customer Council - date TBC
                  </li>
                  <li>Bespoke webinar with Cyber Security Hub</li>
                  <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                </ul>
              </div>
              <div>
                <div>
                  <div className="activity-head">
                    Offer Name :<div className="activity-value">All</div>
                  </div>
                  <div className="activity-head" style={{ top: "50%" }}>
                    Activities :
                  </div>
                  <ul className="list-ul">
                    <li>
                      ABM - Business Transformation Customer Council - date TBC
                    </li>
                    <li>Bespoke webinar with Cyber Security Hub</li>
                    <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <div className="activity-head">
                    Offer Name :<div className="activity-value">All</div>
                  </div>
                  <div className="activity-head" style={{ top: "50%" }}>
                    Activities :
                  </div>
                  <ul className="list-ul">
                    <li>
                      ABM - Business Transformation Customer Council - date TBC
                    </li>
                    <li>Bespoke webinar with Cyber Security Hub</li>
                    <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <div className="activity-head">
                    Offer Name :<div className="activity-value">All</div>
                  </div>
                  <div className="activity-head" style={{ top: "50%" }}>
                    Activities :
                  </div>
                  <ul className="list-ul">
                    <li>
                      ABM - Business Transformation Customer Council - date TBC
                    </li>
                    <li>Bespoke webinar with Cyber Security Hub</li>
                    <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <div className="activity-head">
                    Offer Name :<div className="activity-value">All</div>
                  </div>
                  <div className="activity-head" style={{ top: "50%" }}>
                    Activities :
                  </div>
                  <ul className="list-ul">
                    <li>
                      ABM - Business Transformation Customer Council - date TBC
                    </li>
                    <li>Bespoke webinar with Cyber Security Hub</li>
                    <li>LOGIN PROMO - Placeholder - App Cookbook</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", paddingTop: "2%", display: "flex" }}>
          <Link to="/planner-view">
            <Button label="Back to List" variant="destructive" />
          </Link>
          <div style={{ marginLeft: "10px" }}>
            <Button label="Submit for Approval" variant="brand" />
          </div>
        </div>
      </div>
    );
  }
}

export default PlanningView;
