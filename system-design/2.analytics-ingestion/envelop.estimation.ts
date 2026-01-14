/*

    Day1, 500 req/ sec
    A node js can handle 1000 rps.
    1 req is 1 kb

    not a big deal

    req -> server -> db




    1 sec we have 5000 req
    we are doing 5000 times insertion rather than 1 build insertion?
        a. we could techincall do insert 100 records every 100 ms, which is much more faster than curernt?
    p95 which is 5% user are seeeing more than 4 sec latency.
    Cpu is hovering around 40%

    app logs timedout and connection terminated.

    if this culprint is ui -> api -> db, if the culprit is not the db, then the culprit is                                                                                                    │
    we can also say db is not the cultprit it's the api? but how we are
        a. we have nuke i.e postgress
            but we are bsaically melting scraps of nukes to make the canon? by inserting everytime i.e 5000 time every sec?

*/