import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";
// for infinit scrolling, toget and render more posts without rendering duplicates
export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                    ? acc
                    : [...acc, cur];
            }, prevResource.results),
        }));
    } catch (err) {
        // console.log(err);
    }
};

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
        ? // this is the profile i clicked on
          //update followers_count and set following_id
          {
              ...profile,
              followers_count: profile.followers_count + 1,
              following_id,
          }
        : profile.is_owner
        ? //this is the profile of the logged in user?
          //update its following_count
          {
              ...profile,
              following_count: profile.following_count + 1,
          }
        : // this is not the profile the user clicked on or
          //profile the user owns, so just return it unchanged
          profile;
};

export const UnfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
        ? // this is the profile i clicked on
          //update followers_count and set following_id
          {
              ...profile,
              followers_count: profile.followers_count - 1,
              following_id: null,
          }
        : profile.is_owner
        ? //this is the profile of the logged in user?
          //update its following_count
          {
              ...profile,
              following_count: profile.following_count - 1,
          }
        : // this is not the profile the user clicked on or
          //profile the user owns, so just return it unchanged
          profile;
};

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
}

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp")
}

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp")
}
