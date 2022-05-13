import React, { Component } from "react";
import "./styles.css";
import {
    IconSettings,
    ExpandableSection,
    Icon,
} from "@salesforce/design-system-react";
import Content from "../ListView/Content";
import Collapsible from "../ListView/Collapsible";
import moment from "moment";
import ChildCollapsible from "./ChildCollapsible";

class ListView extends Component {
    state = {
        value: moment(),
        categories: [
            { label: "Event" },
            { label: "Campaign" },
            { label: "Exec Engagement" },
            { label: "Digital" },
            { label: "Webinar" },
            { label: "SIC" },
            { label: "Content" },
        ],
        subCategories: [
            { category: "Event", label: "Event" },
            { category: "Campaign", label: "Campaign" },
            { category: "Exec Engagement", label: "Exec Engagement" },
            { category: "Digital", label: "Digital" },
            { category: "Webinar", label: "Webinar" },
            { category: "SIC", label: "SIC" },
            { category: "Content", label: "Content" },
        ],
        activities: [
            {
                category: "Event",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Event",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Campaign",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Campaign",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Exec Engagement",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Exec Engagement",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Digital",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Digital",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Webinar",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Webinar",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "SIC",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "SIC",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "Content",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
            {
                category: "SIC",
                title: "Cx0 Content: Quarterly Content With Mahlab",
                region: "ANC",
                format2: "Text",
                program: "Brand Awareness (ANC)",
                owner: "Alanna Woodrow",
                description:
                    " We will host the erecutitve team.The secutive host is Glenn Rozet, Area Vice President,Public Sector.The discussion leaders include Poter Schwrtz, Chiet Futures Officer.Dr.Bryan Tan,Director Healthcare and Life Scieces APAC & Lachalan Mils, Digital Communincations Felicity Jones & Helen Chan, Lead Solution Engineer.",
                startDate: "2022/04/11",
            },
        ],
    };
    render() {
        return (
            <IconSettings iconPath="/assets/icons">
                {this.state.categories.map((item) => (
                    <ExpandableSection title={item.label}>
                        {this.state.subCategories
                            .filter((sub) => sub.category === item.label)
                            .map((sub) => (


                                <ChildCollapsible label={sub.label}>



                                    {this.state.activities
                                        .filter((el) => el.category === sub.label)
                                        .map((el) => (
                                            <Collapsible
                                                label={el.title}
                                                date={
                                                    <h3>{this.state.value.format("MMMM DD,YYYY")}</h3>
                                                }
                                            >
                                                <Content
                                                    region={el.region}
                                                    format2={el.format2}
                                                    program={el.program}
                                                    owner={el.owner}
                                                    description={el.description}
                                                />
                                            </Collapsible>
                                        ))

                                    }

                                </ChildCollapsible>


                            ))
                        }
                    </ExpandableSection>
                ))
                }
            </IconSettings >
        );
    }
}
export default ListView;