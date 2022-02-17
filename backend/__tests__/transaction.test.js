const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const db = require("../app/models");
const Tutorial = db.tutorials;
const app = require("../app");
const { mongoose } = require("../app/models");

chai.use(http);

describe("Tutorial endpoint", () => {
    // let updatedTurtorial = {
    //     _id: "4665ytuugi86886000",
    //     title: "react native",
    //     description: "mobile development",
    //     published: false,
    // };

    let data = [
        {
            _id: "4882200e85yytii999",
            money: 300,
            meter: 'm1-001',
            token: '00-23-34-443',
            days:3,    
            dateExp :2022-12-07,
        },
        {
            _id: "4899200e85yytii999",
            money: 400,
            meter: 'm1-002',
            token: '00-23-34-443',
            days:4,    
            dateExp :2022-12-07,
        },
    ];

    let emptyArr = [];

    test("GET /api/transactions --> should return 200 on sucess", async () => {
        jest.spyOn(Transaction, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/transactions");
        expect(res.status).to.equal(200);
        await mongoose.disconnect();
    });

    test("GET /api/transactions --> should return generatedToken at index 0 of the body returned", async () => {
        jest.spyOn(Tutorial, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/transactions");
        expect(res.body[0].title).to.equal("00-23-34-443");
    });

    test("GET /api/transactions --> should return 404 if there is no empty data", async () => {
        jest.spyOn(Tutorial, "find").mockReturnValue(Promise.resolve(emptyArr));
        const res = await chai.request(app).get("/api/transactions ");
        expect(res.status).to.equal(404);
    });

   

    

    it("POST /api/transactions --> should create transaction successfully", async () => {
        jest.spyOn(Tutorial, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/transactions").send({
            money: 400,
            meter: 'm1-002',
            token: '00-23-34-443',
            days:4,    
            dateExp :2022-12-07,
        });

        expect(res.statusCode).to.equal(201);
    });

    it("POST /api/transactions--> should not create tutorial if title is missing", async () => {
        const res = await request(app).post("/api/transactions").send({
            money: 400,
            meter: 'm1-002',
            token: '00-23-34-443',
            days:4,    
            dateExp :2022-12-07,
        });
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal("money and meter can not be empty!");
    });

    it("DELETE /api/transactions:id -->should delete one transaction successfully", async () => {
        jest.spyOn(Tutorial, "findByIdAndRemove").mockReturnValue(
            Promise.resolve(true)
        );

        const res = await request(app).post("/api/tutorials/").send({
            money: 400,
            meter: 'm1-002',
            token: '00-23-34-443',
            days:4,    
            dateExp :2022-12-07,
        });

        const id = res.body.id;
        const response = await request(app).delete("/api/tutorials/" + id);
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "Transaction was deleted successfully!"
        );
    });
});
