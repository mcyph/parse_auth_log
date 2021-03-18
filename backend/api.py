from os import environ
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db import LoginEvents, OtherEventsTimeline


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine(f"mysql+mysqlconnector://"
                       f"{environ['DB_USER']}:"
                       f"{environ['DB_PASSWORD']}@"
                       f"{environ['DB_HOST']}/"
                       f"{environ['DB_NAME']}?"
                       f"charset=utf8mb4",
                       echo=True, convert_unicode=True)
Session = sessionmaker()
Session.configure(bind=engine)
session = Session()


@app.get("/login_events")
async def login_events():
    # id
    # eventdatetime
    # type
    # ip
    # country_code
    # username
    return session.query(LoginEvents).all()


@app.get("/other_events_timeline")
async def other_events_timeline():
    # id
    # eventdatetime
    # type
    # message
    return session.query(OtherEventsTimeline).all()

