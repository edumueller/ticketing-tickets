import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "qwert", price: 20 });
};
it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(response.body).toHaveLength(3);
});

it("returns empty array when no tickets", async () => {
  const response = await request(app)
    .get("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(response.body).toStrictEqual([]);
});
