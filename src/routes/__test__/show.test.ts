import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("return 404 if the ticket is not found", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});
it("returns the ticket if the ticket is found", async () => {
  const title = "product_1";
  const price = 10;

  const {
    body: { id },
  } = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const {
    body: { title: ticketTitle, price: ticketPrice },
  } = await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(200);

  expect(ticketTitle).toEqual(title);
  expect(ticketPrice).toEqual(price);
});
