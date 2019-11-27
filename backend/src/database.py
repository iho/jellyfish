import motor.motor_asyncio

client: motor.motor_asyncio.AsyncIOMotorClient = None
chat_messages = None


def connect():
    global client, chat_messages
    client = motor.motor_asyncio.AsyncIOMotorClient("localhost", 27017)
    chat_messages = client["test_database"].chat_messages
