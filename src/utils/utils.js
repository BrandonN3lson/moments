import { axiosReq } from "../api/axiosDefaults"
// for infinit scrolling, toget and render more posts without rendering duplicates
export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosReq.get(resource.next);
        setResource(prevResource => ({
            ...prevResource,
            next:data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some(accResult => accResult.id === cur.id) ? acc : [...acc, cur];
            }, prevResource.results)
        }));
    } catch (err){
        console.log(err);
    }


}
