import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import { Button } from "react-bootstrap";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import NoResults from "../../assets/no-results.png"

import Asset from "../../components/Asset";
import Post from "../posts/Post";
import PopularProfiles from "./PopularProfiles";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../context/ProfileDataContext";
import { fetchMoreData } from "../../utils/utils";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();

    const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    const [profilePosts, setProfilePosts] = useState({ results: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] =
                    await Promise.all([
                        axiosReq.get(`/profiles/${id}`),
                        axiosReq.get(`/posts/?owner__profile=${id}`),
                    ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            <Row noGutters className="px-3 text-center">
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
                <Col lg={3} className="text-lg-left">
                    <Image
                        src={profile?.image}
                        className={styles.ProfileImage}
                        roundedCircle
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.posts_count}</div>
                            <div>posts</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser && !is_owner ? (
                        profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                                onClick={() => handleUnfollow(profile)}
                            >
                                unfollow
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Black}`}
                                onClick={() => handleFollow(profile)}
                            >
                                follow
                            </Button>
                        )
                    ) : null}
                </Col>
                {profile?.content && (
                    <Col className="p-3">{profile.content}</Col>
                )}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s posts</p>
            <hr />
            {profilePosts ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post
                            key={post.id}
                            {...post}
                            setPosts={setProfilePosts}
                            postPage={true}
                        />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset src={NoResults} message={`No results found, ${profile?.owner} hasn't posted yet.`} />
            )}
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfilePosts}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;
