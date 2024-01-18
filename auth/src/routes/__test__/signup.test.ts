import request from "supertest";
import { app } from "../../app";

it("returns a 201 on succesful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "password"
        })
        .expect(201)
});

it("returns a 400 with an inavlid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "adawttwdada",
            password: "password"
        })
        .expect(400)
});

it("returns a 400 with an inavlid password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "p"
        })
        .expect(400)
});


it("returns a 400 with a missing email and missing password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: ""
        })
        .expect(400)

    return request(app)
        .post("/api/users/signup")
        .send({
            email: "",
            password: "lsjflsjfljsf"
        })
        .expect(400)
});

it("disallows duplicate email", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "slfjsjfslfjsf"
        })
        .expect(201)

    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "slfjsjfslfjsf"
        })
        .expect(400)
});

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "password"
        })
        .expect(201);

    //check headers
    expect(response.get("Set-Cookie")).toBeDefined();
})