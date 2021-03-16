import enum
import dotenv
from os import environ
from sqlalchemy import Enum
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Index


dotenv.load_dotenv(override=True)
Base = declarative_base()


#=======================================================================#
# Login Events
#=======================================================================#


class LoginEventTypes(enum.Enum):
    FAILURE = 1
    SUCCESS = 2


class LoginEvents(Base):
    __tablename__ = 'loginevents'

    id = Column(Integer, primary_key=True, autoincrement=True)
    eventdatetime = Column(DateTime)
    type = Column(Enum(LoginEventTypes))
    ip = Column(String(16))
    country_code = Column(String(16))
    username = Column(String(128))

    def __repr__(self):
        return "<LoginEvents(id='%s', type='%s', ip='%s', country_code='%s', username='%s')>" % \
               (self.id, self.type, self.ip, self.country_code, self.username)


Index('login_events_idx',
      LoginEvents.eventdatetime,
      LoginEvents.type,
      LoginEvents.ip,
      LoginEvents.username)


#=======================================================================#
# Other Event Types
#=======================================================================#


class OtherEventTypes(enum.Enum):
    ADD_USER = 1
    GROUP_ADD = 2
    PASSWORD_CHANGED = 3
    ACCOUNT_CHANGED = 4
    USERMOD = 5


class OtherEventsTimeline(Base):
    __tablename__ = 'otherevents'

    id = Column(Integer, primary_key=True, autoincrement=True)
    eventdatetime = Column(DateTime)
    type = Column(Enum(OtherEventTypes))
    message = Column(String(1024))

    def __repr__(self):
        return "<OtherEventsTimeline(id='%s', type='%s', message='%s')>" % \
               (self.id, self.type, self.message)


Index('other_events_idx',
      OtherEventsTimeline.eventdatetime,
      OtherEventsTimeline.type,
      OtherEventsTimeline.message)


if __name__ == '__main__':
    engine = create_engine(f"mysql+mysqlconnector://"
                           f"{environ['DB_USER']}:"
                           f"{environ['DB_PASSWORD']}@"
                           f"{environ['DB_HOST']}/"
                           f"{environ['DB_NAME']}?"
                           f"charset=utf8mb4",
                           echo=True, convert_unicode=True)
    Session = sessionmaker()
    Base.metadata.create_all(engine)
    Base.metadata.bind = engine
    Session.configure(bind=engine)
    session = Session()

    from backend.main import get_auth_items
    login_events, other_events = get_auth_items()

    for login_event in login_events:
        session.add(login_event)

    for other_event in other_events:
        session.add(other_event)

    session.commit()
    session.close()
