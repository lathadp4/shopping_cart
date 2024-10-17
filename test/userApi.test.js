// userApi.test.js
const express = require("express");
const request = require("supertest");
const bodyParser = require("body-parser");
const sinon = require("sinon");
const { userApi } = require("../api/userApi"); // Adjust path as needed
const { userService } = require("../service/userService"); // Import userService

const app = express();
app.use(bodyParser.json());
userApi(app); // Register user API routes

describe("Login API", () => {
    let loginServiceStub;
    let userServiceInstance; // Create a variable for the user service instance

    beforeEach(() => {
        apiResponse = new (require("../utilities/apiResponse").ApiResponse)();

        // Instantiate userService to stub its methods
        userServiceInstance = new userService();

        // Create a stub for the loginService method
        loginServiceStub = sinon.stub(userServiceInstance, "loginService");
    });

    afterEach(() => {
        // Restore the original method after each test
        if (loginServiceStub && loginServiceStub.restore) {
            loginServiceStub.restore();
        }
    });

    describe("POST /login", () => {
        it("should return an error if user_name is missing", (done) => {
            request(app)
                .post("/login")
                .send({ password: "somePassword" })
                .expect(500)
                .expect((res) => {
                    if (res.body.message !== "user_name should not be empty") throw new Error("Expected message to be 'user_name should not be empty'");
                })
                .end(done);
        });

        it("should return an error if password is missing", (done) => {
            request(app)
                .post("/login")
                .send({ user_name: "existingUser" })
                .expect(500)
                .expect((res) => {
                    if (res.body.message !== "password should not be empty") throw new Error("Expected message to be 'password should not be empty'");
                })
                .end(done);
        });

        it("should return an error for non-existing user", (done) => {
            loginServiceStub.callsFake((query, apiResponse, callback) => {
                const err = { message: "User Does not exist" };
                apiResponse.status = false;
                apiResponse.message = "User Does not exist";
                apiResponse.data = [];
                callback(err, apiResponse);
            });

            request(app)
                .post("/login")
                .send({ user_name: "wrongUser", password: "somePassword" })
                .expect(500)
                .expect((res) => {
                    if (res.body.status !== false) throw new Error("Expected status to be false");
                    if (res.body.message !== "User Does not exist") throw new Error("Expected message to be 'User Does not exist'");
                })
                .end(done);
        });

        it("should return an error for Incorrect password", (done) => {
            loginServiceStub.callsFake((query, apiResponse, callback) => {
                var err = { message: "Incorrect password" };
                apiResponse.status = false;
                apiResponse.message = "Incorrect password";
                apiResponse.data = []
                callback(err, apiResponse);
            });

            request(app)
                .post("/login")
                .send({ user_name: "existingUser", password: "wrongPassword" })
                .expect(500)
                .expect((res) => {
                    if (res.body.status !== false) throw new Error("Expected status to be false");
                    if (res.body.message !== "User Does not exist") throw new Error("Expected message to be 'User Does not exist'");
                })
                .end(done);
        });

        it("should login successfully with valid credentials", (done) => {
            const response = [{ id: 1, user_name: "existingUser", password: "hashedPassword", createdDate: "timestamp" }];
            const jsontoken = "mockedToken"; // Replace this with a valid token for testing

            loginServiceStub.callsFake((query, apiResponse, callback) => {
                apiResponse.status = true;
                apiResponse.message = "Login successful";
                apiResponse.data = { response: response[0], token: jsontoken };
                callback(null, apiResponse);
            });

            request(app)
                .post("/login")
                .send({ user_name: "latha", password: "latha@123" })
                .expect(200)
                .expect((res) => {
                    if (res.body.status !== true) throw new Error("Expected status to be true");
                    if (res.body.message !== "Login successful") throw new Error("Expected message to be 'Login successful'");
                })
                .end(done);
        });
    });
});

// npx mocha test/userApi.test.js