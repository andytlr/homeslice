![](assets/screenshots.png)

## About

[Homeslice.in](http://homeslice.in) started as a static page to compare two timezones and has evolved into a much more full-featured client side app.

I used [Moment Timezone][1] which uses [The Time Zone Database][2] as the source of city timezone data:

> The Time Zone Database (often called tz or zoneinfo) contains code and data that represent the history of local time for many representative locations around the globe. It is updated periodically to reflect changes made by political bodies to time zone boundaries, UTC offsets, and daylight-saving rules.

As of March 2023 the original 10 year timezone data file was out of date. I've updated it so hopefully it's good for another decade or more.

## Adding Cities

If you'd like to request a city, please check out the [list of timezones in the database][4]. Sending me the zone name, e.g. `America/Los_Angeles` is super helpful.

## License

![Creative Commons License](http://i.creativecommons.org/l/by-nc/4.0/80x15.png)

Homeslice is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License][3].

[1]: http://momentjs.com/timezone/
[2]: http://www.iana.org/time-zones
[3]: http://creativecommons.org/licenses/by-nc/4.0/
[4]: http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[5]: http://nodejs.org
