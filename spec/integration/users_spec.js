const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes: users", () => {
    beforeEach((done) => {
        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("GET /users/sign_up", () => {
        it("should render a view with a sign up form", (done) => {
            request.get(`${base}sign_up`, (err, res, body) => {
                console.log(err);
                expect(err).toBeNull();
                expect(body).toContain("Sign up");
                done();
            });
        });

    });

    describe("POST /users", () => {
        it("should create a new user with a valid values and redirect", (done) => {
            const options = {
                url: base,
                form: {
                    email: "user@example.com",
                    password: "1234567",
                    passwordConfirmation: "1234567"
                }
            }

            request.post(options,
                (err, res, body) => {
                    console.log("before user found: ", err);
                    User.findOne({where: {email: "user@example.com"}})
                    .then((user) => {
                        expect(user).not.toBeNull();
                        expect(user.email).toBe("user@example.com");
                        expect(user.id).toBe(1);
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
        });

        it("should not create a new user with invalid attributes and redirect", (done) => {
            request.post({
                url: base,
                form: {
                    email: "no",
                    password: "1234567",
                    passwordConfirmation: "1234567"
                }
            },
            (err, res, body) => {
                User.findOne({where: {email: "no"}})
                .then((user) => {
                    expect(user).toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });
});