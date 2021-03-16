import re
import dateutil.parser
from geolite2 import geolite2

from db import LoginEvents, LoginEventTypes
from db import OtherEventsTimeline, OtherEventTypes


reader = geolite2.reader()


def get_auth_items():
    def get_country(ip):
        #print(reader.get(ip))
        try:
            return reader.get(ip)['registered_country']['iso_code']
        except TypeError:
            return '(unknown)'

    login_events = []
    other_events = []

    with open("auth.log", "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            # Extract the date from the rest of the line
            split_line = line.strip().split(' ')
            dt = dateutil.parser.parse(' '.join(split_line[:3]), fuzzy=True)

            # Note that we're ignoring the PC name here
            line = ' '.join(split_line[4:])
            #print("DateTime:", dt, "Line:", line)

            if line.startswith('systemd-logind['):
                # e.g. Watching system buttons on /dev/input/event0 (Power Button)
                # we can probably ignore these
                pass
            elif line.startswith('systemd'):
                print("LOCAL:", line)
            elif line.startswith('sshd['):
                """
                sshd[969]: Invalid user ansible from 103.126.102.25 port 46478
                sshd[969]: Received disconnect from 103.126.102.25 port 46478:11: Bye Bye [preauth]
                sshd[969]: Disconnected from invalid user ansible 103.126.102.25 port 46478 [preauth]
                sshd[1211]: Received disconnect from 118.25.195.244 port 49832:11: Bye Bye [preauth]
                sshd[1211]: Disconnected from authenticating user root 118.25.195.244 port 49832 [preauth]
                sshd[789]: Received signal 15; terminating.
                sshd[1583]: Server listening on 0.0.0.0 port 22.
                sshd[1583]: Server listening on :: port 22.
                """
                if (
                    "Received disconnect from" in line or
                    "Disconnected from" in line or
                    "Connection closed by" in line
                ):
                    # We won't track how long sessions were opened for here
                    pass
                elif "Invalid user" in line:
                    match = re.search(r"Invalid user (.*?) from ([0-9.]*?) port ([0-9]+)", line)
                    user, ip, port = match.groups()
                    login_events.append(LoginEvents(eventdatetime=dt,
                                                    type=LoginEventTypes.FAILURE,
                                                    ip=ip,
                                                    country_code='AU',
                                                    username=user))
                    #print(login_events[-1])

                elif "Failed password for" in line:
                    match = re.search(r"Failed password for (invalid user )?(.*?) from ([0-9.]*?) port ([0-9]+)", line)
                    _, user, ip, port = match.groups()
                    login_events.append(LoginEvents(eventdatetime=dt,
                                                    type=LoginEventTypes.FAILURE,
                                                    ip=ip,
                                                    country_code=get_country(ip),
                                                    username=user))
                    #print(login_events[-1])

                elif "Failed none for" in line:
                    match = re.search(r"Failed none for (invalid user )?(.*?) from ([0-9.]*?) port ([0-9]+)", line)
                    _, user, ip, port = match.groups()
                    login_events.append(LoginEvents(eventdatetime=dt,
                                                    type=LoginEventTypes.FAILURE,
                                                    ip=ip,
                                                    country_code=get_country(ip),
                                                    username=user))
                    #print(login_events[-1])

                elif "Accepted password for" in line:
                    match = re.search(r"Accepted password for (.*?) from ([0-9.]*?) port ([0-9]+)", line)
                    user, ip, port = match.groups()
                    login_events.append(LoginEvents(eventdatetime=dt,
                                                    type=LoginEventTypes.SUCCESS,
                                                    ip=ip,
                                                    country_code=get_country(ip),
                                                    username=user))
                    #print(login_events[-1])

                elif "Unable to negotiate with" in line:
                    match = re.search(r"Unable to negotiate with ([0-9.]*?) port ([0-9]+): no matching key exchange method found.", line)
                    ip, port = match.groups()
                    login_events.append(LoginEvents(eventdatetime=dt,
                                                    type=LoginEventTypes.FAILURE,
                                                    ip=ip,
                                                    country_code=get_country(ip),
                                                    username="(unknown)"))
                    #print(login_events[-1])

                elif "Server listening on" in line:
                    pass
                elif "Received signal" in line:
                    pass
                elif "check pass; user unknown" in line:
                    pass
                elif "pam_unix(sshd:auth):" in line:
                    # Not sure if we should use - doesn't contain all the info for ssh logins
                    pass
                elif "pam_unix(sshd:session):" in line:
                    pass
                elif "more authentication failures" in line:
                    pass
                elif "error: kex_exchange_identification:" in line:
                    # Probably other end terminated connection
                    pass
                elif "Connection reset by" in line:
                    pass
                else:
                    raise Exception(line)

            # Various timeline events when accounts are added/modified
            elif line.startswith('useradd['):
                other_events.append(OtherEventsTimeline(eventdatetime=dt,
                                                        type=OtherEventTypes.ADD_USER,
                                                        message=line))
            elif line.startswith('groupadd['):
                other_events.append(OtherEventsTimeline(eventdatetime=dt,
                                                        type=OtherEventTypes.GROUP_ADD,
                                                        message=line))
            elif line.startswith('passwd['):
                other_events.append(OtherEventsTimeline(eventdatetime=dt,
                                                        type=OtherEventTypes.PASSWORD_CHANGED,
                                                        message=line))
            elif line.startswith('chfn['):
                other_events.append(OtherEventsTimeline(eventdatetime=dt,
                                                        type=OtherEventTypes.ACCOUNT_CHANGED,
                                                        message=line))
            elif line.startswith('usermod['):
                other_events.append(OtherEventsTimeline(eventdatetime=dt,
                                                        type=OtherEventTypes.USERMOD,
                                                        message=line))

            elif line.startswith('CRON['):
                pass
            elif line.startswith("su:"):
                pass
            elif line.startswith("sudo:"):
                # OPEN ISSUE: also add sudo/su events to the timeline??
                pass
            elif line.startswith("chage["):
                pass
            else:
                raise Exception("Unhandled line:", line)

    return login_events, other_events


if __name__ == '__main__':
    print(get_auth_items())
