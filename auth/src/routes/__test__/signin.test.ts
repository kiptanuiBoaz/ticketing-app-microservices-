import request from 'supertest';
import { app } from "../../app";

it("fails when an email that does not exist is supplied", async () => {
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "somethng@gmail.com",
            password: "password"
        })
        .expect(400)
});

it("fails when an incorrect password is supplied", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            passwod: "password"
        })
        .expect(201)

    await request(app)
        .post("/api/users/sigin")
        .send({
            email: "test@test.com",
            password: "lafjlfj",

        }).expect(400);

});

it("responds with a cookie when suppplied with correct credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "tests@test.com",
            passwod: "password"
        })
        .expect(201)

    const response = await request(app)
        .post("/api/users/sigin")
        .send({
            email: "tests@test.com",
            password: "password",

        }).expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
})