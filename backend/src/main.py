import json

import bson

from fastapi import FastAPI
from pydantic import BaseModel
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles
from starlette.websockets import WebSocket

from src import database

app = FastAPI()

FRONTEND_DIR = "../frontend/build/"


@app.get("/", response_class=HTMLResponse)
def read_root():
    with open(FRONTEND_DIR + "index.html", "rb") as f:
        return f.read().decode("utf8")


users = []


class ChatMessage(BaseModel):
    username: str
    body: str


@app.post("/api/messages")
async def create_message(message: ChatMessage):
    message = message.dict()
    message["_id"] = bson.ObjectId()
    await database.chat_messages.insert_one(message)
    message["_id"] = str(message["_id"])
    for user in users:
        try:
            await user.send_text(json.dumps(message))
        except Exception as e:
            pass
    return message


@app.get("/api/messages")
async def get_messages():
    cursor = database.chat_messages.find().sort("_id")
    messages = await cursor.to_list(length=100)
    for message in messages:
        message["_id"] = str(message["_id"])
    return messages


@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    users.append(websocket)
    while True:
        data = await websocket.receive_text()


app.mount("/", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.on_event("startup")
async def create_db_client():
    database.connect()
