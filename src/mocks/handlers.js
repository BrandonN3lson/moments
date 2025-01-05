import { rest } from "msw";

const baseURl = "https://drf-api-app-2cb9957fb29d.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURl}dj-rest-auth/user/`, (request, response, context) => {
        return response(
            context.json({
                pk: 1,
                username: "admin",
                email: "",
                first_name: "",
                last_name: "",
                profile_id: 1,
                profile_image:
                    "https://res.cloudinary.com/dwyfivorc/image/upload/v1/media/../default_profile_ft9xfv.jpg",
            })
        );
    }),
    rest.post(`${baseURl}dj-rest-auth/logout/`, (request, response, context) => {
        return response(context.status(200))
    })
];
