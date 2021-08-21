import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("return 404 if the ticket is not found", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "ticket_title",
      price: 10,
    })
    .expect(404);
});
it("returns a 401 if the user is not authenticated", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "ticket_title",
      price: 10,
    })
    .expect(401);
});
it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "qwert", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "qwerty",
      price: 1000,
    })
    .expect(401);
});
it("returns a 400 if the user provides an invalid title or price", async () => {
  const userCookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", userCookie)
    .send({ title: "qwert", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", userCookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", userCookie)
    .send({
      title: "qwert",
      price: -10,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const userCookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", userCookie)
    .send({ title: "qwert", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", userCookie)
    .send({
      title: "new title",
      price: 100,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", userCookie)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("new title");
  expect(ticketResponse.body.price).toEqual(100);
});
