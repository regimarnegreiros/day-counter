import { jest, describe, test, expect } from "@jest/globals";
import { createCard } from "../methods/post";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { getCardById, getUserCards } from "../methods/get";
import { updateCard } from "../methods/patch";
import { deleteCard } from "../methods/delete";

describe("all routes tests", () => {
  test("create", async () => {
    const req: any = getMockReq({
      body: {
        title: "prova",
        icon: "👍",
        type: "p",
        start_date: "2026/07/01",
        hue: "20",
        notify_interval: "d",
      },
    });
    const { res, next, mockClear } = getMockRes();

    await createCard(req, res);
    expect(res.status).toHaveBeenLastCalledWith(201);
  });

  test("get all user cards", async () => {
    const req: any = getMockReq();
    const { res, next, mockClear }: any = getMockRes();

    await getUserCards(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("get card by id", async () => {
    const req: any = getMockReq();
    const { res, next, mockClear }: any = getMockRes();

    await getCardById(req, res);
    expect(res.status).toHaveBeenCalledWith(202);
  });

  test("update card by id", async () => {
    const req: any = getMockReq();
    const { res, next, mockClear }: any = getMockRes();

    await updateCard(req, res);
    expect(res.status).toHaveBeenCalledWith(202);
  });
});

test("Delete card by id", async () => {
  const req: any = getMockReq();
  const { res, next, mockClear }: any = getMockRes();

  await deleteCard(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});
