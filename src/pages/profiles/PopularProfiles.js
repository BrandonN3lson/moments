import React, { useEffect, useState } from "react";
import appstyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { useProfileData } from '../../context/ProfileDataContext'
import Asset from "../../components/Asset";
import Profile from "./Profile";

const PopularProfiles = ({ mobile }) => {
    const { popularProfiles } = useProfileData()
    return (
        <Container
            className={`${appstyles.Content} ${
                mobile && "d-lg-none text-center mb-3"
            }`}
        >
            {popularProfiles.results.length ? (
                <>
                    <p>most followed profiles</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularProfiles.results
                                .slice(0, 4)
                                .map((profile) => (
                                    <Profile key={profile.id} profile={profile} mobile />
                                ))}
                        </div>
                    ) : (
                        popularProfiles.results.map((profile) => (
                            <Profile key={profile.id} profile={profile} />
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;
