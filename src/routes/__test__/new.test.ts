import supertest from "supertest";
import request from "supertest";
import { app } from "../../app";
it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});
it.todo("can only be accessed if the user is signed in");
it.todo("returns an error if an invalid title is provided");
it.todo("returns an error if an invalid price is provided");
it.todo("creates a ticket with valid inputs");
